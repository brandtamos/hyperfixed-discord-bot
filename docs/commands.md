# Bot Commands Reference

## Built-in Commands

### Help Commands
- `!help` - Displays all available commands including custom commands
- `!secretmenu` - Shows the secret menu of silly commands

### Bully Tracking Commands
- `!bully` - Standard bully tracking
- Any command matching pattern `!*ully` (e.g., `!cully`, `!dully`) - Dynamic bully tracking
- `!bullyleaderboard` - Shows rankings of users by their bully command usage frequency

### Utility Commands
- `!time` - Shows current time in Hyperfixed population centers
- `!threads` - Shows all bookmarked threads on the server

## Custom Commands

Create custom text responses that any user can trigger.

### Standard Custom Commands
**Creating:** `!addcommand <commandName> <description> | <output>`
**Removing:** `!removecommand <commandName>`

### Secret Menu Commands
**Creating:** `!addsecretmenucommand <commandName> <description> | <output>`
**Removing:** `!removesecretmenucommand <commandName>`

**Requirements:**
- Only users with the "MOD" role can create/remove commands
- Must include a pipe `|` separator between description and output
- Command names are automatically prefixed with `!` if not provided

**Example:**
```
!addcommand gamer Gaming Legend | You're a gaming legend!
```

### Example Bully Output
```
Benevolent moderator brandtamos has been bullied.

It has been 2 days, 3 hours, 15 minutes and 42 seconds since brandtamos was last bullied.

brandtamos has been bullied a total of 7 times.

The record for the longest amount of time brandtamos has not been bullied is 5 days, 12 hours, 30 minutes and 15 seconds.
```

## Thread Management Commands (MOD only)

### Adding Bookmarked Threads
**Syntax:** `!addthread <thread_id_or_name> | <description>`

**Examples:**
```
!addthread 123456789012345678 | Important discussion thread
!addthread "My Thread Name" | Thread found by name
```

**Features:**
- Accepts either thread ID or thread name
- Bot will search for thread by name if ID not found
- Stores thread with description for easy reference

### Removing Bookmarked Threads
**Syntax:** `!removethread <thread_id_or_name>`

**Example:**
```
!removethread 123456789012345678
```

### Listing Bookmarked Threads
**Syntax:** `!threads` (available to all users)

Shows all bookmarked threads with descriptions and links.

## Role Management Commands (MOD only)

### Add Role to All Members
- `!addrole <role_name_or_id>` - Adds specified role to all server members
- `!dryaddrole <role_name_or_id>` - Preview mode: shows what would happen without executing

### Remove Role from All Members  
- `!removerole <role_name_or_id>` - Removes specified role from all server members
- `!dryremoverole <role_name_or_id>` - Preview mode: shows what would happen without executing

### List Users Without Role
- `!usersworole <role_name_or_id>` - Creates a thread listing all users who don't have the specified role

**Features:**
- Accepts role name or role ID
- Dry run modes for safe testing
- Automatic error handling and logging
- Thread creation for large user lists

**Examples:**
```
!addrole Member
!dryaddrole 123456789012345678
!usersworole Verified
```

## Automatic Features

### Unit Conversion
Bot automatically detects and converts various units mentioned in messages:

**Temperature**: °F ↔ °C
**Distance**: kilometers ↔ miles, meters ↔ feet, centimeters ↔ inches  
**Weight**: grams ↔ ounces, kilograms ↔ pounds

**Examples:**
- "It's 72°F today" → Bot responds: "72 F = 22.22 °C"
- "I ran 5km" → Bot responds: "5 km = 3.11 mi"

### Word Corrections
Bot responds with joke corrections when certain words are mentioned:
- "weezer" → "*Weeer" 
- "blimp" → "*blump"
- "blimps" → "*blumps"
- "skateboard" → "*skamtbord"

### Bully Command Features
- **Time Tracking**: Records time since last bully event
- **Total Counter**: Tracks total number of bully events  
- **Record Keeping**: Maintains longest streak without bullying
- **Leaderboard**: Tracks which users use bully commands most
- **Dynamic Output**: Replaces letters in output based on command used (e.g., `!cully` uses 'c' replacements)

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