const { Client, GatewayIntentBits, messageLink, Partials, Options } = require('discord.js');

//discord.js cache config. use this to keep virtual memory from ballooning out of control
const MESSAGE_CACHE_SIZE = 50;
const MEMBER_CACHE_SIZE = 200;
const SWEEP_INTERVAL = 3600;
const MESSAGE_LIFETIME = 1800;

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],

    //makecache options set hard limits on cache sizes
    makeCache: Options.cacheWithLimits({
        MessageManager: MESSAGE_CACHE_SIZE, 
        GuildMemberManager: { 
            maxSize: MEMBER_CACHE_SIZE,
            keepOverLimit: (member) => member.id === client.user.id, 
        },
        ThreadManager: 0, //disabling thread caching saves a lot of memory
    }),
    
    //sweepers periodically clean up global caches based on age/activity
    sweepers: {
        ...Options.DefaultSweeperSettings,
        users: { 
            interval: SWEEP_INTERVAL, 
            filter: () => (user) => user.id !== client.user.id && user.bot, //it's important to not remove the bot itself from the cache
        },
        messages: {
            interval: SWEEP_INTERVAL,
            lifetime: MESSAGE_LIFETIME,
        },
        guildMembers: {
            interval: SWEEP_INTERVAL,
            filter: () => (member) => !member.user.bot && (Date.now() - member.joinedTimestamp > 3600000), 
        }
    } 
});

require('dotenv').config();
const storage = require('node-persist');
const bully = require('./bully.js');
const threads = require('./threads.js');
const timezone = require('./timezone.js');
const conversion = require('./conversion.js');
const commands = require('./commands.js');
const roletoall = require('./roletoall.js');
const sentience = require('./sentience.js');

const REACTION_CHANNEL_ID = process.env.REACTION_CHANNEL_ID;

let EMOJI_TO_ROLES;
try {
  ( { EMOJI_TO_ROLES } = require('./emojiToRoles.js'));
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    EMOJI_TO_ROLES = new Map();
    console.log(`No emojiToRoles.js exists, not using emoji to role function.`)
  } else {
    console.log(`Emoji to roles error: ${err}`);
  }
}

/** @type {RegExp} Regular expression to match bully commands (e.g., !bully, !wully, !cully) */
const bullyRegex = /^!\p{L}ully$/u;

/** @type {Map<string,string>} Maps words to their joke corrections */
const wordToCorrectionMap = new Map([
    ['weezer', 'Weeer'],
    ['blimp', 'blump'],
    ['blimps', 'blumps'],
    ['skateboard', 'skamtbord']
  ]);

/**
 * Initializes the bot's persistent storage and loads existing commands
 * @async
 * @function
 * @returns {Promise<void>}
 */
const start = async function(){
    await storage.init({dir: 'storage'});

}
start();

/**
 * Checks if a command matches the bully pattern (!*ully)
 * @param {string} command - The command to check
 * @returns {boolean} True if command matches bully pattern
 */
function isBullyCommand(command) {
    return command.match(bullyRegex);
}

//listen for messages
client.on("messageCreate", async msg => {

    // ignore messages from bots, including self
    if (msg.author.bot) return;

    /*
     * catches any units setup for conversion through 
     * conversion.js and converts them
     */
    convertUnits(msg);

    const command = msg.content.split(/\s+/)[0].toLowerCase();

    commands.checkForCommand(msg, command);

    if(isBullyCommand(command)){
        // switch doesn't deal well with wildcard matching so first check for a *ully command
        await bully.bullyHasHappened(msg, command);
        return;
    }

    switch(command){
        case "!help":
            postHelp(msg);
            break;
        case "!secretmenu":
            postSecretMenu(msg);
            break;
        case "!bullyleaderboard":
            bully.getLeaderboard(msg);
            break;
        case "!time":
            timezone.now(msg);
            break;
        case "!addcommand":
            if(userIsMod(msg)) await commands.addCommand(msg, commands.CommandType.STANDARD);
            break;
        case "!removecommand":
            if(userIsMod(msg)) await commands.removeCommand(msg, commands.CommandType.STANDARD);
            break;
        case "!addsecretmenucommand":
            if(userIsMod(msg)) await commands.addCommand(msg, commands.CommandType.SECRETMENU);
            break;
        case "!removesecretmenucommand":
            if(userIsMod(msg)) await commands.removeCommand(msg, commands.CommandType.SECRETMENU);
            break;
        case "!addthread":
            if(userIsMod(msg)) await threads.add(msg);
            break;
        case "!removethread":
            if(userIsMod(msg)) await threads.remove(msg);
            break;
        case "!threads":
            threads.list(msg);
            break;
        case "!dryaddrole":
            if(userIsMod(msg)) {
                role = roletoall.getRoleFromCommand(msg);
                await roletoall.addRoleToAllCommand(msg, role, false);
            }
            break;
        case "!addrole":
            if(userIsMod(msg)) {
                role = roletoall.getRoleFromCommand(msg);
                await roletoall.addRoleToAllCommand(msg, role, true);
            }
            break;
        case "!dryremoverole":
            if(userIsMod(msg)) {
                role = roletoall.getRoleFromCommand(msg);
                await roletoall.removeRoleFromAllCommand(msg, role, false);
            }
            break;
        case "!removerole":
            if(userIsMod(msg)) {
                role = roletoall.getRoleFromCommand(msg);
                await roletoall.removeRoleFromAllCommand(msg, role, true);
            }
            break;
        case "!usersworole":
            if(userIsMod(msg)) {
                role = roletoall.getRoleFromCommand(msg);
                await roletoall.listUsersWithoutRoleCommand(msg, role); 
            }
            break;
        case "!botsay":
            if(userIsMod(msg)){
                sentience.botSay(msg, client);
            }
            break;
        case "!botreact":
            if(userIsMod(msg)){
                sentience.botReact(msg, client);
            }
        default:
            break;
    }

    let correctionResponse = "";
    const regex = new RegExp(`\\b[^\\w\\s]*(${Array.from(wordToCorrectionMap.keys()).join("|")})[^\\w\\s]*\\b`, 'ig');
    for(const match of msg.content.matchAll(regex)){
        correctionResponse += `*${wordToCorrectionMap.get(match[1].toLowerCase())}\n`;
    }
    if(correctionResponse){
        msg.channel.send(correctionResponse)
    }
});

/**
 * Displays help message with all available commands including custom ones
 * @param {import('discord.js').Message} msg - Discord message object
 */
function postHelp(msg){
    let response = '`!help` - display this message\n' +
        '`!time` - show the current time in Hyperfixed population centers\n'+
        '`!threads` - shows all bookmarked threads on the server\n'+
        '`!secretmenu` - show the secret menu of silly commands\n';


    //populate the rest of the help list from stored commands
    let commandList = commands.getStandardCommands();
    commandList.forEach((command) => {
        let newHelpLine = "`" + command.command + "` - " + command.description + "\n";
        response = response + newHelpLine;
    });
    msg.channel.send(response);
}

/**
 * Displays the secret menu commands
 * @param {import('discord.js').Message} msg - Discord message object
 */
function postSecretMenu(msg){

    let response = '`!bully` - use this any time brandtamos is bullied\n' +
        '`!bullyleaderboard` - show the current bullying leaderboard\n';

    let secretMenuCommands = commands.getSecretMenuCommands();
    secretMenuCommands.forEach((command) => {
        let newSecretMenuLine = "`" + command.command + "` - " + command.description + "\n";
        response = response + newSecretMenuLine;
    });
    msg.channel.send(response);
}

/**
 * Checks if the user has MOD role permissions
 * @param {import('discord.js').Message} msg - Discord message object
 * @returns {boolean} True if user has MOD role
 */
function userIsMod(msg){
    return msg.member.roles.cache.find(r => r.name === "MOD")
}

function convertUnits(msg){
  try {
    const messageText = msg.content;
    const responseMessage = conversion.make(messageText);

    if(responseMessage.length > 0) {
      msg.channel.send(responseMessage);
    }
  }
  catch(error) {
    console.error('Unit conversion failed');
    return;
  }
}

//read message reactions
client.on('messageReactionAdd', async (reaction, user) => {
    // Handle partials
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Failed to fetch reaction:', error);
            return;
        }
    }

  if (EMOJI_TO_ROLES.size !== 0) {
      if (EMOJI_TO_ROLES.has(reaction.message.id)) {
        const emojiToRoleMap = EMOJI_TO_ROLES.get(reaction.message.id);

        console.log(`${user.tag} added ${reaction.emoji.name}`);

        if(emojiToRoleMap.has(reaction.emoji.name)){
          let roleId = emojiToRoleMap.get(reaction.emoji.name);

          const guild = reaction.message.guild;
          const member = await guild.members.fetch(user.id);

          await member.roles.add(roleId).catch(console.error);
        }
      }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Failed to fetch reaction:', error);
            return;
        }
    }

   if (EMOJI_TO_ROLES.size !== 0) {
       if (EMOJI_TO_ROLES.has(reaction.message.id)) {
         const emojiToRoleMap = EMOJI_TO_ROLES.get(reaction.message.id);
         
         console.log(`${user.tag} removed ${reaction.emoji.name}`);

         if(emojiToRoleMap.has(reaction.emoji.name)){
           let roleId = emojiToRoleMap.get(reaction.emoji.name);

           const guild = reaction.message.guild;
           const member = await guild.members.fetch(user.id);

           await member.roles.remove(roleId).catch(console.error);
         }
       }
     }
});

//setting up posts to track reactions on
if (EMOJI_TO_ROLES.size !== 0) {
  client.once('ready', async () => {
    const channel = await client.channels.fetch(REACTION_CHANNEL_ID);
    const trackedMessages = [];
    for (const [messageId, emojiToRoleMap] of EMOJI_TO_ROLES) {
      try {
        const trackedMessage = await channel.messages.fetch(messageId); 
        console.log(`Tracking reactions on message: ${trackedMessage.id}`)
        trackedMessages.push(trackedMessage);
      } catch (err) {
        console.error(`Failed to fetch message ${messageId}:`, err.message); 
      }
    }
  });
}


client.login(process.env.BOT_TOKEN).catch(err => {
    console.error(err);
    process.exit();
});

process.on("exit",  () => {
    console.log('destroying bot client');
    client.destroy();
});

