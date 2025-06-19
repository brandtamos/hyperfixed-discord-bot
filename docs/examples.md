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
   - `!bully` - Test bully tracking
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
