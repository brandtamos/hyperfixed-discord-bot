const storage = require('node-persist');

//async start functions
const start = async function(){
  await storage.init({dir: 'storage'});
}
start();

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

async function updateLeaderboard(bullierName){
    const storedLeaderboard = await storage.getItem("bullyLeaderboard");

    if (typeof storedLeaderboard != 'undefined'){
        let leaderBoard = storedLeaderboard;
        let leaderBoardEntry = leaderBoard.find(entry => entry.userName == bullierName);
        if(leaderBoardEntry){
            //increment bully count for user
            leaderBoardEntry.bullyCount++;

            //replace user's leaderboard entry
            const updateLeaderboard = leaderBoard.map( entry => {
                if(entry.userName == bullierName){
                    return leaderBoardEntry;
                }
                return entry;
            });
            await storage.setItem("bullyLeaderboard", updateLeaderboard);
        }
        else{
            //new bullier! add them to the leaderboard array
            const newLeaderboardEntry = {userName: bullierName, bullyCount: 1}
            leaderBoard.push(newLeaderboardEntry);
            await storage.setItem("bullyLeaderboard", leaderBoard);
        }
    }
    else{
        let leaderBoard = [];
        let newLeaderEntry = {userName: bullierName, bullyCount: 1}
        leaderBoard.push(newLeaderEntry);
        await storage.setItem("bullyLeaderboard", leaderBoard);
    }
}

async function getLeaderboard(msg){
    try{
        const storedLeaderboard = await storage.getItem("bullyLeaderboard");

        //handle an empty leaderboard
        if (typeof storedLeaderboard == 'undefined'){
            msg.channel.send('Nobody has bullied yet!');
            return;
        }

        const sortedLeaderboard = storedLeaderboard.sort((a, b) => b.bullyCount - a.bullyCount);

        let responseMessage = '>>> '; //this sets a block quote in markdown
        sortedLeaderboard.forEach(element => {
            responseMessage = responseMessage + '`' + element.userName + '`: `' + element.bullyCount + '`\n';
        });

        msg.channel.send(responseMessage);
    }
    catch(error){
        console.error(error);
    }
    
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

    //update leaderboard count
    await updateLeaderboard(msg.author.username);

    const ch = command.charAt(1).toLowerCase();
    const bullyMsg = `${ch.toUpperCase()}enevolent moderator **${ch}randtamos** has ${ch}een ${ch}ullied.\n\nIt has ${ch}een **${dayDiff} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds** since **${ch}randtamos** was last ${ch}ullied.\n\n**${ch}randtamos** has ${ch}een ${ch}ullied a total of **${newBullyCount} times**.\n\nThe record for the longest amount of time **${ch}randtamos** has not ${ch}een ${ch}ullied is **${recordDays} days, ${recordHours} hours, ${recordMinutes} minutes and ${recordSeconds} seconds**.`
    msg.channel.send(bullyMsg);
}

exports.bullyHasHappened = bullyHasHappened;
exports.getLeaderboard = getLeaderboard;