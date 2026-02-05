function botSay(msg, client) {
  try{
    //if we're using quotes to surround the channel name
    if(msg.content[8] === '"'){
      const secondQuoteIndex = msg.content.indexOf('"', 9);

      //if we find the closing quote
      if (secondQuoteIndex !== -1) {
        const channelName = msg.content.slice(9, secondQuoteIndex);

        //command string with the channel name and quotes removed
        const modifiedString = msg.content.slice(0, 8) + msg.content.slice(secondQuoteIndex + 2); //+2 to account for the extra space

        const args = modifiedString.split(" ");
        const command = args[0];
        const channel = client.channels.cache.find(c => c.name == channelName);
        let botMessage = modifiedString.replace(command, "");
        botMessage = botMessage.replace(channelName, "").trim();
        channel.send(botMessage);
      }
    }
    //otherwise, we're not using quotes for the channel name
    else{
      const args = msg.content.split(" ");
      const command = args[0];
      const channelName = args[1];
      const channel = client.channels.cache.find(c => c.name == channelName);

      let botMessage = msg.content.replace(command, "");
      botMessage = botMessage.replace(channelName, "").trim();
      channel.send(botMessage);
    }
  }
  catch(error){
    console.error('Sentience FAILED.');
  }
}

function botReact(msg, client) {
  const args = msg.content.split(" ");
  const channelName = args[1];
  const messageId = args[2];
  const emoji = args[3];

  const channel = client.channels.cache.find(c => c.name == channelName);

  channel.messages
    .fetch(messageId)
    .then(message => message.react(emoji))
    .catch(console.error);
}

module.exports = {
    botSay,
    botReact
}