const unitMap = {
  //metric
  km: 'km',
  kilometer: 'km',
  kilometers: 'km',
  m: 'm',
  meter: 'm',
  meters: 'm',
  cm: 'cm',
  centimeter: 'cm',
  centimeters: 'cm',
  '°c': 'C',
  c: 'C',
  celsius: 'C',
  g: 'g',
  gram: 'g',
  grams: 'g',
  kg: 'kg',
  kilogram: 'kg',
  kilograms: 'kg',

  //imperial
  mi: 'mi',
  mile: 'mi',
  miles: 'mi',
  ft: 'ft',
  foot: 'ft',
  feet: 'ft',
  in: 'in',
  inch: 'in',
  inches: 'in',
  '°f': 'F',
  f: 'F',
  fahrenheit: 'F',
  oz: 'oz',
  ounce: 'oz',
  ounces: 'oz',
  lb: 'lb',
  lbs: 'lb',
  pound: 'lb',
  pounds: 'lb',
};

const conversions = {
  km: value => value * 0.621371,  // to miles
  m: value => value * 3.28084,    // to feet
  cm: value => value * 0.3937008, // to inches
  mi: value => value * 1.60934,   // to kilometers
  ft: value => value * 0.3048,    // to meters
  in: value => value * 2.54,      // to cm
  C: value => value * 1.8 + 32,   // to farenheit
  F: value => (value - 32) / 1.8, // to celsius
  g: value => value * 0.035,      // to ounces
  kg: value => value * 2.2046,    // to pounds
  oz: value => value * 28.35,     // to grams
  lb: value => value / 2.2046,    // to kilograms
};

// units that we are converting to
const conversionUnit = {
  km: "mi",
  m: "ft",
  cm: "in",
  C: "°F",
  mi: "km",
  ft: "m",
  in: "cm",
  F: "°C",
  g: "oz",
  kg: "lb",
  oz: "g",
  lb: "kg",
};

const unitPattern = Object.keys(unitMap)
  .map(unit => unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // escape special characters
  .sort((a, b) => b.length - a.length) // longest first to avoid partial matches
  .join('|');

const regexp = new RegExp(
  `(?<!\\w)(-?\\d+(?:\\.\\d+)?)(?:\\s)?(${unitPattern})\\b`,
  'gi'
);

function extractAndConvert(text) {
  const matches = [...text.matchAll(regexp)];
  return matches.map(match => {
    const value = parseFloat(match[1]);
    const rawUnit = match[2].toLowerCase();
    const unit = unitMap[rawUnit];
    const converted = conversions[unit] ? conversions[unit](value) : null;
    const convUnit = conversionUnit[unit] ? conversionUnit[unit] : null;

    return {
      original: match[0],
      value,
      unit,
      converted,
      convUnit
    };
  });
};

function make(text) {
  const results = extractAndConvert(text);
  let message = '';

  results.forEach(e => {
    message += `${e.value} ${e.unit} = ${Math.round(e.converted * 100)/100} ${e.convUnit}\n`;
  });

  return message
};

exports.make = make;
exports.unitMap = unitMap;
exports.conversions = conversions;
exports.conversionUnit = conversionUnit;
