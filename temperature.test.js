const { messageHasTemps, convertTemps } = require('./temperature');

describe('temperature unit tests', () => {
    describe('messageHasTemps', () => {
        it('should return true for messages with Celsius temperatures', () => {
            expect(messageHasTemps('It is 20C outside.')).toBe(true);
            expect(messageHasTemps('It is 20°C outside.')).toBe(true);
            expect(messageHasTemps('It is -20c outside.')).toBe(true);
        });

        it('should return true for messages with Fahrenheit temperatures', () => {
            expect(messageHasTemps('It is 70F outside.')).toBe(true);
            expect(messageHasTemps('It is 70°F outside.')).toBe(true);
            expect(messageHasTemps('It is -70f outside.')).toBe(true);
        });

        it('should return false for messages without temperatures', () => {
            expect(messageHasTemps('It is sunny outside.')).toBe(false);
            expect(messageHasTemps('The temperature is normal.')).toBe(false);
        });
    });

    describe('convertTemps', () => {
        it('should correctly convert Fahrenheit to Celsius', () => {
            expect(convertTemps('70F')).toBe('70°F = 21°C\n');
        });

        it('should correctly convert Celsius to Fahrenheit', () => {
            expect(convertTemps('21C')).toBe('21°C = 70°F\n');
        });

        it('should handle multiple temperatures in a single message', () => {
            expect(convertTemps('It is 70F and 21C.')).toBe('70°F = 21°C\n21°C = 70°F\n');
        });

        it('should handle negative temperatures', () => {
            expect(convertTemps('-4F')).toBe('-4°F = -20°C\n');
            expect(convertTemps('-20C')).toBe('-20°C = -4°F\n');
        });

        it('should handle temperatures with decimal points', () => {
            expect(convertTemps('69.8F')).toBe('69.8°F = 21°C\n');
        });
    });
});