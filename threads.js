const threadsManager = require('./threadsManager');

const MAX_MESSAGE_LENGTH = 2000;

/* adds a new thread into the list for the channel where
 * the command is typed
 *
 * usage: !addthread [thread id] | [thread description]
 */
async function add(msg) {
  try {
    const commandUsage = "\n Command usage:\n`!addthread [thread id/name] | [thread description]`";
    const msgSplit = msg.content.split("|");

    let error = "";

    if (msgSplit.length < 2) {
      error = "Incomplete command.\n"
      error += commandUsage;
      msg.client.users.send(msg.author.id, error);
      return
    }

    let threadDescription = msgSplit[1].trim();
    let thread = msgSplit[0].slice("!addthread".length).trim();

    // if this check fails, an id is not provided 
    // if so, we try to find the thread by name
    if (!await isThread(msg.client, thread)) {
      
      // try to see if it is a thread name (get id by the name)
      threadObj = msg.channel.threads.cache.find(c => c.name == thread);
      if (threadObj !== undefined) {
        threadID = threadObj.id;
      } else {
        error += "`" + thread + "` is not a thread id or thread name.\n";
      }
    } else {
      // if we get here, the user input was a threade id 
      threadID = thread;
    }

    // send errors as DM:s to the user
    if (error != "") {
      error += commandUsage;
      msg.client.users.send(msg.author.id, error);
      return
    }

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
    let threadID = msg.content.slice("!removethread".length).trim();
    
    let error = ""
    if (threadID === undefined) {
      error = "\nNo thread id or name provided."
    }

    if (threadID !== undefined && !threadsManager.getThreads().some(t => t.threadID == threadID)) {
      
      threadObj = msg.channel.threads.cache.find(c => c.name == threadID);
      if (threadObj !== undefined) {
        threadID = threadObj.id
      } else {
        error = "\nThread `"+ threadID  +"` is not stored."
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
  const serverId = msg.guild.id;

  const allThreads = (
    await Promise.all(
      threadsManager.getThreads().map(async (t) => {
        // get the thread from the stored id 
        // first try to hit the cache for the thread (faster)
        let thread = msg.client.channels.cache.get(t.threadID);

        // if the thread is not in the cache, hit the API (slower)
        if (!thread) {
          try {
            thread = await msg.client.channels.fetch(t.threadID);
          } catch {
            // Ignore fetch errors
          }
        }

        const threadName = thread?.isThread() ? thread.name : 404;

        if (threadName !== 404) {
          return `[#${threadName}](https://discord.com/channels/${serverId}/${t.threadID}) - ${t.description}`;
        }
        return `Could not find thread with id:${t.threadID} and description: ${t.description}`
      })
    )
  );
   
  if(!allThreads.length) {
      msg.channel.send("No threads bookmarked on the server.")
  } else {
    let response = 'All bookmarked threads on the server:\n';

    let i = 0;
    allThreads.forEach((newLine) => {

      // only add '\n' if this is not hte last element
      // otherwise the test faild :D
      i = i + 1;
      if (i < allThreads.length) {
        newLine = newLine + '\n'
      }

      if ((response.length + newLine.length) >= MAX_MESSAGE_LENGTH) {
            msg.channel.send(response);
            response = '';
        }
        response = response + newLine;
    });

    if (response.length > 0) {
        msg.channel.send(response);
    }

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
