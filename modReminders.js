MAX_MESSAGE_LENGTH = 2000;

async function loop(reminderChannel, responseChannel, modRoleID) {

  const messages = await fetchAllMessages(reminderChannel);

  let reminders = [];
  const now = new Date(); 

  if (now.getHours() === 11 && // 11 UTC = 06/07 Charleston 
      now.getMinutes() === 0) {
    
    messages.forEach(m => {
      let messageParts = m.content.split(" ");
    
      const date = messageParts[0].split("-");
      messageParts = messageParts.slice(1);
    
      // if year is not specified, we want a reminder every year 
      let year = now.getFullYear(); 
      let month = parseInt("0", 10);
      let day = parseInt("0", 10);
      let yearsSince = 0;
    
      if (date.length === 3) {
        year = parseInt(date[0], 10);
        month = parseInt(date[1], 10);
        day = parseInt(date[2], 10);
        yearsSince = parseInt(now.getFullYear(), 10) - year;
      } else {
        month = parseInt(date[0], 10);
        day = parseInt(date[1], 10);
      }
   
      if (now.getMonth() === month - 1 && // getMonth is zero indexed
        now.getDate() === day ){ 
          let reminder = "- " + messageParts.join(" "); 
          if ( yearsSince > 0) {
             reminder += ` [${yearsSince} years ago]`;
          }
          reminder += ` [#](${m.url})`
          reminders.push(reminder);
      }
    });
 
    if (reminders.length) {
      let response = `Grand timezone <@&${modRoleID}>! Today is ${now.getMonth()+1}/${now.getDate()} (US). You have asked me to remind you of the following:\n`;

      let i = 0;
      reminders.forEach((newLine) => {
        // only add '\n' if this is not hte last element
        // otherwise the test fails :D
        i = i + 1;
        if (i < reminders.length) {
          newLine = newLine + '\n'
        }

        if ((response.length + newLine.length) >= MAX_MESSAGE_LENGTH) {
              msg.channel.send(response);
              responseChannel.send(response);
              response = '';
          }
          response = response + newLine;
      });

      if (response.length > 0) {
          responseChannel.send(response);
      }
    }
  }
}

const fetchAllMessages = async (channel) => {
  let allMessages = [];
  let lastId;

  while (true) {
    const options = { limit: 100 };
    if (lastId) options.before = lastId;

    const messages = await channel.messages.fetch(options);
    
    if (messages.size === 0) break;
    
    allMessages.push(...messages.values());
    lastId = messages.last().id;
  }

  return allMessages.reverse();
};

exports.loop = loop
