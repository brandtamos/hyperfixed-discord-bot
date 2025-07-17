const { DateTime } = require("luxon");

function generateTimezoneString(rightAboutNow) {
  const format = "EEE dd LLL HH:mm / hh:mm a";

  const seattle = rightAboutNow.setZone("America/Los_Angeles");
  const regina = rightAboutNow.setZone("America/Regina");
  const fargo = rightAboutNow.setZone("America/Chicago");
  const charleston = rightAboutNow.setZone("America/New_York");
  const sthlm = rightAboutNow.setZone("Europe/Stockholm");
  const sydney = rightAboutNow.setZone("Australia/Sydney");

  let responseMessage = "Current time in:";
  responseMessage += "\n**Seattle**: " + seattle.toFormat(format);
  responseMessage += "\n**Regina**: " + regina.toFormat(format);
  responseMessage += "\n**Fargo**: " + fargo.toFormat(format);
  responseMessage += "\n**Charleston**: " + charleston.toFormat(format);
  responseMessage += "\n**Stockholm**: " + sthlm.toFormat(format);
  responseMessage += "\n**Sydney**: " + sydney.toFormat(format);
  return responseMessage;
}

async function now(msg){
  try {
    const rightAboutNow = DateTime.now()
    const responseMessage = generateTimezoneString(rightAboutNow);
    msg.channel.send(responseMessage);
  }
  catch(error){
    console.error(error);
  }
}

exports.now = now;
exports.generateTimezoneString = generateTimezoneString;
