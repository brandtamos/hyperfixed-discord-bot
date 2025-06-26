# Configuration Reference

## Environment Variables

The bot requires the following environment variables to be set in your `.env` file:

```yaml
BOT_TOKEN: <string>           # Discord bot token from Discord Developer Portal
REACTION_CHANNEL_ID: <string> # Channel ID where pronoun reactions are monitored
PRONOUN_REACTION_POST_ID: <string> # Specific message ID for pronoun role reactions

# Pronoun Role IDs (required if using reaction-based pronoun roles)
ROLE_PRONOUN_HE: <string>     # Discord role ID for He/Him pronouns
ROLE_PRONOUN_SHE: <string>    # Discord role ID for She/Her pronouns  
ROLE_PRONOUN_THEY: <string>   # Discord role ID for They/Them pronouns
ROLE_PRONOUN_ASK: <string>    # Discord role ID for Ask Me pronouns
ROLE_PRONOUN_ANY: <string>    # Discord role ID for Any pronouns
```

### Variable Details

#### `BOT_TOKEN`
- **Required**: Yes
- **Description**: Your Discord bot's authentication token
- **How to get**: See [Discord Setup Guide](discord-setup.md) for obtaining bot token
- **Security**: Keep this secret! Never commit it to version control

#### `REACTION_CHANNEL_ID` 
- **Required**: Yes (if using pronoun roles)
- **Description**: Discord channel ID where the pronoun reaction message is located
- **How to get**: Enable Developer Mode in Discord, right-click channel → "Copy ID"
- **Format**: Numeric string (e.g., `123456789012345678`)

#### `PRONOUN_REACTION_POST_ID`
- **Required**: Yes (if using pronoun roles)  
- **Description**: Specific message ID that users react to for pronoun roles
- **How to get**: Right-click the reaction message → "Copy ID"
- **Format**: Numeric string (e.g., `987654321098765432`)

#### Pronoun Role Environment Variables
- **Required**: Yes (if using pronoun roles)
- **Description**: Discord role IDs for each pronoun category
- **Variables**:
  - `ROLE_PRONOUN_HE`: Role ID for He/Him pronouns
  - `ROLE_PRONOUN_SHE`: Role ID for She/Her pronouns
  - `ROLE_PRONOUN_THEY`: Role ID for They/Them pronouns
  - `ROLE_PRONOUN_ASK`: Role ID for Ask Me pronouns
  - `ROLE_PRONOUN_ANY`: Role ID for Any pronouns
- **How to get**: Server Settings → Roles → Right-click role → "Copy ID"
- **Format**: Numeric string (e.g., `123456789012345678`)

## Example Configuration

Example `.env` file:

```ini
BOT_TOKEN=your_actual_bot_token_here
REACTION_CHANNEL_ID=123456789012345678
PRONOUN_REACTION_POST_ID=987654321098765432
ROLE_PRONOUN_HE=123456789012345678
ROLE_PRONOUN_SHE=223456789012345678
ROLE_PRONOUN_THEY=323456789012345678
ROLE_PRONOUN_ASK=423456789012345678
ROLE_PRONOUN_ANY=523456789012345678
```

## Optional Configuration

### Disabling Features

**Pronoun Roles**: Leave `REACTION_CHANNEL_ID` and `PRONOUN_REACTION_POST_ID` empty to disable reaction-based role assignment.

**Custom Commands**: Cannot be disabled, but only users with "MOD" role can create them.

**Bully Tracking**: Cannot be disabled, but users can simply not use the commands.

## Validation

The bot will validate configuration on startup:

- Missing `BOT_TOKEN`: Bot will fail to start
- Invalid token: Bot will fail to authenticate with Discord
- Missing channel/message IDs: Pronoun roles will be disabled but bot will still start
- Invalid IDs: Errors will be logged but bot continues running

## Security Best Practices

1. **Never commit `.env` to version control** - It's already in `.gitignore`
2. **Regenerate tokens if compromised** - Get new token from Discord Developer Portal
3. **Use environment variables in production** - Don't hardcode sensitive values
4. **Restrict bot permissions** - Only give necessary Discord permissions
5. **Monitor bot usage** - Check logs for unauthorized usage

## Troubleshooting

### Common Configuration Issues

**Bot not starting**:
- Check `BOT_TOKEN` is correct and properly formatted
- Ensure `.env` file is in root directory
- Verify no extra spaces around values

**Pronoun roles not working**:
- Confirm `PRONOUN_REACTION_POST_ID` matches your message
- Check `REACTION_CHANNEL_ID` is correct channel
- Verify bot can see the channel and message

**Environment variables not loading**:
- Ensure `.env` file exists in project root
- Check file is named exactly `.env` (not `.env.txt`)
- Verify proper `key=value` format with no spaces around `=`

Example `.env`:

```ini
BOT_TOKEN=abc123
REACTION_CHANNEL_ID=123456789
PRONOUN_REACTION_POST_ID=987654321
ROLE_PRONOUN_HE=123456789
ROLE_PRONOUN_SHE=223456789
ROLE_PRONOUN_THEY=323456789
ROLE_PRONOUN_ASK=423456789
ROLE_PRONOUN_ANY=523456789
```
