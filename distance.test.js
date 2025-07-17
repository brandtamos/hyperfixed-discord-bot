const { messageHasDistance, convertDistance } = require('./distance');

describe('distance unit tests', () => {
    describe('messageHasDistance', () => {
        it('should not move thong to fart', () => {
            expect(messageHasDistance(':mt2f:')).toBe(false);
        });

        it('should return true for messages with metric distances', () => {
            expect(messageHasDistance('It is 20km away.')).toBe(true);
            expect(messageHasDistance('It is 20 kilometers away.')).toBe(true);
        });

        it('should return true for messages with imperial distances', () => {
            expect(messageHasDistance('It is 20mi away.')).toBe(true);
            expect(messageHasDistance('It is 20 miles away.')).toBe(true);
        });

        it('should return false for messages without distances', () => {
            expect(messageHasDistance('It is far away.')).toBe(false);
        });
    });

    describe('convertDistance', () => {
        it('should correctly convert kilometers to miles', () => {
            expect(convertDistance('20km')).toBe('20 km = 12 mi\n');
        });

        it('should correctly convert miles to kilometers', () => {
            expect(convertDistance('12mi')).toBe('12 mi = 19 km\n');
        });

        it('should handle multiple distances in a single message', () => {
            expect(convertDistance('It is 20km and 12mi away.')).toBe('20 km = 12 mi\n12 mi = 19 km\n');
        });

        it('should handle negative distances', () => {
            expect(convertDistance('-20km')).toBe('-20 km = -12 mi\n');
        });

        it('should handle different units', () => {
            expect(convertDistance('20 kilometers')).toBe('20 km = 12 mi\n');
            expect(convertDistance('12 miles')).toBe('12 mi = 19 km\n');
        });

        it('should handle floating point numbers', () => {
            expect(convertDistance('1.60934km')).toBe('1.60934 km = 1.00 mi\n');
            expect(convertDistance('0.621371mi')).toBe('0.621371 mi = 1.00 km\n');
        });

        it('should not use fp precision if not necessary', () => {
            expect(convertDistance('20 km')).toBe('20 km = 12 mi\n');
            expect(convertDistance('20 mi')).toBe('20 mi = 32 km\n');
        });
    });
});
