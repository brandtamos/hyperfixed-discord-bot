# Library/API Reference

## Core Functions

### start()
**Parameters:**  
_None_  

**Description:**  
Initializes node-persist storage and loads any previously stored custom commands into memory.

---

### addCommand(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message invoking the command.

**Format:**  
```
!addcommand commandName commandDescription | commandOutput
```

**Returns:**  
Promise that resolves when the command is added to storage.

---

### removeCommand(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message invoking the command.

**Returns:**  
Promise that resolves when the command is removed from storage.

---

### checkForCommand(msg, command)
**Parameters:**  
- `msg` (`Message`): The Discord message object.  
- `command` (`string`): The command to check for.

**Returns:**  
void — Sends a response if the command exists.

---

### userIsMod(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message object.

**Returns:**  
`boolean` — True if the user has the MOD role.

---

### postHelp(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message object.

**Description:**  
Displays a help message listing all available commands.

---

### convertTemps(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message object.

**Description:**  
Automatically detects temperature values in messages and provides conversions between Celsius and Fahrenheit.

---

## Bully Tracking Functions

### getTimeSinceLastBully()
**Returns:**  
`Promise<number>` — Time difference in milliseconds since the last bully event (and updates the timestamp).

---

### incrementAndGetBullyCount()
**Returns:**  
`Promise<number>` — The updated bully count.

---

### getAndSetBullyRecord(diffTime)
**Parameters:**  
- `diffTime` (`number`): Time difference in milliseconds.

**Returns:**  
`Promise<number>` — The current record time (updated if `diffTime` exceeds previous record).

---

### updateLeaderboard(bullierName)
**Parameters:**  
- `bullierName` (`string`): Username of the person who used a bully command.

**Returns:**  
`Promise<void>` — Updates the bully leaderboard with the user's contribution.

---

### getLeaderboard(msg)
**Parameters:**  
- `msg` (`Message`): The Discord message object.

**Description:**  
Displays the bully leaderboard showing all users and their bully counts, sorted by frequency.

---

### isBullyCommand(command)
**Parameters:**  
- `command` (`string`): The command to check (matches pattern `!*ully`).

**Returns:**  
`boolean` — True if the command matches the bully pattern.

---

## Event Handlers

### client.on('messageCreate', callback)
**Description:**  
Handles incoming Discord messages and routes them to appropriate handlers.

**Triggers:**
- Custom command execution  
- Bully command processing  
- Help command (`!help`)
- Time zone command (`!time`)
- Bully leaderboard command (`!bullyleaderboard`)
- Add/remove command operations (`!addcommand`, `!removecommand`)
- Automatic temperature conversion
- Weezer easter egg

---

### client.on('messageReactionAdd', callback)
**Description:**  
Handles reaction additions for pronoun role assignment.

**Behavior:**  
- Monitors a specific message ID for pronoun reactions.  
- Assigns the corresponding Discord role to the user.

---

### client.on('messageReactionRemove', callback)
**Description:**  
Handles reaction removals for pronoun role assignment.

**Behavior:**  
- Monitors a specific message ID for pronoun reactions.  
- Removes the corresponding Discord role from the user.

---

## Storage Schema

### Stored Data
- `storedCommands`: Array of custom command objects.  
- `lastBullyTime`: Timestamp of the last bully event.  
- `bullyCount`: Total number of bully events.  
- `bullyRecord`: Longest time without bullying (milliseconds).
- `bullyLeaderboard`: Array of user objects tracking individual bully contributions.

### Command Object Structure
```javascript
{
  command: "!commandname",
  description: "Command description",
  commandText: "Output text"
}
```

### Leaderboard Entry Structure
```javascript
{
  userName: "discord_username",
  bullyCount: 5
}
```

## Temperature Conversion Functions

### messageHasTemps(text)
**Parameters:**  
- `text` (`string`): Message text to check for temperature values.

**Returns:**  
`boolean` — True if the text contains temperature values in Celsius or Fahrenheit format.

---

### convertTemps(text)
**Parameters:**  
- `text` (`string`): Message text containing temperature values.

**Returns:**  
`string` — Formatted conversion response showing both Celsius and Fahrenheit values.

---

### extractAllFahrenheitValues(text)
**Parameters:**  
- `text` (`string`): Message text to parse.

**Returns:**  
`Array<number>` — Array of Fahrenheit temperature values found in the text.

---

### extractAllCelsiusValues(text)
**Parameters:**  
- `text` (`string`): Message text to parse.

**Returns:**  
`Array<number>` — Array of Celsius temperature values found in the text.

---

### convertCelsiusToFahrenheit(celsius)
**Parameters:**  
- `celsius` (`number`): Temperature value in Celsius.

**Returns:**  
`number` — Temperature converted to Fahrenheit (rounded to nearest integer).

---

### convertFahrenheitToCelsius(fahrenheit)
**Parameters:**  
- `fahrenheit` (`number`): Temperature value in Fahrenheit.

**Returns:**  
`number` — Temperature converted to Celsius (rounded to nearest integer).

---
