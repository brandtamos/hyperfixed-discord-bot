const stats = require('./stats');
const storage = require('node-persist');

jest.mock('node-persist', () => ({
    init: jest.fn(),
    getItem: jest.fn().mockResolvedValue(undefined),
    setItem: jest.fn(),
}));

describe('stats', () => {
    beforeEach(async () => {
        // Reset the in-memory stats before each test by reloading from empty storage
        storage.getItem.mockResolvedValue(undefined);
        await stats.loadStats();
        storage.setItem.mockClear();
    });

    test('loads existing stats from storage', async () => {
        storage.getItem.mockResolvedValue({ '!help': 3 });
        await stats.loadStats();
        expect(stats.getStats()).toEqual({ '!help': 3 });
    });

    test('records a command and persists it', async () => {
        await stats.recordCommand('!time');
        expect(stats.getStats()).toEqual({ '!time': 1 });
        expect(storage.setItem).toHaveBeenCalledWith('commandStats', { '!time': 1 });
    });

    test('increments an existing command count', async () => {
        await stats.recordCommand('!time');
        await stats.recordCommand('!time');
        expect(stats.getStats()['!time']).toBe(2);
    });

    test('tracks multiple distinct commands', async () => {
        await stats.recordCommand('!help');
        await stats.recordCommand('!time');
        await stats.recordCommand('!help');
        expect(stats.getStats()).toEqual({ '!help': 2, '!time': 1 });
    });

    test('ignores empty command input', async () => {
        await stats.recordCommand('');
        await stats.recordCommand(undefined);
        expect(stats.getStats()).toEqual({});
        expect(storage.setItem).not.toHaveBeenCalled();
    });

    test('formatStats returns a friendly message when empty', () => {
        expect(stats.formatStats()).toBe('No command usage has been recorded yet.');
    });

    test('formatStats lists commands in descending order of use', async () => {
        await stats.recordCommand('!help');
        await stats.recordCommand('!time');
        await stats.recordCommand('!time');
        const output = stats.formatStats();
        expect(output).toContain('1. `!time` - 2');
        expect(output).toContain('2. `!help` - 1');
        // !time should appear before !help
        expect(output.indexOf('!time')).toBeLessThan(output.indexOf('!help'));
    });
});
