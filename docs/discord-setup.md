# Discord Bot Setup Guide

## Prerequisites
- Discord account
- Server with Administrator permissions
- Node.js installed on your hosting environment

## Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Enter application name (e.g., "Hyperfixed Bot")
4. Click "Create"

## Step 2: Create Bot User

1. Navigate to "Bot" section in left sidebar
2. Click "Add Bot"
3. Customize bot username and avatar if desired
4. Copy the bot token (keep this secure!)

## Step 3: Configure Bot Permissions

### Required Permissions
The bot needs the following permissions:

- **View Channels** - To see channels
- **Send Messages** - To respond to commands
- **Manage Roles** - To assign pronoun roles
- **Add Reactions** - For reaction-based role assignment
- **Read Message History** - To handle partial reactions
- **Use External Emojis** - For custom pronoun emojis

### Permission Integer
Use permission integer: `268437504` for all required permissions.

## Step 4: Generate Invite Link

1. Go to "OAuth2" → "URL Generator"
2. Select scopes:
   - `bot`
   - `applications.commands` (for future slash commands)
3. Select bot permissions (or use integer `268437504`)
4. Copy generated URL and open in browser
5. Select your Discord server and authorize

## Step 5: Configure Environment Variables

Create `.env` file with:

```ini
BOT_TOKEN=your_bot_token_here
REACTION_CHANNEL_ID=channel_id_for_pronoun_reactions
PRONOUN_REACTION_POST_ID=message_id_for_reactions
```

### Getting Channel and Message IDs

1. **Enable Developer Mode** in Discord:
   - User Settings → Advanced → Developer Mode (toggle on)

2. **Get Channel ID**:
   - Right-click channel → "Copy ID"

3. **Get Message ID**:
   - Right-click message → "Copy ID"
   - This should be the message users react to for pronoun roles

## Step 6: Set Up Pronoun Reaction Message

1. Create a message in your designated channel explaining pronoun roles
2. Add the custom emoji reactions to this message:
   - `:pronoun_he:`
   - `:pronoun_she:`
   - `:pronoun_they:`
   - `:pronoun_ask:`
   - `:pronoun_any:`
3. Copy the message ID and add to `.env`

## Step 7: Create Discord Roles
For more on Pronoun Roles, check out roles.md

Create the following roles in your Discord server:

| Role Name | Purpose |
|-----------|---------|
| He/Him | Pronoun role |
| She/Her | Pronoun role |
| They/Them | Pronoun role |
| Ask Me | Pronoun role |
| Any | Pronoun role |
| MOD | Allows command creation/removal |

**Important**: Bot's role must be higher than pronoun roles in the role hierarchy.

## Step 8: Test Bot

1. Start the bot: `npm start`
2. Test basic commands:
   - `!help` - Should show available commands
   - `!bully` - Should trigger bully tracking
3. Test reaction roles by adding/removing reactions on the pronoun message

## Troubleshooting

### Common Issues

**Bot not responding:**
- Check bot token is correct
- Verify bot has "Send Messages" permission
- Ensure bot can see the channel

**Roles not being assigned:**
- Check bot has "Manage Roles" permission
- Verify bot's role is above pronoun roles
- Confirm role IDs match in code

**Reactions not working:**
- Verify `PRONOUN_REACTION_POST_ID` is correct
- Check bot has "Add Reactions" permission
- Ensure custom emojis exist in server

**Permission errors:**
- Bot role must be higher than roles it manages
- Check all required permissions are granted
- Verify bot was invited with correct permissions

### Support
- Check the [FAQ](faq.md) for common questions
- Review [Configuration](configuration.md) for environment variables
- See [Getting Started](getting-started.md) for installation help
