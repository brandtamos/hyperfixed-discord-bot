# Bot Commands Reference

## Custom Commands

Create custom text responses that any user can trigger. Note: These are **text responses**, not roles.

### Creating Custom Commands
**Syntax:** `!addcommand <commandName> <description> | <output>`

**Example:**
```
!addcommand gamer Gaming Legend | You're a gaming legend!
```

**Requirements:**
- Only users with the "MOD" role can create/remove commands
- Must include a pipe `|` separator between description and output
- Command names are automatically prefixed with `!` if not provided

### Using Custom Commands
Once created, any user can trigger the command:
```
!gamer
```
**Output:** `You're a gaming legend!`

### Removing Custom Commands
**Syntax:** `!removecommand <commandName>`

**Example:**
```
!removecommand gamer
```

**Requirements:**
- Only users with the "MOD" role can remove commands

## Bully Tracking Commands

Special tracking system for monitoring and recording "bully" events with statistics.

### Available Bully Commands
- `!bully` - Standard bully tracking
- Any command matching pattern `!*ully` (e.g., `!cully`, `!dully`)

### Bully Command Features
- **Time Tracking**: Records time since last bully event
- **Total Counter**: Tracks total number of bully events
- **Record Keeping**: Maintains longest streak without bullying
- **Dynamic Output**: Replaces letters in output based on command used

### Example Bully Output
```
Benevolent moderator brandtamos has been bullied.

It has been 2 days, 3 hours, 15 minutes and 42 seconds since brandtamos was last bullied.

brandtamos has been bullied a total of 7 times.

The record for the longest amount of time brandtamos has not been bullied is 5 days, 12 hours, 30 minutes and 15 seconds.
```

## Built-in Commands

### Help Command
- `!help` - Displays all available commands including custom commands

### Time Zone Command
- `!time` - Shows current time in Hyperfixed population centers (Seattle, Fargo, Charleston, Stockholm, Sydney)

### Bully Leaderboard
- `!bullyleaderboard` - Shows rankings of users by their bully command usage frequency

## Automatic Features

### Temperature Conversion
Bot automatically detects and converts temperature values (°F ↔ °C) mentioned in any message.

### Weezer Detection
Bot responds with "*Weeer" when "weezer" is mentioned in any message (what's with these homies dissing my bot?).

## Custom Configured Commands

*These commands are not hardcoded but are created and managed through the bot's `!addcommand` system.*

- `!problem` – display the email and problem input form link - you know, why we're all actualy here. 
- `!starterpack` – post the link to the bluesky starterpack
- `!howhavephone` – how have money.... from job?
- `!yurkey` – use this any time there's a typo in the group chat. 
- `!stinks` – use this anytime something stinks. OH BROTHER!
- `!comfort` – you'll know when it's needed
- `!snack` – when you're hungry and want the mods to give you a snack. Don't be weird about it. Or do be weird. 
- `!aipost` – use this when there's an AI image posted, slop or not. 