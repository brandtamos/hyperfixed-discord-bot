function messageHasTemps(text){
    const tempMessageRegex = /-?\d+(\.\d+)?°?[CFcf]\b/;
    return tempMessageRegex.test(text);
}

function convertTemps(text){
    const celsiusValues = extractAllCelsiusValues(text);
    const fahrenheitValues = extractAllFahrenheitValues(text);

    let responseMessage = '';

    fahrenheitValues.forEach((fTemp) => {
        responseMessage = responseMessage + fTemp + '°F = ' + convertFahrenheitToCelsius(fTemp) + '°C\n';
    });

    celsiusValues.forEach((cTemp) => {
        responseMessage = responseMessage + cTemp + '°C = ' + convertCelsiusToFahrenheit(cTemp) + '°F\n';
    });

    return responseMessage;
}

function extractAllFahrenheitValues(text){
    const numbers = [];
    const temperatureRegex = /(-?\d+(\.\d+)?)°?[Ff]\b/g;

    let match;
    while ((match = temperatureRegex.exec(text)) !== null) {
        numbers.push(parseFloat(match[1]));
    }
    return numbers;
}

function convertCelsiusToFahrenheit(celsius) {
  const fahrenheit = Math.round((celsius * 1.8) + 32);
  return fahrenheit;
}

function convertFahrenheitToCelsius(fahrenheit) {
  const celsius = Math.round((fahrenheit - 32) / 1.8);
  return celsius;
}

function extractAllCelsiusValues(text){
    const numbers = [];
    const temperatureRegex = /(-?\d+(\.\d+)?)°?[Cc]\b/g;

    let match;
    while ((match = temperatureRegex.exec(text)) !== null) {
        numbers.push(parseFloat(match[1]));
    }
    return numbers;
}

exports.messageHasTemps = messageHasTemps;
exports.convertTemps = convertTemps;