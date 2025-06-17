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
let trackedPronounMessage = null;

const emojiToRoleMap = new Map([
    ['pronoun_he', '1367997513122189312'],
    ['pronoun_she', '1367997561683837048'],
    ['pronoun_they', '1367997601722400818'],
    ['pronoun_ask', '1367997625118490634'],
    ['pronoun_any', '1367997724317712464']
  ]);

//init storage
let commandList = [];

const start = async function(){
    await storage.init({dir: 'storage'});

    //load commands into memory on app start
    let storedCommands = await storage.getItem("storedCommands");
    if (typeof storedCommands != 'undefined'){
        commandList = storedCommands;
    }
}
start();

//listen for messages
client.on("messageCreate", async msg => {
    
    //ignore messages from bots, including self
    if (msg.author.bot) return;

    const command = msg.content.split(" ")[0].toLowerCase();

    checkForCommand(msg, command);

    switch(command){
        case "!help":
            postHelp(msg);
            break;
        case "!bully":
        case "!vully":
            await bullyHasHappened(msg, command);
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

async function bullyHasHappened(msg, command){
    let lastBullyTime = await storage.getItem("lastBullyTime");
    let currentTimestamp = new Date().getTime();
    let diffTime = currentTimestamp - lastBullyTime;
    let dayDiff = Math.floor((diffTime) / (1000 * 3600 * 24));
    let hours = Math.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((diffTime % (60 * 1000)) / 1000);

    let bullyCount = await storage.getItem("bullyCount");
    let newBullyCount = bullyCount + 1;
    await storage.setItem("bullyCount", newBullyCount);

    let bullyRecord = await storage.getItem("bullyRecord");
    let currentBullyRecord = bullyRecord;
    if(bullyRecord < diffTime){
        currentBullyRecord = diffTime;
        await storage.setItem("bullyRecord", currentBullyRecord);
    }

    let recordDays = Math.floor((currentBullyRecord) / (1000 * 3600 * 24));
    let recordHours = Math.floor((currentBullyRecord % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let recordMinutes = Math.floor((currentBullyRecord % (60 * 60 * 1000)) / (60 * 1000));
    let recordSeconds = Math.floor((currentBullyRecord % (60 * 1000)) / 1000);

    await storage.setItem("lastBullyTime", currentTimestamp);

    if(command == "!vully"){
        msg.channel.send('Venevolent moderator **vrandtamos** has veen vullied.\n\nIt has veen **' + dayDiff + ' days, ' + hours +' hours, ' + minutes + ' minutes and ' + seconds +' seconds** since **vrandtamos** was last vullied.\n\n**vrandtamos** has veen vullied a total of **' + newBullyCount + ' times**.\n\nThe record for the longest amount of time **vrandtamos** has not veen vullied is **' + recordDays  +' days, '  +recordHours + ' hours, ' + recordMinutes + ' minutes and ' + recordSeconds +' seconds**.');
    }
    else{
        msg.channel.send('Benevolent moderator **brandtamos** has been bullied.\n\nIt has been **' + dayDiff + ' days, ' + hours +' hours, ' + minutes + ' minutes and ' + seconds +' seconds** since **brandtamos** was last bullied.\n\n**brandtamos** has been bullied a total of **' + newBullyCount + ' times**.\n\nThe record for the longest amount of time **brandtamos** has not been bullied is **' + recordDays  +' days, '  +recordHours + ' hours, ' + recordMinutes + ' minutes and ' + recordSeconds +' seconds**.');
    }
}

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

function checkForCommand(msg, command){
    let commandObject = commandList.find(commandObj => commandObj.command == command);
    if(commandObject){
        msg.channel.send(commandObject.commandText);
    }
}

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