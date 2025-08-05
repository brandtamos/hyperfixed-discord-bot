const threads = require('./threads');
const threadsManager = require('./threadsManager');

jest.mock('./threadsManager', () => ({
    getThreads: jest.fn(),
    addThread: jest.fn(),
    removeThread: jest.fn(),
}));

describe('threads', () => {
    let mockMsg;

    beforeEach(() => {
        threadsManager.getThreads.mockReset();
        threadsManager.addThread.mockReset();
        threadsManager.removeThread.mockReset();

        mockMsg = {
            content: '',
            channel: {
                id: 'channel-123',
                threads: {
                    cache: {
                        find: jest.fn(),
                    },
                },
                send: jest.fn(),
            },
            client: {
                users: {
                    send: jest.fn(),
                },
                channels: {
                    fetch: jest.fn().mockResolvedValue({ isThread: () => true }),
                }
            },
            author: {
                id: 'author-123',
            },
            reply: jest.fn(),
        };
    });

    describe('add', () => {
        it('should add a thread successfully', async () => {
            mockMsg.content = '!addthread 12345 | Test Thread';
            threadsManager.addThread.mockResolvedValue(true);
            await threads.add(mockMsg);
            expect(threadsManager.addThread).toHaveBeenCalledWith({
                channelID: 'channel-123',
                threadID: '12345',
                description: 'Test Thread',
            });
            expect(mockMsg.reply).toHaveBeenCalledWith('<#12345> has been successfully **added** to the list for this channel!');
        });
    });

    describe('remove', () => {
        it('should remove a thread successfully', async () => {
            mockMsg.content = '!removethread 12345';
            threadsManager.getThreads.mockReturnValue([{ threadID: '12345' }]);
            threadsManager.removeThread.mockResolvedValue(true);
            await threads.remove(mockMsg);
            expect(threadsManager.removeThread).toHaveBeenCalledWith('12345');
            expect(mockMsg.reply).toHaveBeenCalledWith('<#12345> has been successfully **removed** from the list for this channel!');
        });
    });

    describe('list', () => {
        it('should list all threads', async () => {
            threadsManager.getThreads.mockReturnValue(
                [
                    { threadID: '123', description: 'Thread 1' },
                    { threadID: '456', description: 'Thread 2' },
                ]);
            await threads.list(mockMsg);
            expect(mockMsg.channel.send).toHaveBeenCalledWith('All bookmarked threads on the server:\n<#123> - Thread 1\n<#456> - Thread 2');
        });

        it('should show a message when no threads are bookmarked', async () => {
            threadsManager.getThreads.mockReturnValue([]);
            await threads.list(mockMsg);
            expect(mockMsg.channel.send).toHaveBeenCalledWith('No threads bookmarked on the server.');
        });
    });
});
