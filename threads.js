const threadsManager = require('./threadsManager');

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
    // remove the first 11 chars to remove command and first space
    let threadID = msgSplit[0].slice(11); 

    let error = "";
    if (threadID === undefined) {
      error += "No thread id provided.\n";
    }
    
    if (threadDescription === undefined) {
      error += "No thread description provided.\n";
    }

    // if this check fails, an id is not provided 
    if (!await isThread(msg.client, threadID)) {
      
      // try to see if it is a thread name (get id by the name)
      // first we trim whitespaces at the ends 
      threadID = threadID.trim()
      threadObj = msg.channel.threads.cache.find(c => c.name == threadID);
      threadID = threadObj.id;

      if (!await isThread(msg.client, threadID)) {
        error += "`" + threadID + "` is not a thread id or thread name.\n";
      }
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

    if (await threadsManager.addThread(threadObject)) {
        msg.reply("<#" + threadID + "> has been successfully **added** to the list for this channel!");
    } else {
        msg.client.users.send(msg.author.id, "<#" + threadID + "> is already in the list for this channel.");
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
    let threadID = msg.content.slice(14);
    
    let error = ""
    if (threadID === undefined) {
      error = "No thread id provided."
    }

    if (threadID != undefined && !threadsManager.getThreads().some(t => t.threadID == threadID)) {
      threadID = threadID.trim()
      threadObj = msg.channel.threads.cache.find(c => c.name == threadID);
      threadID = threadObj.id;

      if (!await isThread(msg.client, threadID)) {
        error = "Thread is not stored."
      }
    }

    if (error != "") {
      msg.client.users.send(msg.author.id, "`Remove thread`: "+error);
      return
    }
    
    if (await threadsManager.removeThread(threadID)) {
        const response = "<#" + threadID + "> has been successfully **removed** from the list for this channel!"
        msg.reply(response);
    }

  } catch(error) {
    console.error(error);
  }
}

/* Lists all bookmarked threads in the server 
 */
async function list(msg) {
  try {
    const allThreads = threadsManager.getThreads()
      .map(t => `<#${t.threadID}> - ${t.description}`)
      .join("\n");

   
    if(allThreads != "") {
      let response = "All bookmarked threads on the server:\n";
      response += allThreads;
      msg.channel.send(response);
    } else {
      msg.channel.send("No threads bookmarked on the server.")
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
