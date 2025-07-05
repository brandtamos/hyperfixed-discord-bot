# Architecture

The bot listens to Discord events, parses commands, handles reactions, interacts with storage, and uses the Discord API to respond.

## Key components

- **Command Parser**: Processes `!addcommand`, `!removecommand`, `!help`, `!time`, `!bullyleaderboard`, and bully commands
- **Reaction Handler**: Manages pronoun role assignments via emoji reactions
- **Bully Tracker**: Tracks statistics for `!bully`/`!Xully` commands with records and leaderboard
- **Temperature Converter**: Automatically detects and converts temperature values in messages
- **Time Zone Display**: Shows current time across multiple global locations using Luxon
- **Custom Commands**: Stores and executes user-created commands
- **Thread Bookmarking**: Allows saving and listing important threads
- **Storage Layer**: Persists data using node-persist
- **Easter Eggs**: Includes Weezer detection functionality

## Dependencies

- **discord.js**: Core Discord bot framework and API interaction
- **dotenv**: Environment variable management for configuration
- **luxon**: Date/time handling and timezone conversion for `!time` command
- **node-persist**: Persistent JSON-based storage for commands and statistics
