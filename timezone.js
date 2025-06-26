const { DateTime } = require("luxon");

async function now(msg){
  try {

    const format = "EEE dd LLL HH:mm / hh:mm a";

    const rightAboutNow = DateTime.now()
    const seattle = rightAboutNow.setZone("America/Los_Angeles");
    const fargo = rightAboutNow.setZone("America/Chicago");
    const charleston = rightAboutNow.setZone("America/New_York");
    const sthlm   = rightAboutNow.setZone("Europe/Stockholm");
    const sydney  = rightAboutNow.setZone("Australia/Sydney");

    let responseMessage = "Current time in:";
    responseMessage += "\n**Seattle**: " + seattle.toFormat(format);
    responseMessage += "\n**Fargo**: " + fargo.toFormat(format);
    responseMessage += "\n**Charleston**: " + charleston.toFormat(format);
    responseMessage += "\n**Stockholm**: " + sthlm.toFormat(format);
    responseMessage += "\n**Sydney**: " + sydney.toFormat(format);
    
    msg.channel.send(responseMessage);
  }
  catch(error){
    console.error(error);
  }  
}

exports.now = now;
