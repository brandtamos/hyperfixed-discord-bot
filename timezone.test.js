const { generateTimezoneString } = require('./timezone');
const { DateTime } = require('luxon');

describe('timezone unit tests', () => {
    describe('generateTimezoneString', () => {
        it('should return formatted strings of times for a bunch of locations', () => {
            const specificDate = DateTime.fromISO('2024-01-01T12:00:00.000Z');

            const result = generateTimezoneString(specificDate);

            expect(result).toContain("**Seattle**: Mon 01 Jan 04:00 / 04:00 AM");
            expect(result).toContain("**Regina**: Mon 01 Jan 06:00 / 06:00 AM");
            expect(result).toContain("**Fargo**: Mon 01 Jan 06:00 / 06:00 AM");
            expect(result).toContain("**Charleston**: Mon 01 Jan 07:00 / 07:00 AM");
            expect(result).toContain("**Stockholm**: Mon 01 Jan 13:00 / 01:00 PM");
            expect(result).toContain("**Sydney**: Mon 01 Jan 23:00 / 11:00 PM");
        });
    });
});
