const storage = require('node-persist');

/** @type {Object<string, number>} In-memory map of command -> usage count */
let commandStats = {};

const STORAGE_KEY = 'commandStats';

/**
 * Loads persisted command usage stats into memory.
 * @async
 * @returns {Promise<Object<string, number>>} The loaded stats object
 */
async function loadStats(){
    let storedStats = await storage.getItem(STORAGE_KEY);
    commandStats = (typeof storedStats != 'undefined') ? storedStats : {};
    return commandStats;
}

//async start function - initializes storage and loads existing stats on app start
const start = async function(){
    await storage.init({dir: 'storage'});
    await loadStats();
}
start();

/**
 * Increments the usage counter for a command and persists it.
 * @async
 * @param {string} command - The command that was used (e.g. "!help")
 * @returns {Promise<void>}
 */
async function recordCommand(command){
    if(!command){
        return;
    }
    commandStats[command] = (commandStats[command] || 0) + 1;
    await storage.setItem(STORAGE_KEY, commandStats);
}

/**
 * Returns the current in-memory stats object.
 * @returns {Object<string, number>} command -> usage count
 */
function getStats(){
    return commandStats;
}

/**
 * Builds a human-readable, descending usage leaderboard string.
 * @returns {string} Formatted leaderboard, or a friendly message if empty
 */
function formatStats(){
    const entries = Object.entries(commandStats).sort((a, b) => b[1] - a[1]);
    if(entries.length === 0){
        return 'No command usage has been recorded yet.';
    }
    let response = '**Command usage stats**\n';
    entries.forEach(([command, count], index) => {
        response += `${index + 1}. \`${command}\` - ${count}\n`;
    });
    return response;
}

module.exports = {
    loadStats,
    recordCommand,
    getStats,
    formatStats
};
