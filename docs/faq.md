# Frequently Asked Questions

## General Questions

### Q: What does this bot do?
A: The Hyperfixed Discord Bot provides several main features:
- **Custom Commands**: Create text responses triggered by commands
- **Pronoun Roles**: Automatic role assignment via emoji reactions
- **Bully Tracking**: Fun statistical tracking for "bully" events with leaderboard
- **Time Zone Display**: Show current time across multiple global locations
- **Temperature Conversion**: Automatic Celsius ↔ Fahrenheit conversion for any temperatures mentioned
- **Easter Eggs**: Weezer detection and other fun responses

### Q: Is this bot free to use?
A: Yes, this is an open-source bot that you can host yourself for free.

### Q: Can I modify the bot for my server?
A: Absolutely! The bot is open-source and designed to be customizable.

## Setup & Installation

### Q: How do I get this bot on my Discord server?
A: You need to host it yourself. Follow the [Discord Setup Guide](discord-setup.md) for complete instructions.

### Q: What hosting services work with this bot?
A: Any service that supports Node.js applications:
- Heroku (free tier available)
- Railway
- Render
- DigitalOcean
- AWS EC2
- Your own server

### Q: Do I need coding experience to set this up?
A: Basic familiarity with Discord and following instructions is helpful, but detailed setup guides are provided.

## Commands & Features

### Q: Who can create custom commands?
A: Only users with the "MOD" role can create or remove custom commands using `!addcommand` and `!removecommand`.

### Q: How many custom commands can I create?
A: There's no built-in limit, but keep in mind storage and performance considerations.

### Q: What's the pipe `|` separator for in custom commands?
A: It separates the command description from the actual output. Format: `!addcommand name description | output`

### Q: Can I use custom commands to give roles?
A: No, custom commands only send text responses. For roles, use the built-in pronoun reaction system.

### Q: What bully commands are available?
A: Any command matching the pattern `!*ully` works (e.g., `!bully`, `!wully`, `!cully`, `!dully`). The bot replaces letters in the output based on the command used.

### Q: Does the bot automatically respond to temperature mentions?
A: Yes! The bot automatically detects temperature values in any message and provides conversions between Celsius and Fahrenheit. It recognizes formats like `75°F`, `75F`, `24°C`, `24C`, and supports negative/decimal values.

### Q: What time zones does the `!time` command show?
A: The `!time` command displays current time in Hyperfixed population centers: Seattle, Fargo, Charleston, Stockholm, and Sydney.

### Q: How does the bully leaderboard work?
A: The `!bullyleaderboard` command shows rankings of users by how many times they've used bully commands, sorted by frequency from highest to lowest.

## Pronoun Roles

### Q: How do pronoun roles work?
A: Users react to a designated message with pronoun emojis. Adding a reaction gives the role, removing it takes the role away.

### Q: Can I customize the pronoun roles?
A: Yes, but you'll need to modify the code. Edit the `emojiToRoleMap` in `index.js` and update the role IDs.

### Q: What if I don't want pronoun roles?
A: Simply don't set up the reaction message or leave the environment variables empty.

## Troubleshooting

### Q: The bot isn't responding to commands
A: Check these common issues:
1. Bot token is correct in `.env`
2. Bot has "Send Messages" permission
3. Bot can see the channel you're typing in
4. Bot is online (check your hosting service)

### Q: Pronoun roles aren't being assigned
A: Verify:
1. `PRONOUN_REACTION_POST_ID` matches your reaction message
2. Bot has "Manage Roles" permission
3. Bot's role is higher than pronoun roles in Discord's role hierarchy
4. Role IDs in code match your Discord server's role IDs

### Q: Custom commands aren't working
A: Ensure:
1. You have the "MOD" role
2. Using correct syntax: `!addcommand name description | output`
3. Including the pipe separator `|`
4. Bot has storage permissions (check hosting service)

### Q: "Permission denied" errors
A: The bot's role must be positioned higher than any roles it needs to manage in Discord's role hierarchy.

## Development & Customization

### Q: Can I add new features?
A: Yes! The bot is designed to be extensible. Check the code in the main files to understand how features are implemented.

### Q: How do I backup my custom commands?
A: Custom commands are stored in the `storage/` directory. Back up this folder to preserve your commands.

### Q: Can I change the command prefix from `!`?
A: Yes, but you'll need to modify the code. Search for command parsing logic in `index.js`.

### Q: How do I update the bot?
A: 1. Backup your `.env` file and `storage/` directory
2. Pull latest changes from the repository
3. Restart the bot
4. Restore your configuration

## Performance & Limits

### Q: How many servers can this bot be in?
A: Why?

### Q: What are Discord's rate limits?
A: Discord limits API requests. The bot handles basic rate limiting, but avoid spamming commands.

### Q: How much storage does the bot use?
A: Very little. Custom commands and bully statistics are stored as small JSON files.

## Getting Help

### Q: Where can I report bugs?
A: Open an issue on the [GitHub repository](https://github.com/brandtamos/hyperfixed-discord-bot).

### Q: How do I request new features?
A: You don't. They're given to you like bread is thrown to the masses. 

### Q: Is there a Discord server for support?
A: Currently, support is provided through GitHub issues and documentation. Or you can ask a bot thot in chat. 

## Easter Eggs

### Q: What's the Weezer thing about?
A: I've never heard of Weezer, could you be more specific? 

### Q: Are there other hidden features?
A: The bully tracking system has some fun letter replacement features. Try different `!*ully` commands and see what happens!
