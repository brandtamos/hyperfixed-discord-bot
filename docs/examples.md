# Usage Examples

## Custom Commands

### Creating Your First Command

**Creating a simple greeting command:**
```
!addcommand hello Simple greeting | Hello there! Welcome to our Discord server! 👋
```

**Using the command:**
```
User: !hello
Bot: Hello there! Welcome to our Discord server! 👋
```

### Advanced Custom Commands

**Command with server-specific information:**
```
!addcommand rules Server rules | Please read our rules in #rules-channel. Be respectful and have fun!
```

**Command with formatting:**
```
!addcommand invite Server invite | Join our community! Here's the invite: https://discord.gg/example
```

**Fun response command:**
```
!addcommand magic Magic 8-ball response | 🎱 The magic 8-ball says: Ask again later!
```

### Command Management

**Removing a command:**
```
!removecommand hello
Bot: Command !hello has been removed!
```

**Viewing all commands:**
```
!help
Bot: `!help` - display this message
`!bully` - use this any time brandtamos is bullied
`!hello` - Simple greeting
`!rules` - Server rules
`!magic` - Magic 8-ball response
```

## Pronoun Roles

### Setting Up Pronoun Reactions

1. **Create the pronoun message in your designated channel:**
```
@everyone Please react to this message to get your pronoun roles:

🏳️‍⚧️ Pronoun Roles Available:
• :pronoun_he: - He/Him
• :pronoun_she: - She/Her  
• :pronoun_they: - They/Them
• :pronoun_ask: - Ask Me
• :pronoun_any: - Any Pronouns

Just click the emoji that matches your pronouns! You can add/remove as many as you want.
```

2. **Add the custom emoji reactions to this message**
3. **Copy the message ID and update your `.env` file**

### User Experience

**Adding pronoun role:**
- User clicks :pronoun_they: reaction
- Bot automatically assigns "They/Them" role
- User now has the role displayed

**Removing pronoun role:**
- User removes their :pronoun_they: reaction  
- Bot automatically removes "They/Them" role
- Role is no longer displayed for user

## Bully Tracking System

### Basic Bully Commands

**Standard bully tracking:**
```
User: !bully
Bot: Benevolent moderator brandtamos has been bullied.

It has been 2 days, 3 hours, 15 minutes and 42 seconds since brandtamos was last bullied.

brandtamos has been bullied a total of 7 times.

The record for the longest amount of time brandtamos has not been bullied is 5 days, 12 hours, 30 minutes and 15 seconds.
```

### Creative Bully Variants

**Wully command (replaces 'b' with 'w'):**
```
User: !wully  
Bot: Wenevolent moderator wrandtamos has ween wullied.

It has ween 1 day, 2 hours, 30 minutes and 15 seconds since wrandtamos was last wullied.

wrandtamos has ween wullied a total of 8 times.

The record for the longest amount of time wrandtamos has not ween wullied is 5 days, 12 hours, 30 minutes and 15 seconds.
```

**Cully command (replaces 'b' with 'c'):**
```
User: !cully
Bot: Cenevolent moderator crandtamos has ceen cullied.

It has ceen 0 days, 0 hours, 1 minute and 23 seconds since crandtamos was last cullied.

crandtamos has ceen cullied a total of 9 times.

The record for the longest amount of time crandtamos has not ceen cullied is 5 days, 12 hours, 30 minutes and 15 seconds.
```

### Bully Statistics Tracking

The system automatically tracks:
- **Time since last bully event** - Resets each time any bully command is used
- **Total bully count** - Increments with each bully command
- **Longest streak record** - Updates when current streak exceeds previous record

## Easter Eggs

### Weezer Detection

**Trigger the Weezer response:**
```
User: I love listening to Weezer!
Bot: *Weeer

User: weezer is the best band
Bot: *Weeer

User: Have you heard the new weezer album?
Bot: *Weeer
```

The bot responds to any variation of "weezer" in any message (case-insensitive).

### Blimp Detection

**Trigger the Blimp response:**
```
User: Did you know I flew the Goodyear blimp?
Bot: *blump
```

The bot responds to any variation of "blimp" in any message (case-insensitive).

## Time Zone Examples

### Viewing Current Time

**Command:**
```
!time
```

**Output:**
```
Current time in:
**Seattle**: Mon 26 Jun 14:30 / 02:30 PM
**Fargo**: Mon 26 Jun 16:30 / 04:30 PM
**Charleston**: Mon 26 Jun 17:30 / 05:30 PM
**Stockholm**: Mon 26 Jun 23:30 / 11:30 PM
**Sydney**: Tue 27 Jun 07:30 / 07:30 AM
```

## Temperature Conversion Examples

### Automatic Temperature Detection

**User mentions temperature:**
```
User: It's 75°F outside today!
Bot: 75°F = 24°C
```

**Multiple temperatures:**
```
User: The forecast shows 32°F tomorrow and 98°F later this week
Bot: 32°F = 0°C
98°F = 37°C
```

**Celsius to Fahrenheit:**
```
User: Water boils at 100°C
Bot: 100°C = 212°F
```

**Mixed formats:**
```
User: It's 20C here but 85F there
Bot: 20°C = 68°F
85°F = 29°C
```

The bot automatically detects temperature values in various formats:
- `75°F`, `75F`, `75f`
- `24°C`, `24C`, `24c`
- Supports negative temperatures: `-10°C`
- Supports decimal values: `98.6°F`

## Distance Conversion Examples

### Automatic Distance Detection

**User mentions distance in kilometers:**
```
User: The store is 5 km away
Bot: 5 km = 3.11 mi
```

**User mentions distance in miles:**
```
User: It's about 10 miles to the airport
Bot: 10 mi = 16 km
```

**Multiple distances:**
```
User: The marathon is 42 km but I only ran 3 miles today
Bot: 42 km = 26 mi
3 mi = 4.83 km
```

**Various formats supported:**
```
User: Distance: 100 kilometers, 50 km, 25 miles, 15 mi
Bot: 100 km = 62 mi
50 km = 31 mi
25 mi = 40 km
15 mi = 24 km
```

The bot automatically detects distance values in various formats:
- `5 km`, `5km`, `5 kilometers`, `5 kilometer`
- `10 mi`, `10mi`, `10 miles`, `10 mile`
- Supports decimal values: `2.5 km`, `1.25 miles`
- Smart rounding: values under 10 show 2 decimal places, larger values are rounded to whole numbers

## Bully Leaderboard Examples

### Viewing the Leaderboard

**Command:**
```
!bullyleaderboard
```

**Output with multiple users:**
```
>>> `alice`: `12`
`bob`: `8`
`charlie`: `3`
`dave`: `1`
```

**Empty leaderboard:**
```
!bullyleaderboard
Bot: Nobody has bullied yet!
```

## MOD Role Usage

### Setting Up MOD Permissions

1. **Create a Discord role named "MOD"**
2. **Assign it to trusted users**
3. **Only users with this role can:**
   - Create custom commands with `!addcommand`
   - Remove custom commands with `!removecommand`

### MOD Command Examples

**Successful command creation (user has MOD role):**
```
MOD User: !addcommand welcome New member greeting | Welcome to our awesome server! 🎉
Bot: Command `!welcome` has been successfully added!
```

**Failed command creation (user lacks MOD role):**
```
Regular User: !addcommand test Testing | This is a test
Bot: (No response - command ignored)
```

## Server Setup Examples

### Complete Bot Setup Workflow

1. **Initial Discord setup:**
   - Create bot application
   - Get bot token
   - Invite bot to server with proper permissions

2. **Configure environment:**
   ```ini
   BOT_TOKEN=your_actual_bot_token_here
   REACTION_CHANNEL_ID=123456789012345678
   PRONOUN_REACTION_POST_ID=987654321098765432
   ROLE_PRONOUN_HE=111111111111111111
   ROLE_PRONOUN_SHE=222222222222222222
   ROLE_PRONOUN_THEY=333333333333333333
   ROLE_PRONOUN_ASK=444444444444444444
   ROLE_PRONOUN_ANY=555555555555555555
   ```

3. **Create Discord roles:**
   - He/Him
   - She/Her  
   - They/Them
   - Ask Me
   - Any
   - MOD

4. **Start bot and test:**
   ```bash
   npm start
   ```

5. **Test functionality:**
   - `!help` - Verify bot responds
   - `!time` - Test time zone display
   - `!bully` - Test bully tracking
   - `!bullyleaderboard` - Test leaderboard
   - Temperature test - Type "It's 75°F today" to test conversion
   - Weezer test - Type "weezer" to test easter egg
   - Reaction test - Add/remove pronoun reactions
   - MOD test - Create a custom command

### Typical Daily Usage

**Morning server greeting command:**
```
!addcommand goodmorning Daily greeting | Good morning everyone! ☀️ Hope you have a wonderful day!
```

**Server event announcement:**
```
!addcommand event Weekly event info | 🎮 Game night is this Friday at 8 PM EST! React with 🎯 if you're joining!
```

**Quick server info:**
```
!addcommand info Server information | 📋 Server Rules: Be kind • Age requirement: 13+ • Questions? DM the mods!
```

### Troubleshooting Examples

**Command not working:**
```
User: !mycommand
Bot: (No response)

Solution: Check if command was created correctly with !help
```

**Role not being assigned:**
```
User: *adds reaction but doesn't get role*

Solution: 
1. Verify bot has "Manage Roles" permission
2. Check bot's role is higher than pronoun roles
3. Confirm correct message ID in configuration
```

**Bot not responding at all:**
```
Solution:
1. Check if bot is online in Discord
2. Verify bot can see the channel
3. Check hosting service status
4. Review bot logs for errors
```
