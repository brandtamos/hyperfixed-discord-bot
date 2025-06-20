# Available Roles & Commands

## Pronoun Roles

The Hyperfixed Discord Bot supports the following built-in pronoun roles that users can select via reactions.

| Role Name     | Assignment Emoji Token                   | Assignment Emoji Name | Role ID                 |
|---------------|------------------------------------------|-----------------------|-------------------------|
| **He/Him**    | `<:pronoun_he:1367994903048753222>`     | `pronoun_he`          | `1367997513122189312`   |
| **She/Her**   | `<:pronoun_she:1367993600721424526>`    | `pronoun_she`         | `1367997561683837048`   |
| **They/Them** | `<:pronoun_they:1367993598078877746>`   | `pronoun_they`        | `1367997601722400818`   |
| **Ask Me**    | `<:pronoun_ask:1367993602109603972>`    | `pronoun_ask`         | `1367997625118490634`   |
| **Any**       | `<:pronoun_any:1367993599895011459>`    | `pronoun_any`         | `1367997724317712464`   |

### Managing Pronoun Roles
1. Go to the configured reaction channel and find the bot's pronoun post
2. Click the matching reaction emoji to toggle that pronoun role
3. Removing your reaction removes the role from your account

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
- `!wully` - Alternative bully tracking (replaces 'b' with 'w' in output)
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

### Easter Eggs
- **Weezer Detection**: Bot responds with "*Weeer" when "weezer" is mentioned in any message (what's with these homies dissing my bot?)