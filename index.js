const { Client, GatewayIntentBits, messageLink, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

require('dotenv').config();
const storage = require('node-persist');

const REACTION_CHANNEL_ID = process.env.REACTION_CHANNEL_ID;
const PRONOUN_REACTION_POST_ID = process.env.PRONOUN_REACTION_POST_ID;

/** @type {RegExp} Regular expression to match bully commands (e.g., !bully, !wully, !cully) */
const bullyRegex = /^!\wully$/

let trackedPronounMessage = null;

/** @type {Map<string, string>} Maps emoji names to Discord role IDs */
const emojiToRoleMap = new Map([
    ['pronoun_he', '1367997513122189312'],
    ['pronoun_she', '1367997561683837048'],
    ['pronoun_they', '1367997601722400818'],
    ['pronoun_ask', '1367997625118490634'],
    ['pronoun_any', '1367997724317712464']
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

    const command = msg.content.split(" ")[0].toLowerCase();

    checkForCommand(msg, command);

    if(isBullyCommand(command)){
        // switch doesn't deal well with wildcard matching so first check for a *ully command
        await bullyHasHappened(msg, command);
        return;
    }

    switch(command){
        case "!help":
            postHelp(msg);
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
        '`!bully` - use this any time brandtamos is bullied\n';

    //populate the rest of the help list from stored commands
    commandList.forEach((command) => {
        let newHelpLine = "`" + command.command + "` - " + command.description + "\n";
        response = response + newHelpLine;
    });
    msg.channel.send(response);
}

/**
 * Calculates time since last bully event and updates timestamp
 * @async
 * @returns {Promise<number>} Time difference in milliseconds
 */
async function getTimeSinceLastBully() {
    let lastBullyTime = await storage.getItem("lastBullyTime");
    const currentTimestamp = new Date().getTime();

    // Handle NaN bullys (e.g., first run).
    if (isNaN(lastBullyTime)) {
        lastBullyTime = currentTimestamp;
    }

    await storage.setItem("lastBullyTime", currentTimestamp);

    return currentTimestamp - lastBullyTime;
}

/**
 * Increments the bully counter and returns the new count
 * @async
 * @returns {Promise<number>} New bully count
 */
async function incrementAndGetBullyCount() {
    let bullyCount = await storage.getItem("bullyCount");

    // Handle NaN bullys (e.g., first run).
    if (isNaN(bullyCount)) {
        bullyCount = 0;
    }

    const newBullyCount = bullyCount + 1;
    await storage.setItem("bullyCount", newBullyCount);

    return newBullyCount;
}

/**
 * Updates bully record if current time exceeds previous record
 * @async
 * @param {number} diffTime - Time difference in milliseconds
 * @returns {Promise<number>} Current record time in milliseconds
 */
async function getAndSetBullyRecord(diffTime) {
    let bullyRecord = await storage.getItem("bullyRecord");

    // Handle NaN bullys (e.g., first run).
    if (isNaN(bullyRecord)) {
        bullyRecord = 0;
    }

    if (diffTime > bullyRecord) {
        await storage.setItem("bullyRecord", diffTime);
        return diffTime;
    }
    return bullyRecord;
}

/**
 * Handles bully tracking commands with dynamic output based on command used
 * @async
 * @param {import('discord.js').Message} msg - Discord message object
 * @param {string} command - The bully command used (e.g., !bully, !wully)
 */
async function bullyHasHappened(msg, command){
    const diffTime = await getTimeSinceLastBully();
    const newBullyCount = await incrementAndGetBullyCount();
    const currentBullyRecord = await getAndSetBullyRecord(diffTime);

    const dayDiff = Math.floor((diffTime) / (1000 * 3600 * 24));
    const hours = Math.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diffTime % (60 * 1000)) / 1000);

    const recordDays = Math.floor((currentBullyRecord) / (1000 * 3600 * 24));
    const recordHours = Math.floor((currentBullyRecord % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const recordMinutes = Math.floor((currentBullyRecord % (60 * 60 * 1000)) / (60 * 1000));
    const recordSeconds = Math.floor((currentBullyRecord % (60 * 1000)) / 1000);

    const ch = command.charAt(1).toLowerCase();
    const bullyMsg = `${ch.toUpperCase()}enevolent moderator **${ch}randtamos** has ${ch}een ${ch}ullied.\n\nIt has ${ch}een **${dayDiff} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds** since **${ch}randtamos** was last ${ch}ullied.\n\n**${ch}randtamos** has ${ch}een ${ch}ullied a total of **${newBullyCount} times**.\n\nThe record for the longest amount of time **${ch}randtamos** has not ${ch}een ${ch}ullied is **${recordDays} days, ${recordHours} hours, ${recordMinutes} minutes and ${recordSeconds} seconds**.`
    msg.channel.send(bullyMsg);
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
