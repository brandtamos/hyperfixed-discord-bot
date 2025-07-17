const threadsManager = require('./threadsManager');
const storage = require('node-persist');

jest.mock('node-persist', () => ({
    init: jest.fn(),
    getItem: jest.fn().mockResolvedValue([]),
    setItem: jest.fn(),
}));

describe('threadsManager', () => {
    beforeEach(async () => {
        // Reset the threadList before each test by reloading from an empty mock storage
        storage.getItem.mockResolvedValue([]);
        await threadsManager.loadThreads();
        storage.setItem.mockClear();
    });

    test('should add a new thread', async () => {
        const thread = { threadID: '123', description: 'Test Thread' };
        const result = await threadsManager.addThread(thread);
        expect(result).toBe(true);
        expect(threadsManager.getThreads()).toContainEqual(thread);
        expect(storage.setItem).toHaveBeenCalledWith('storedThreads', [thread]);
    });

    test('should not add a duplicate thread', async () => {
        const thread = { threadID: '123', description: 'Test Thread' };
        await threadsManager.addThread(thread);
        const result = await threadsManager.addThread(thread);
        expect(result).toBe(false);
        expect(threadsManager.getThreads().length).toBe(1);
    });

    test('should remove an existing thread', async () => {
        const thread = { threadID: '123', description: 'Test Thread' };
        await threadsManager.addThread(thread);
        const result = await threadsManager.removeThread('123');
        expect(result).toBe(true);
        expect(threadsManager.getThreads()).not.toContainEqual(thread);
        expect(storage.setItem).toHaveBeenCalledWith('storedThreads', []);
    });

    test('should not remove a non-existent thread', async () => {
        const result = await threadsManager.removeThread('456');
        expect(result).toBe(false);
    });

    test('should return all threads', async () => {
        const thread1 = { threadID: '123', description: 'Test Thread 1' };
        const thread2 = { threadID: '456', description: 'Test Thread 2' };
        await threadsManager.addThread(thread1);
        await threadsManager.addThread(thread2);
        const threads = threadsManager.getThreads();
        expect(threads).toEqual([thread1, thread2]);
    });
});
