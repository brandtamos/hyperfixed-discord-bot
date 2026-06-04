async function getFlightWx(type, airport) {
  url = `https://aviationweather.gov/api/data/${type}?ids=${airport}&format=raw`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.text();
  return data.replace(/ \$$/, "") ?? null;
}

async function wx(type, msg) {
 
  let response = '';

  const parts = (msg.content || '').split(" ");
  const airport = parts[1];

  if (!airport) {
    response = 'I need an ICAO airport code to give you a ' + type.toUpperCase() + '.';
  } else if (airport.length !== 4) {
    response = 'Incorrect airport code, use ICAO code (4 letters).';
  } else {
    const data = await getFlightWx(type, airport.toLowerCase());
    if (data.length < 1) {
      response = `\`${airport}\` is not a valid ICAO airport code, or the API does not know about it.`;
    } else {
      response = `\`\`\`${data}\`\`\``;
    }
  }

  if (response.length > 0) {
    msg.channel.send(response);
  }

}

exports.wx = wx 
