const storage = require('node-persist');

let threadList = [];

// load threads into memory on app start
const loadThreads = async function(){
    await storage.init({dir: 'storage'});

    let storedThreads = await storage.getItem("storedThreads");
    if (typeof storedThreads != 'undefined'){
        threadList = storedThreads;
    }
}
loadThreads();

/* adds a new thread into the list for the channel where
 * the command is typed
 *
 * usage: !addthread [thread id] | [thread description]
 */
async function add(msg) {
  try {
    const commandUsage = "\n Command usage:\n`!addthread [thread id] | [thread description]`";
    const msgSplit = msg.content.split("|");
    let threadDescription = msgSplit[1];
    const threadID = msgSplit[0].split(" ")[1];

    let error = "";
    if (threadID === undefined) {
      error += "No thread id provided.\n";
    }
    if (threadDescription === undefined) {
      error += "No thread description provided.\n"
    }
    if (!await isThread(msg.client, threadID)) {
      error += "`" + threadID + "` is not a thread id.\n";
    }

    // send errors as DM:s to the user
    if (error != "") {
      error += commandUsage;
      msg.client.users.send(msg.author.id, error);
      return
    }

    //remove whitespacing around the description
    threadDescription = threadDescription.trim();
    
    /* store the channel where the thread exists,
     * the thread id, and a description of the channel. 
     */ 
    let threadObject = {
      channelID: msg.channel.id,
      threadID: threadID,
      description: threadDescription
    };

    let threadExists = threadList.some(t => t.threadID == threadID);
    if(threadExists){
      msg.client.users.send(msg.author.id, "<#" + threadID + "> is already in the list for this channel.");
    } else {
      threadList.push(threadObject);
      await storage.setItem("storedThreads", threadList);
      msg.reply("<#" + threadID + "> has been successfully **added** to the list for this channel!");
    }

    } catch(error) {
    console.error(error);
  }
}

/* removes a thread from the channel list for the 
 * the channel where the command is executed
 *
 * usage: !removethread [thread id]
 */ 
async function remove(msg) {
  try {
    const threadID = msg.content.split(" ")[1];
    
    let error = ""
    if (threadID === undefined) {
      error = "No thread id provided."
    }

    if (threadID != undefined && !threadList.some(t => t.threadID == threadID)) {
      error = "Thread is not stored."
    }

    if (error != "") {
      msg.client.users.send(msg.author.id, "`Remove thread`: "+error);
      return
    }
    
    let modifiedThreadList = threadList.filter(t => t.threadID != threadID);
    threadList = modifiedThreadList;

    await storage.setItem("storedThreads", threadList);

    const response = "<#" + threadID + "> has been successfully **removed** from the list for this channel!"
    msg.reply(response);

  } catch(error) {
    console.error(error);
  }
}

/* lists all threads that are bookmarked in the 
 * channel where it is executed 
 *
 * usage: !threads
 */ 
async function list(msg) {
  try {
    let threadsInChannel = "";

    threadsInChannel = threadList
      .filter(t => t.channelID === msg.channel.id)
      .map(t => `<#${t.threadID}> - ${t.description}`)
      .join("\n");
    
    if (threadsInChannel != "") {
      let response = "Threads of interest for this channel:\n";
      response += threadsInChannel;
      msg.channel.send(response);
    } else {
      msg.channel.send("No threads stored for this channel.");
    }
  } catch(error) {
    console.error(error);
  }
}

/* checks if channelid belongs to a thread 
 * returns true/false
 */ 
async function isThread(client, threadID) {
  try {
    const t = await client.channels.fetch(threadID);
    return t.isThread();
  } catch(error) {
    // I dunno if this is the proper way to do it, but it seems to work as expected 
    return false
  }
}

exports.add = add;
exports.remove = remove;
exports.list = list;
