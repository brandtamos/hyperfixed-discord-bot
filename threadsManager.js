const storage = require('node-persist');

let threadList = [];

async function loadThreads() {
    await storage.init({ dir: 'storage' });
    let storedThreads = await storage.getItem("storedThreads");
    if (typeof storedThreads != 'undefined') {
        threadList = storedThreads;
    }
}

function getThreads() {
    return threadList;
}

async function addThread(threadObject) {
    if (threadList.some(t => t.threadID == threadObject.threadID)) {
        return false; // Thread already exists
    }
    threadList.push(threadObject);
    await storage.setItem("storedThreads", threadList);
    return true; // Thread added successfully
}

async function removeThread(threadID) {
    const initialLength = threadList.length;
    threadList = threadList.filter(t => t.threadID != threadID);
    if (threadList.length < initialLength) {
        await storage.setItem("storedThreads", threadList);
        return true; // Thread removed
    }
    return false; // Thread not found
}

loadThreads();

module.exports = {
    getThreads,
    addThread,
    removeThread,
    loadThreads
};
