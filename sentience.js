function botSay(msg, client) {
  const args = msg.content.split(" ");
  const command = args[0];
  const channelName = args[1];
  const channel = client.channels.cache.find(c => c.name == channelName);

  let botMessage = msg.content.replace(command, "");
  botMessage = botMessage.replace(channelName, "").trim();

  channel.send(botMessage);
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