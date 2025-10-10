# Architecture

The bot listens to Discord events, parses commands, handles reactions, interacts with storage, and uses the Discord API to respond.

## File Structure

```
├── index.js              # Main bot entry point, event handling, command routing
├── bully.js              # Bully tracking system with statistics and leaderboard
├── conversion.js         # Unit conversion system (temperature, distance, weight)
├── timezone.js           # Multi-timezone display using Luxon
├── threads.js            # Thread bookmarking interface
├── threadsManager.js     # Thread storage and persistence layer
├── commands.js           # Custom command system with standard and secret menu types
├── roletoall.js          # Bulk role management functionality
├── package.json          # Project dependencies and scripts
├── jest.config.js        # Testing configuration
├── *.test.js             # Unit tests for each module
└── docs/                 # Documentation files
```

## Core Components

### Command System (`index.js`, `commands.js`)
- **Command Parser**: Processes all bot commands with prefix `!`
- **Custom Commands**: User-created commands with two categories (standard and secret menu)
- **Command Router**: Dispatches commands to appropriate handlers
- **Permission System**: MOD role checking for administrative commands

### Storage Layer (`node-persist`)
- **Persistent Storage**: JSON-based storage in `./storage/` directory
- **Data Types**: Custom commands, bully statistics, thread bookmarks, leaderboards
- **Auto-initialization**: Storage directories created automatically on first run

### Event Handlers (`index.js`)
- **Message Events**: Command parsing, unit conversion, word corrections
- **Reaction Events**: Pronoun role management via emoji reactions
- **Ready Event**: Bot initialization and tracked message setup

### Feature Modules

#### Bully Tracking (`bully.js`)
- **Statistics Tracking**: Time since last event, total counts, records
- **Leaderboard System**: User ranking by bully command usage
- **Dynamic Output**: Command-specific text replacements (e.g., !cully → 'c' replacements)

#### Unit Conversion (`conversion.js`)
- **Multi-unit Support**: Temperature, distance, weight conversions
- **Automatic Detection**: Regex-based pattern matching in all messages
- **Bi-directional**: Metric ↔ Imperial conversions

#### Time Display (`timezone.js`)
- **Multi-timezone**: Seattle, Regina, Fargo, Charleston, Edinburgh, Stockholm, Perth, Sydney
- **Luxon Integration**: Robust date/time handling with timezone support
- **Formatted Output**: Consistent display format across all timezones

#### Thread Management (`threads.js`, `threadsManager.js`)
- **Bookmark System**: Save important threads with descriptions
- **Dual Input**: Accept thread IDs or thread names
- **Channel-aware**: Threads linked to specific channels
- **Persistence**: Stored using node-persist

#### Role Management (`roletoall.js`)
- **Bulk Operations**: Add/remove roles to all server members
- **Dry Run Mode**: Preview operations before execution
- **User Listing**: Find users missing specific roles
- **Error Handling**: Graceful handling of permission errors

#### Pronoun Roles (`index.js`)
- **Reaction-based**: Users react to get roles
- **Multi-pronoun Support**: He/Him, She/Her, They/Them, Ask Me, Any
- **Bidirectional**: Add roles on reaction add, remove on reaction remove

## Dependencies

- **discord.js**: Core Discord bot framework and API interaction
- **dotenv**: Environment variable management for configuration
- **luxon**: Date/time handling and timezone conversion for `!time` command
- **node-persist**: Persistent JSON-based storage for commands and statistics
- **jest**: Testing framework for unit tests
- **jest-mock-extended**: Enhanced mocking capabilities for tests

## Data Flow

### Message Processing
1. Message received from Discord → `index.js` messageCreate event
2. Check for unit conversions → `conversion.js` 
3. Parse command prefix → Route to appropriate handler
4. Check custom commands → `commands.js` lookup and execution
5. Execute built-in command → Specific module (bully.js, timezone.js, etc.)
6. Store data if needed → `node-persist` storage
7. Send response → Discord API

### Reaction Processing  
1. Reaction added/removed → `index.js` reaction events
2. Validate message ID and emoji → Pronoun role mapping
3. Fetch guild member → Discord API
4. Add/remove role → Discord API role management

### Storage Structure
```
storage/
├── storedCommands          # Standard custom commands
├── storedSecretMenuCommands # Secret menu commands  
├── storedThreads          # Bookmarked threads
├── bullyCount             # Total bully events
├── bullyRecord            # Longest time without bullying
├── lastBullyTime          # Timestamp of last bully event
└── bullyLeaderboard       # User rankings for bully commands
```

## Error Handling

- **Discord API Errors**: Logged to console, bot continues operation
- **Storage Errors**: Graceful degradation, commands may not persist
- **Command Errors**: User feedback via Discord messages
- **Permission Errors**: Handled silently for role operations
- **Invalid Input**: User education via error messages

## Security Considerations

- **Environment Variables**: Sensitive tokens stored in `.env` file
- **Role Permissions**: MOD role requirement for administrative commands
- **Input Validation**: Command parsing with safety checks
- **Rate Limiting**: Discord.js handles API rate limits automatically
