const { Client, GatewayIntentBits, messageLink, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

require('dotenv').config();
const storage = require('node-persist');
const temperature = require('./temperature.js');
const bully = require('./bully.js');

const REACTION_CHANNEL_ID = process.env.REACTION_CHANNEL_ID;
const PRONOUN_REACTION_POST_ID = process.env.PRONOUN_REACTION_POST_ID;

/** @type {RegExp} Regular expression to match bully commands (e.g., !bully, !wully, !cully) */
const bullyRegex = /^!\wully$/

let trackedPronounMessage = null;

/** @type {Map<string, string>} Maps emoji names to Discord role IDs */
const emojiToRoleMap = new Map([
    ['pronoun_he', process.env.ROLE_PRONOUN_HE],
    ['pronoun_she', process.env.ROLE_PRONOUN_SHE],
    ['pronoun_they', process.env.ROLE_PRONOUN_THEY],
    ['pronoun_ask', process.env.ROLE_PRONOUN_ASK],
    ['pronoun_any', process.env.ROLE_PRONOUN_ANY],
  ]);

//init storage
/** @type {Array<Object>} Array of custom command objects loaded from storage */
let commandList = [];

/**
 * Initializes the bot's persistent storage and loads existing commands
 * @async
 * @function
 * @returns {Promise<void>}
 */
const start = async function(){
    await storage.init({dir: 'storage'});

    //load commands into memory on app start
    let storedCommands = await storage.getItem("storedCommands");
    if (typeof storedCommands != 'undefined'){
        commandList = storedCommands;
    }
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

    //ignore messages from bots, including self
    if (msg.author.bot) return;

    convertTemps(msg);

    const command = msg.content.split(" ")[0].toLowerCase();

    checkForCommand(msg, command);

    if(isBullyCommand(command)){
        // switch doesn't deal well with wildcard matching so first check for a *ully command
        await bully.bullyHasHappened(msg, command);
        return;
    }

    switch(command){
        case "!help":
            postHelp(msg);
            break;
        case "!bullyleaderboard":
            bully.getLeaderboard(msg);
            break;
        case "!addcommand":
            if(userIsMod(msg)) await addCommand(msg);
            break;
        case "!removecommand":
            if(userIsMod(msg)) await removeCommand(msg);
            break;
        default:
            break;
    }

    //the weezer joke
    const weezerRegex = /\b[^\w\s]*weezer[^\w\s]*\b/i;
    if(weezerRegex.test(msg.content)){
        msg.channel.send('*Weeer');
    }
});

/**
 * Displays help message with all available commands including custom ones
 * @param {import('discord.js').Message} msg - Discord message object
 */
function postHelp(msg){
    let response = '`!help` - display this message\n' +
        '`!bully` - use this any time brandtamos is bullied\n' +
        '`!bullyleaderboard` - show the current bullying leaderboard\n';

    //populate the rest of the help list from stored commands
    commandList.forEach((command) => {
        let newHelpLine = "`" + command.command + "` - " + command.description + "\n";
        response = response + newHelpLine;
    });
    msg.channel.send(response);
}

/**
 * Adds a new custom command with description and output text
 * @async
 * @param {import('discord.js').Message} msg - Discord message invoking command
 * @returns {Promise<void>}
 */
async function addCommand(msg){
    try{
        if(!msg.content.includes("|")){
            msg.reply("Sorry, I didn't understand that! Make sure your request is formatted in the form of:\n`!addcommand commmandName commandDescription | commandOutput`");
            return;
        }
        let splitMessage = msg.content.split(" ");
        let newCommand = splitMessage[1].toLowerCase();
        if(newCommand.charAt(0) != '!'){
            newCommand = "!" + newCommand;
        }

        //trim off commands to get just the text we need
        splitMessage.shift();
        splitMessage.shift();


        let rejoinedText = splitMessage.join(" ");
        let commandDescription = rejoinedText.split("|")[0];
        let commandText = rejoinedText.split("|")[1];
        let commandObject = {
            command: newCommand,
            description: commandDescription,
            commandText: commandText
        };

        let commandExists = commandList.some(command => command.command == newCommand);
        if(commandExists){
            msg.reply("Command `" + newCommand + "` already exists.");
        }
        else{
            commandList.push(commandObject);
            await storage.setItem("storedCommands", commandList);
            msg.reply("Command `" + newCommand + "` has been successfully added!");
        }
    }
    catch(error){
        msg.reply("I'm sorry, something went wrong trying to add a new command!");
    }
}

/**
 * Removes an existing custom command
 * @async
 * @param {import('discord.js').Message} msg - Discord message invoking command
 * @returns {Promise<void>}
 */
async function removeCommand(msg){
    let commandToRemove = msg.content.split(" ")[1].toLowerCase();
    if(commandToRemove.charAt(0) != '!'){
        commandToRemove = "!" + commandToRemove;
    }

    console.log(commandToRemove);

    let modifiedCommandList = commandList.filter(commandObj => commandObj.command != commandToRemove);
    commandList = modifiedCommandList;

    await storage.setItem("storedCommands", commandList);

    msg.reply("Command " + commandToRemove +  " has been removed!");
}

/**
 * Checks if a command exists in storage and executes it
 * @param {import('discord.js').Message} msg - Discord message object
 * @param {string} command - The command to check for
 */
function checkForCommand(msg, command){
    let commandObject = commandList.find(commandObj => commandObj.command == command);
    if(commandObject){
        msg.channel.send(commandObject.commandText);
    }
}

/**
 * Checks if the user has MOD role permissions
 * @param {import('discord.js').Message} msg - Discord message object
 * @returns {boolean} True if user has MOD role
 */
function userIsMod(msg){
    return msg.member.roles.cache.find(r => r.name === "MOD")
}

function convertTemps(msg){
    try{
        const messageText = msg.content;

        if(temperature.messageHasTemps(messageText) == true){
            const responseMessage = temperature.convertTemps(messageText);
            msg.channel.send(responseMessage);
        }
    }
    catch(error){
        console.error('Failed to convert temperature values');
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
