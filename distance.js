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
  return Math.round(km * 0.621371);
}

function convertMilesToKm(mi) {
  return Math.round(mi * 1.60934);
}

exports.messageHasDistance= messageHasDistance;
exports.convertDistance = convertDistance;
