function messageHasDistance(text){
    const distanceRegex = /(?<=^|\s)(-?\d+(?:\.\d+)?)(?:\s)?(?:km|kilometers?|mi|miles?)(?=\s|$|[.,;!?:])/gi;
    return distanceRegex.test(text);
}

function convertDistance(text){
    const metricValues = extractAllMetricValues(text);
    const milesValues = extractAllMilesValues(text);

    let responseMessage = '';

    metricValues.forEach((v) => {
        responseMessage = responseMessage + v + ' km = ' + convertKmToMiles(v) + ' mi\n';
    });

    milesValues.forEach((v) => {
        responseMessage = responseMessage + v + ' mi = ' + convertMilesToKm(v) + ' km\n';
    });

    return responseMessage;
}

function extractAllMetricValues(text){
    const numbers = [];
    const metricDistanceRegex = /(?<=^|\s)(-?\d+(?:\.\d+)?)(?:\s)?(?:km|kilometers?)(?=\s|$|[.,;!?:])/gi;

    let match;
    while ((match = metricDistanceRegex.exec(text)) !== null) {
        numbers.push(parseFloat(match[1]));
    }
    return numbers;
}

function extractAllMilesValues(text){
    const numbers = [];
    const milesDistanceRegex = /(?<=^|\s)(-?\d+(?:\.\d+)?)(?:\s)?(?:mi|miles?)(?=\s|$|[.,;!?:])/gi;

    let match;
    while ((match = milesDistanceRegex.exec(text)) !== null) {
        numbers.push(parseFloat(match[1]));
    }
    return numbers;
}

function convertKmToMiles(km) {
  let mi = km * 0.621371;
  if (Math.abs(mi) < 10) {
    return mi.toFixed(2);
  } else {
    return Math.round(mi);
  }
}

function convertMilesToKm(mi) {
  let km = mi * 1.60934;
  if (Math.abs(km) < 10) {
    return km.toFixed(2);
  } else {
    return Math.round(km);
  }
}

exports.messageHasDistance= messageHasDistance;
exports.convertDistance = convertDistance;
