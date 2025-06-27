# Architecture

```mermaid
graph LR
  A[Discord Events] --> B[Command Parser]
  A --> H[Reaction Handler]
  B --> C[Storage Layer]
  B --> D[Role Assignment]
  B --> I[Bully Tracker]
  B --> J[Custom Commands]
  C --> E[node-persist]
  D --> F[Discord API]
  H --> F
  I --> C
  J --> C
```

The bot listens to Discord events, parses commands, handles reactions, interacts with storage, and uses the Discord API to respond. Key components include:

- **Command Parser**: Processes `!addcommand`, `!removecommand`, `!help`, `!time`, `!bullyleaderboard`, and bully commands
- **Reaction Handler**: Manages pronoun role assignments via emoji reactions
- **Bully Tracker**: Tracks statistics for `!bully`/`!Xully` commands with records and leaderboard
- **Temperature Converter**: Automatically detects and converts temperature values in messages
- **Time Zone Display**: Shows current time across multiple global locations using Luxon
- **Custom Commands**: Stores and executes user-created commands
- **Storage Layer**: Persists data using node-persist
- **Easter Eggs**: Includes Weezer detection functionality (what's with these homies, dissing my bot?)

## Dependencies

- **discord.js**: Core Discord bot framework and API interaction
- **dotenv**: Environment variable management for configuration
- **luxon**: Date/time handling and timezone conversion for `!time` command
- **node-persist**: Persistent JSON-based storage for commands and statistics
