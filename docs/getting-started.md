# Getting Started

## Installation
1. Clone repository: `git clone https://github.com/brandtamos/hyperfixed-discord-bot.git`
2. Navigate to directory: `cd hyperfixed-discord-bot`
3. Install dependencies: `npm install`
4. Copy `.env_example` to `.env`: `cp .env_example .env`
5. Edit `.env` with your Discord bot configuration (see [Discord Setup Guide](discord-setup.md))

## First Run
```bash
npm start
```

If you encounter errors:
> **Tip:** Ensure your environment variables are correctly set. See [Configuration Guide](configuration.md) for details.

## Prerequisites
- Node.js 16+ installed
- Discord bot token (see [Discord Setup Guide](discord-setup.md))
- Administrator permissions on your Discord server

## Quick Test
After starting the bot, test these commands in your Discord server:
- `!help` - Shows available commands
- `!bully` - Tests bully tracking system
- Add/remove reactions on your pronoun message to test role assignment

For complete command documentation, see [Bot Commands Reference](commands.md).

## Unit Tests

After making changes, it's a good practice to run the automated tests to ensure
everything is working as expected.

```bash
npm test
```

This will run all the unit tests for the bot.

## Troubleshooting

### Common Issues

**Error: Missing BOT_TOKEN**
- Verify `.env` contains `BOT_TOKEN`
- Check that `.env` file is in the root directory
- Ensure no extra spaces around the token

**Permission issues**
- Ensure the bot has appropriate permissions in Discord
- Check that bot's role is higher than roles it needs to manage
- See [Discord Setup Guide](discord-setup.md) for required permissions

**Bot not responding**
- Verify bot is online in Discord
- Check hosting service logs for errors
- Ensure bot can see the channel you're typing in

**Reaction roles not working**
- Confirm `PRONOUN_REACTION_POST_ID` matches your message ID
- Verify emoji names match those in the code
- Check bot has "Manage Roles" permission

### Getting More Help
- See [FAQ](faq.md) for additional troubleshooting
- Check [Discord Setup Guide](discord-setup.md) for configuration help
