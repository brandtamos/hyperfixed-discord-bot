const { Client } = require('discord.js');
const index = require('./index');
const temperature = require('./temperature');
const distance = require('./distance');
const bully = require('./bully');
const threads = require('./threads');
const timezone = require('./timezone');

jest.mock('discord.js', () => {
    const { mock } = require('jest-mock-extended');
    const client = mock();
    const onCallbacks = {};
    client.on.mockImplementation((event, callback) => {
        onCallbacks[event] = callback;
        return client;
    });
    client.once.mockReturnThis();
    client.login.mockReturnValue(Promise.resolve().catch(() => {}));

    // Helper to get the callback
    client.getOnCallback = (event) => onCallbacks[event];

    return {
        Client: jest.fn(() => client),
        GatewayIntentBits: {
            Guilds: 0,
            GuildMessages: 0,
            MessageContent: 0,
            GuildMembers: 0,
            GuildMessageReactions: 0,
        },
        Partials: {
            Message: 0,
            Channel: 0,
            Reaction: 0,
        }
    };
});

jest.mock('./temperature', () => ({ messageHasTemps: jest.fn(), convertTemps: jest.fn() }));
jest.mock('./distance', () => ({ messageHasDistance: jest.fn(), convertDistance: jest.fn() }));
jest.mock('./bully', () => ({ bullyHasHappened: jest.fn(), getLeaderboard: jest.fn() }));
jest.mock('./threads', () => ({ add: jest.fn(), remove: jest.fn(), list: jest.fn() }));
jest.mock('./timezone', () => ({ now: jest.fn() }));

describe('index.js', () => {
    let mockMsg;
    let client;

    beforeEach(() => {
        client = new Client();
        jest.clearAllMocks();

        mockMsg = {
            content: '',
            author: { bot: false },
            channel: { send: jest.fn() },
            member: { roles: { cache: { find: jest.fn() } } },
            reply: jest.fn(),
        };
    });

    it('should call convertTemps when message has temps', () => {
        mockMsg.content = 'It is 20C outside.';
        temperature.messageHasTemps.mockReturnValue(true);
        const messageCreateCallback = client.getOnCallback('messageCreate');
        messageCreateCallback(mockMsg);
        expect(temperature.convertTemps).toHaveBeenCalledWith(mockMsg.content);
    });

    it('should call convertDistances when message has distances', () => {
        mockMsg.content = 'It is 20km away.';
        distance.messageHasDistance.mockReturnValue(true);
        const messageCreateCallback = client.getOnCallback('messageCreate');
        messageCreateCallback(mockMsg);
        expect(distance.convertDistance).toHaveBeenCalledWith(mockMsg.content);
    });

    it('should call bully.bullyHasHappened for bully commands', async () => {
        mockMsg.content = '!bully';
        const messageCreateCallback = client.getOnCallback('messageCreate');
        await messageCreateCallback(mockMsg);
        expect(bully.bullyHasHappened).toHaveBeenCalledWith(mockMsg, '!bully');
    });

    it('should call bully.getLeaderboard for !bullyleaderboard command', async () => {
        mockMsg.content = '!bullyleaderboard';
        const messageCreateCallback = client.getOnCallback('messageCreate');
        await messageCreateCallback(mockMsg);
        expect(bully.getLeaderboard).toHaveBeenCalledWith(mockMsg);
    });

    it('should call timezone.now for !time command', async () => {
        mockMsg.content = '!time';
        const messageCreateCallback = client.getOnCallback('messageCreate');
        await messageCreateCallback(mockMsg);
        expect(timezone.now).toHaveBeenCalledWith(mockMsg);
    });

    it('should call threads.list for !threads command', async () => {
        mockMsg.content = '!threads';
        const messageCreateCallback = client.getOnCallback('messageCreate');
        await messageCreateCallback(mockMsg);
        expect(threads.list).toHaveBeenCalledWith(mockMsg);
    });
});
