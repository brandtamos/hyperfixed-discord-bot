# Usage Examples

## Custom Commands

### Standard Custom Commands

**Creating a simple greeting command:**
```
!addcommand hello Simple greeting | Hello there! Welcome to our Discord server! 👋
```

**Using the command:**
```
User: !hello
Bot: Hello there! Welcome to our Discord server! 👋
```

### Secret Menu Commands

**Creating a secret command:**
```
!addsecretmenucommand ninja Sneaky response | 🥷 You found the secret ninja command!
```

**Viewing secret commands:**
```
!secretmenu
Bot: `!bully` - use this any time brandtamos is bullied
`!bullyleaderboard` - show the current bullying leaderboard
`!ninja` - Sneaky response
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
`!time` - show the current time in Hyperfixed population centers
`!threads` - shows all bookmarked threads on the server
`!secretmenu` - show the secret menu of silly commands
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

### Bully Leaderboard

**Viewing the leaderboard:**
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

## Word Corrections (Easter Eggs)

**Trigger various corrections:**
```
User: I love listening to Weezer!
Bot: *Weeer

User: Did you know I flew the Goodyear blimp?
Bot: *blump

User: Check out my new skateboard!
Bot: *skamtbord

User: How many blimps are there still?
Bot: *blumps
```

The bot responds to variations of these words (case-insensitive):
- "weezer" → "*Weeer"
- "blimp" → "*blump" 
- "blimps" → "*blumps"
- "skateboard" → "*skamtbord"

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
**Regina**: Mon 26 Jun 15:30 / 03:30 PM
**Fargo**: Mon 26 Jun 16:30 / 04:30 PM
**Charleston**: Mon 26 Jun 17:30 / 05:30 PM
**Edinburgh**: Mon 26 Jun 22:30 / 10:30 PM
**Stockholm**: Mon 26 Jun 23:30 / 11:30 PM
**Perth**: Tue 27 Jun 05:30 / 05:30 AM
**Sydney**: Tue 27 Jun 07:30 / 07:30 AM
```

## Unit Conversion Examples

### Temperature Conversion

**Automatic temperature detection:**
```
User: It's 75°F outside today!
Bot: 75 F = 23.89 °C

User: Water boils at 100°C
Bot: 100 C = 212 °F

User: It's 20C here but 85F there
Bot: 20 C = 68 °F
85 F = 29.44 °C
```

### Distance Conversion

**Automatic distance detection:**
```
User: The store is 5 km away
Bot: 5 km = 3.11 mi

User: It's about 10 miles to the airport
Bot: 10 mi = 16.09 km

User: The pool is 25 meters long
Bot: 25 m = 82.02 ft

User: I'm 6 feet tall
Bot: 6 ft = 1.83 m
```

### Weight Conversion

**Automatic weight detection:**
```
User: This package weighs 2.5 kg
Bot: 2.5 kg = 5.51 lb

User: I need 500 grams of flour
Bot: 500 g = 17.5 oz

User: The baby weighs 8 pounds
Bot: 8 lb = 3.63 kg
```

**Supported conversion formats:**
- **Temperature**: °F ↔ °C (supports variations: F, f, C, c, fahrenheit, celsius)
- **Distance**: km ↔ mi, m ↔ ft, cm ↔ in (supports full words: kilometers, miles, meters, feet, etc.)
- **Weight**: kg ↔ lb, g ↔ oz (supports full words: kilograms, pounds, grams, ounces)

## Thread Management Examples

### Adding Bookmarked Threads

**Add thread by ID:**
```
!addthread 123456789012345678 | Important discussion about server rules
Bot: <#123456789012345678> has been successfully **added** to the list for this channel!
```

**Add thread by name:**
```
!addthread "Weekly Discussion" | Our weekly community discussion thread
Bot: <#987654321098765432> has been successfully **added** to the list for this channel!
```

### Managing Bookmarked Threads

**Remove a bookmarked thread:**
```
!removethread 123456789012345678
Bot: <#123456789012345678> has been successfully **removed** from the list for this channel!
```

**List all bookmarked threads:**
```
!threads
Bot: All bookmarked threads on the server:
<#123456789012345678> - Important discussion about server rules
<#987654321098765432> - Weekly community discussion
<#456789012345678901> - Bot suggestions and feedback
```

## Role Management Examples (MOD only)

### Bulk Role Addition

**Add role to all members:**
```
!addrole Member
Bot: Finnished adding the role `Member` to all server members.
```

**Preview role addition (dry run):**
```
!dryaddrole Verified
Bot: DRY RUN: Finnished adding the role `Verified` to all server members.
```

### Bulk Role Removal

**Remove role from all members:**
```
!removerole "Old Event"
Bot: Finnished removing the role `Old Event` from all server members.
```

**Preview role removal (dry run):**
```
!dryremoverole 123456789012345678
Bot: DRY RUN: Finnished removing the role `Event Participant` from all server members.
```

### Find Users Missing Roles

**List users without a role:**
```
!usersworole Verified
```

**Bot creates thread: "Users without the `Verified` role"**
```
user1 [123456789]
user2 [234567890]
user3 [345678901]
```

**If all users have the role:**
```
!usersworole Member
Bot: All users have the role `Member`
```

## Complete Setup Examples

### Initial Server Setup

1. **Create Discord roles:**
   - He/Him, She/Her, They/Them, Ask Me, Any (for pronoun system)
   - MOD (for administrative commands)

2. **Configure environment variables:**
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

3. **Test basic functionality:**
   ```
   !help                    # Verify bot responds
   !time                    # Test timezone display
   !bully                   # Test bully tracking
   Type "It's 72°F today"   # Test unit conversion
   Type "weezer"            # Test word corrections
   ```

### Typical Daily Usage

**Create welcome command:**
```
!addcommand welcome New member greeting | Welcome to our awesome server! 🎉 Be sure to read #rules and introduce yourself!
```

**Create event announcement:**
```
!addcommand gamenight Weekly event | 🎮 Game night is every Friday at 8 PM EST! React with 🎯 if you're joining!
```

**Quick server info command:**
```
!addcommand info Server information | 📋 Rules: Be respectful • Age: 13+ • Questions? DM mods!
```

## Troubleshooting Examples

### Common Issues

**Command not working:**
```
User: !mycommand
Bot: (No response)

Solution: Use !help to check if command exists, verify spelling
```

**Role not being assigned:**
```
User: *adds reaction but doesn't get role*

Solutions:
1. Check bot has "Manage Roles" permission
2. Ensure bot's role is higher than pronoun roles
3. Verify correct message ID and emoji names
```

**Bot not responding:**
```
Solutions:
1. Check if bot is online in Discord
2. Verify bot can see the channel
3. Check hosting service status
4. Review bot logs for errors
```

**Permission denied for MOD commands:**
```
User tries: !addcommand test Testing | Test
Bot: (No response)

Solution: User needs the "MOD" role (case-sensitive)
```
