const { mock } = require('jest-mock-extended');
const storage = require('node-persist');
const { bullyHasHappened, getLeaderboard } = require('./bully');

jest.mock('node-persist', () => ({
    init: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

const RealDate = Date;

describe('bully unit tests', () => {
    let mockMsg;

    afterEach(() => {
        global.Date = RealDate;
    });

    beforeEach(() => {
        storage.getItem.mockReset();
        storage.setItem.mockReset();
        mockMsg = {
            channel: {
                send: jest.fn(),
            },
            author: {
                username: 'testuser',
            },
        };
    });

    describe('bullyHasHappened', () => {
        it('should construct and send the correct message for !bully', async () => {
            const lastBullyTime = new RealDate('2024-01-01T12:00:00.000Z').getTime();
            const bullyRecord = 2 * 24 * 60 * 60 * 1000; // 2 days

            storage.getItem.mockResolvedValueOnce(lastBullyTime); // lastBullyTime
            storage.getItem.mockResolvedValueOnce(10); // bullyCount
            storage.getItem.mockResolvedValueOnce(bullyRecord); // bullyRecord
            storage.getItem.mockResolvedValueOnce([]); // bullyLeaderboard

            // Mock the Date object to control the current time
            global.Date = class extends RealDate {
                constructor() {
                    super();
                    return new RealDate('2024-01-02T12:00:00.000Z');
                }
            };

            await bullyHasHappened(mockMsg, '!bully');

            const sentMessage = mockMsg.channel.send.mock.calls[0][0];
            expect(sentMessage).toContain('**brandtamos** has been bullied');
            expect(sentMessage).toContain('**1 days, 0 hours, 0 minutes and 0 seconds**');
            expect(sentMessage).toContain('a total of **11 times**');
            expect(sentMessage).toContain('is **2 days, 0 hours, 0 minutes and 0 seconds**');
        });

        it('should construct and send the correct message for !wully', async () => {
            const lastBullyTime = new RealDate('2024-01-01T12:00:00.000Z').getTime();
            const bullyRecord = 2 * 24 * 60 * 60 * 1000; // 2 days

            storage.getItem.mockResolvedValueOnce(lastBullyTime); // lastBullyTime
            storage.getItem.mockResolvedValueOnce(10); // bullyCount
            storage.getItem.mockResolvedValueOnce(bullyRecord); // bullyRecord
            storage.getItem.mockResolvedValueOnce([]); // bullyLeaderboard

            // Mock the Date object to control the current time
            global.Date = class extends RealDate {
                constructor() {
                    super();
                    return new RealDate('2024-01-02T12:00:00.000Z');
                }
            };

            await bullyHasHappened(mockMsg, '!wully');

            const sentMessage = mockMsg.channel.send.mock.calls[0][0];
            expect(sentMessage).toContain('**wrandtamos** has ween wullied');
            expect(sentMessage).toContain('**1 days, 0 hours, 0 minutes and 0 seconds**');
            expect(sentMessage).toContain('a total of **11 times**');
            expect(sentMessage).toContain('is **2 days, 0 hours, 0 minutes and 0 seconds**');
        });
    });

    describe('getLeaderboard', () => {
        it('should show an empty leaderboard message', async () => {
            storage.getItem.mockResolvedValue(undefined);
            await getLeaderboard(mockMsg);
            expect(mockMsg.channel.send).toHaveBeenCalledWith('Nobody has bullied yet!');
        });

        it('should show a sorted leaderboard', async () => {
            const leaderboard = [
                { userName: 'user1', bullyCount: 1 },
                { userName: 'user2', bullyCount: 5 },
                { userName: 'user3', bullyCount: 3 },
            ];
            storage.getItem.mockResolvedValue(leaderboard);
            await getLeaderboard(mockMsg);
            expect(mockMsg.channel.send).toHaveBeenCalledWith('>>> `user2`: `5`\n`user3`: `3`\n`user1`: `1`\n');
        });
    });
});

