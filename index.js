const fs = require('fs');
const { Client, GatewayIntentBits, messageLink, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

require('dotenv').config();
const storage = require('node-persist');
const bully = require('./bully.js');
const threads = require('./threads.js');
const timezone = require('./timezone.js');
const conversion = require('./conversion.js');
const commands = require('./commands.js');
const roletoall = require('./roletoall.js');

const REACTION_CHANNEL_ID = process.env.REACTION_CHANNEL_ID;

/** @type {RegExp} Regular expression to match bully commands (e.g., !bully, !wully, !cully) */
const bullyRegex = /^!\p{L}ully$/u;

let trackedPronounMessage = null;

/** @type {Map<string>: Map<string, string>} Maps reaction message id to emoji names to Discord role IDs */
let emojiToRoleJson;
let EMOJI_ROLES = false;
const emojiToRoleMaps = new Map();

try {
  const fileContent = fs.readFileSync('./emojiToRole.json','utf8').trim();
  if (fileContent) {
    emojiToRoleJson = JSON.parse(fileContent);
    EMOJI_ROLES = true;
  }
} catch (err) {
  console.log(`Error reading emojiToRole.json: ${err}`)
}

if (EMOJI_ROLES) {
  for (const [messageId, emojiToRole] of Object.entries(emojiToRoleJson)) {
    emojiToRoleMaps.set(messageId, new Map(Object.entries(emojiToRole)));
  }
} 

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
        default:
            break;
    }

    let correctionResponse = "";
    const regex = new RegExp(`\\b[^\\w\\s]*(${Array.from(wordToCorrectionMap.keys()).join("|")})[^\\w\\s]*\\b`, 'ig');
    for(const match of msg.content.matchAll(regex)){
        correctionResponse += `*${wordToCorrectionMap.get(match[0].toLowerCase())}\n`;
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

  if (EMOJI_ROLES) {
    for (const [messageId, emojiToRoleMap] of emojiToRoleMaps) {
      if (reaction.message.id === messageId) {
        console.log(`${user.tag} added ${reaction.emoji.name}`);

        if(emojiToRoleMap.has(reaction.emoji.name)){
          let roleId = emojiToRoleMap.get(reaction.emoji.name);

          const guild = reaction.message.guild;
          const member = await guild.members.fetch(user.id);

          await member.roles.add(roleId).catch(console.error);
        }
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

   if (EMOJI_ROLES) {
     for (const [messageId, emojiToRoleMap] of  emojiToRoleMaps) {
       if (reaction.message.id === messageId) {
         console.log(`${user.tag} removed ${reaction.emoji.name}`);

         if(emojiToRoleMap.has(reaction.emoji.name)){
           let roleId = emojiToRoleMap.get(reaction.emoji.name);

           const guild = reaction.message.guild;
           const member = await guild.members.fetch(user.id);

           await member.roles.remove(roleId).catch(console.error);
         }
       }
     }
   }
});

//setting up posts to track reactions on
if (EMOJI_ROLES) {
  client.once('ready', async () => {
    const channel = await client.channels.fetch(REACTION_CHANNEL_ID);
    trackedMessages = [];
    for (const [messageId, emojiToRoleMap] of emojiToRoleMaps) {
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

