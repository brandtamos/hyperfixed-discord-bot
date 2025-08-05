const { make, unitMap, conversions, conversionUnit } = require('./conversion');

describe('conversion unit tests', () => {
  it('should correctly convert units', () => {
    expect(make('20km')).toBe('20 km = 12.43 mi\n');
    expect(make('12mi')).toBe('12 mi = 19.31 km\n');
    expect(make('70F')).toBe('70 F = 21.11 °C\n');
    expect(make('21C')).toBe('21 C = 69.8 °F\n');
  });

  it('should handle multiple values in a single message', () => {
    const conversions = make('It is 20km, 12mi, 70F, and 21C.').trim().split('\n');
    expect(conversions).toEqual([
      '20 km = 12.43 mi',
      '12 mi = 19.31 km',
      '70 F = 21.11 °C',
      '21 C = 69.8 °F',
    ]);
  });

  it('should handle negative values', () => {
    expect(make('-20km')).toBe('-20 km = -12.43 mi\n');
    expect(make('-4F')).toBe('-4 F = -20 °C\n');
  });

  it('should handle different unit spellings', () => {
    expect(make('20 kilometers')).toBe('20 km = 12.43 mi\n');
    expect(make('12 miles')).toBe('12 mi = 19.31 km\n');
  });

  it('should handle floating point numbers', () => {
    expect(make('1.60934km')).toBe('1.60934 km = 1 mi\n');
    expect(make('0.621371mi')).toBe('0.621371 mi = 1 km\n');
    expect(make('69.8F')).toBe('69.8 F = 21 °C\n');
  });

  it('should not use fp precision if not necessary', () => {
    expect(make('20 km')).toBe('20 km = 12.43 mi\n');
    expect(make('20 mi')).toBe('20 mi = 32.19 km\n');
  });

  it('should have a conversion for every unit defined', () => {
    const units = new Set(Object.values(unitMap));
    for (const unit of units) {
      // Check the conversion functions
      expect(conversions).toHaveProperty(unit);
      expect(typeof conversions[unit]).toBe('function');
      // Check the target units
      expect(conversionUnit).toHaveProperty(unit);
    }
  });
});
