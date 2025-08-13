const storage = require('node-persist');

let commandList = [];
let secretMenuCommandList = [];

const CommandType = Object.freeze({
    STANDARD: 'standard',
    SECRETMENU: 'secretmenu'
});

//async start functions
const start = async function(){
  await storage.init({dir: 'storage'});

    //load help commands into memory on app start
    let storedCommands = await storage.getItem("storedCommands");
    if (typeof storedCommands != 'undefined'){
        commandList = storedCommands;
    }

    //load secret menu items into memory
    let secretMenuCommands = await storage.getItem("storedSecretMenuCommands");
    if (typeof secretMenuCommands != 'undefined'){
        secretMenuCommandList = secretMenuCommands;
    }
}
start();


/**
 * Checks if a command exists in storage and executes it
 * @param {import('discord.js').Message} msg - Discord message object
 * @param {string} command - The command to check for
 */
function checkForCommand(msg, command){
    let commandObject = commandList.find(commandObj => commandObj.command == command);
    if(commandObject){
        msg.channel.send(commandObject.commandText);
        return;
    }

    commandObject = secretMenuCommandList.find(commandObj => commandObj.command == command);
    if(commandObject){
        msg.channel.send(commandObject.commandText);
    }
}

/**
 * Adds a new custom command with description and output text
 * @async
 * @param {import('discord.js').Message} msg - Discord message invoking command
 * @returns {Promise<void>}
 */
async function addCommand(msg, commandType){
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

        let commandExists = false;
        switch(commandType){
            case CommandType.STANDARD:
                commandExists = commandList.some(command => command.command == newCommand);
                break;
            case CommandType.SECRETMENU:
                commandExists = secretMenuCommandList.some(command => command.command == newCommand);
                break;
            default:
                break;
        }

        if(commandExists){
            msg.reply("Command `" + newCommand + "` already exists.");
        }
        else{
            switch(commandType){
                case CommandType.STANDARD:
                    commandList.push(commandObject);
                    await storage.setItem("storedCommands", commandList);
                    break;
                case CommandType.SECRETMENU:
                    secretMenuCommandList.push(commandObject);
                    await storage.setItem("storedSecretMenuCommands", secretMenuCommandList);
                    break;
                default:
                    break;
            }
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
async function removeCommand(msg, commandType){
    let commandToRemove = msg.content.split(" ")[1].toLowerCase();
    if(commandToRemove.charAt(0) != '!'){
        commandToRemove = "!" + commandToRemove;
    }

    switch(commandType){
        case CommandType.STANDARD:
                let modifiedCommandList = commandList.filter(commandObj => commandObj.command != commandToRemove);
                commandList = modifiedCommandList;
                await storage.setItem("storedCommands", commandList);
            break;
        case CommandType.SECRETMENU:
            let modifiedSecretMenuCommandList = secretMenuCommandList.filter(commandObj => commandObj.command != commandToRemove);
            secretMenuCommandList = modifiedSecretMenuCommandList;
            await storage.setItem("storedSecretMenuCommands", secretMenuCommandList);
            break;
        default:
            break;
    }

    msg.reply("Command " + commandToRemove +  " has been removed!");
}

function getStandardCommands(){
    return commandList;
}

function getSecretMenuCommands(){
    return secretMenuCommandList;
}

//exports.checkForCommand = checkForCommand;
//exports.addCommand = addCommand;
//exports.removeCommand = removeCommand;
//module.exports = commandList;
//module.exports = secretMenuCommandList;

module.exports = {
    CommandType,
    checkForCommand,
    addCommand,
    removeCommand,
    getStandardCommands,
    getSecretMenuCommands
}