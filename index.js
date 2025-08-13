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

const REACTION_CHANNEL_ID = process.env.REACTION_CHANNEL_ID;
const PRONOUN_REACTION_POST_ID = process.env.PRONOUN_REACTION_POST_ID;

/** @type {RegExp} Regular expression to match bully commands (e.g., !bully, !wully, !cully) */
const bullyRegex = /^!\p{L}ully$/u;

let trackedPronounMessage = null;

/** @type {Map<string, string>} Maps emoji names to Discord role IDs */
const emojiToRoleMap = new Map([
    ['pronoun_he', process.env.ROLE_PRONOUN_HE],
    ['pronoun_she', process.env.ROLE_PRONOUN_SHE],
    ['pronoun_they', process.env.ROLE_PRONOUN_THEY],
    ['pronoun_ask', process.env.ROLE_PRONOUN_ASK],
    ['pronoun_any', process.env.ROLE_PRONOUN_ANY],
  ]);

/** @type {Map<string,string>} Maps words to their joke corrections */
const wordToCorrectionMap = new Map([
    ['weezer', 'Weeer'],
    ['blimp', 'blump'],
    ['blimps', 'blumps'],
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

    const command = msg.content.split(" ")[0].toLowerCase();

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
        '`!threads` - shows all bookmarked threads on the server\n';


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

    if (reaction.message.id === PRONOUN_REACTION_POST_ID) {
        console.log(`${user.tag} added ${reaction.emoji.name}`);

        if(emojiToRoleMap.has(reaction.emoji.name)){
            let roleId = emojiToRoleMap.get(reaction.emoji.name);

            const guild = reaction.message.guild;
            const member = await guild.members.fetch(user.id);

            await member.roles.add(roleId).catch(console.error);
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

    if (reaction.message.id === PRONOUN_REACTION_POST_ID) {
        console.log(`${user.tag} removed ${reaction.emoji.name}`);

        if(emojiToRoleMap.has(reaction.emoji.name)){
            let roleId = emojiToRoleMap.get(reaction.emoji.name);

            const guild = reaction.message.guild;
            const member = await guild.members.fetch(user.id);

            await member.roles.remove(roleId).catch(console.error);
        }
    }
});

//setting up posts to track reactions on
client.once('ready', async () => {
    const channel = await client.channels.fetch(REACTION_CHANNEL_ID);
    trackedPronounMessage = await channel.messages.fetch(PRONOUN_REACTION_POST_ID);

    console.log(`Tracking reactions on message: ${trackedPronounMessage.id}`);
});

client.login(process.env.BOT_TOKEN).catch(err => {
    console.error(err);
    process.exit();
  });

  process.on("exit",  () => {
    console.log('destroying bot client');
    client.destroy();
  });

