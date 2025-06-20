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
- Help command  
- Add/remove command operations  
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

### Command Object Structure
```javascript
{
  command: "!commandname",
  description: "Command description",
  commandText: "Output text"
}
```
