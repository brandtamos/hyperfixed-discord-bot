# Library/API Reference

## Core Functions

### `start()`
| Parameter | Type | Description |
|-----------|------|-------------|
| —         | —    | Initializes storage and loads commands |

**Description**: Initializes the node-persist storage and loads any previously stored custom commands into memory.

### `addCommand(msg)`
Adds a new custom command with description and output text.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message invoking command |

**Format**: `!addcommand commandName commandDescription | commandOutput`

**Returns**: Promise that resolves when command is added to storage

### `removeCommand(msg)`
Removes an existing custom command.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message invoking command |

**Returns**: Promise that resolves when command is removed from storage

### `checkForCommand(msg, command)`
Checks if a command exists and executes it.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message object           |
| `command` | `string` | The command to check for             |

**Returns**: void - Sends response if command exists

### `userIsMod(msg)`
Checks if the user has MOD role permissions.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message object           |

**Returns**: `boolean` - True if user has MOD role

### `postHelp(msg)`
Displays help message with all available commands.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message object           |

## Bully Tracking Functions

### `getTimeSinceLastBully()`
Calculates time since last bully event and updates timestamp.

**Returns**: `Promise<number>` - Time difference in milliseconds

### `incrementAndGetBullyCount()`
Increments the bully counter and returns the new count.

**Returns**: `Promise<number>` - New bully count

### `getAndSetBullyRecord(diffTime)`
Updates bully record if current time exceeds previous record.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `diffTime`| `number` | Time difference in milliseconds      |

**Returns**: `Promise<number>` - Current record time

### `isBullyCommand(command)`
Checks if a command matches the bully pattern (`!*ully`).

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `command` | `string` | Command to check                     |

**Returns**: `boolean` - True if command matches bully pattern

## Event Handlers

### `client.on('messageCreate', callback)`
Handles incoming Discord messages and routes them to appropriate handlers.

**Triggers**:
- Custom command execution
- Bully command processing
- Help command
- Add/remove command operations
- Weezer easter egg

### `client.on('messageReactionAdd', callback)`
Handles reaction additions for pronoun role assignment.

**Behavior**:
- Monitors specific message ID for pronoun reactions
- Assigns corresponding Discord role to user

### `client.on('messageReactionRemove', callback)`
Handles reaction removals for pronoun role assignment.

**Behavior**:
- Monitors specific message ID for pronoun reactions
- Removes corresponding Discord role from user

## Storage Schema

### Stored Data
- `storedCommands`: Array of custom command objects
- `lastBullyTime`: Timestamp of last bully event
- `bullyCount`: Total number of bully events
- `bullyRecord`: Longest time without bullying (milliseconds)

### Command Object Structure
```javascript
{
  command: "!commandname",
  description: "Command description",
  commandText: "Output text"
}
```

## Bully Tracking Functions

### `bullyHasHappened(msg, command)`
Handles bully tracking commands (e.g., `!bully`, `!wully`).

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `msg`     | `Message`| The Discord message object           |
| `command` | `string` | The bully command used               |

**Returns**: Promise that resolves when bully event is processed

### `getTimeSinceLastBully()`
Calculates time since last bully event and updates timestamp.

**Returns**: `Promise<number>` - Time difference in milliseconds

### `incrementAndGetBullyCount()`
Increments the bully counter and returns the new count.

**Returns**: `Promise<number>` - New bully count

### `getAndSetBullyRecord(diffTime)`
Updates bully record if current time exceeds previous record.

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `diffTime`| `number` | Time difference in milliseconds      |

**Returns**: `Promise<number>` - Current record time

### `isBullyCommand(command)`
Checks if a command matches the bully pattern (`!*ully`).

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `command` | `string` | Command to check                     |

**Returns**: `boolean` - True if command matches bully pattern

## Event Handlers

### `client.on('messageCreate', callback)`
Handles incoming Discord messages and routes them to appropriate handlers.

**Triggers**:
- Custom command execution
- Bully command processing
- Help command
- Add/remove command operations
- Weezer easter egg

### `client.on('messageReactionAdd', callback)`
Handles reaction additions for pronoun role assignment.

**Behavior**:
- Monitors specific message ID for pronoun reactions
- Assigns corresponding Discord role to user

### `client.on('messageReactionRemove', callback)`
Handles reaction removals for pronoun role assignment.

**Behavior**:
- Monitors specific message ID for pronoun reactions
- Removes corresponding Discord role from user

## Storage Schema

### Stored Data
- `storedCommands`: Array of custom command objects
- `lastBullyTime`: Timestamp of last bully event
- `bullyCount`: Total number of bully events
- `bullyRecord`: Longest time without bullying (milliseconds)

### Command Object Structure
```javascript
{
  command: "!commandname",
  description: "Command description",
  commandText: "Output text"
}
```
