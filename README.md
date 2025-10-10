# Hyperfixed Discord Bot

A Discord bot that tracks bullying statistics, converts units (temperature/distance), displays time zones, manages custom commands, pronoun roles, thread bookmarks, and bulk role management.

## Table of contents

- [Installation](#installation)  
- [Configuration](#configuration)  
- [Commands](#commands)  
- [File structure](#file-structure)
- [Documentation](#documentation)
- [Testing](#testing)
- [Reporting issues](#reporting-issues)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/brandtamos/hyperfixed-discord-bot.git
   cd hyperfixed-discord-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template:
   ```bash
   cp .env_example .env
   ```

4. Edit `.env` with your Discord bot token and IDs (see [Configuration](#configuration)).

5. Start the bot:
   ```bash
   npm start
   ```

6. (Optional) Run automated tests to ensure all functionality is working correctly:
   ```bash
   npm test
   ```

## Configuration

Set the following environment variables in your `.env` file:

| Variable                   | Description                           |
| -------------------------- | ------------------------------------- |
| `BOT_TOKEN`                | Your Discord bot token                |
| `REACTION_CHANNEL_ID`      | Channel ID for pronoun reactions      |
| `PRONOUN_REACTION_POST_ID` | Message ID for pronoun reactions      |
| `ROLE_PRONOUN_HE`          | Role ID for He/Him pronouns           |
| `ROLE_PRONOUN_SHE`         | Role ID for She/Her pronouns          |
| `ROLE_PRONOUN_THEY`        | Role ID for They/Them pronouns        |
| `ROLE_PRONOUN_ASK`         | Role ID for Ask Me pronouns           |
| `ROLE_PRONOUN_ANY`         | Role ID for Any pronouns              |

## Commands

### Built-in commands

- `!help` - Display all available commands
- `!bully` - Track bullying statistics (also works with `!wully`, `!cully`, etc.)
- `!bullyleaderboard` - Show bullying leaderboard
- `!time` - Show current time in multiple time zones
- `!threads` - Show bookmarked threads
- `!secretmenu` - Show the secret menu of silly commands

### Moderator commands

Requires the "MOD" role:

- `!addcommand [name] [description] | [response]` - Add a custom command
- `!removecommand [name]` - Remove a custom command
- `!addsecretmenucommand [name] [description] | [response]` - Add a secret menu command
- `!removesecretmenucommand [name]` - Remove a secret menu command
- `!addthread [thread_id] | [description]` - Bookmark a thread
- `!removethread [thread_id]` - Remove a bookmarked thread
- `!addrole [role_name_or_id]` - Add a role to all server members
- `!dryaddrole [role_name_or_id]` - Dry run: preview adding a role to all members
- `!removerole [role_name_or_id]` - Remove a role from all server members
- `!dryremoverole [role_name_or_id]` - Dry run: preview removing a role from all members
- `!usersworole [role_name_or_id]` - List users without a specific role (creates thread)

### Automatic features

- **Unit conversion** - Automatically converts between Celsius and Fahrenheit when temperatures are mentioned, and between kilometers/miles when distances are mentioned
- **Pronoun roles** - Assigns roles based on emoji reactions to the configured message
- **Word corrections** - Responds to certain words with joke corrections (e.g., "weezer" → "*Weeer", "blimp" → "*blump")

## File structure

```
├── index.js              # Main bot logic and event handlers
├── bully.js              # Bully tracking and leaderboard functionality  
├── conversion.js         # Unit conversion utilities (temperature, distance, weight)
├── timezone.js           # Time zone display functionality
├── threads.js            # Thread bookmarking functionality
├── threadsManager.js     # Thread storage and management
├── commands.js           # Custom command system (standard and secret menu)
├── roletoall.js          # Bulk role management functionality
├── package.json          # Project metadata and dependencies
├── jest.config.js        # Jest testing configuration
├── .env_example          # Environment variable template
├── *.test.js             # Unit test files for each module
├── docs/                 # Documentation directory
│   ├── architecture.md   # System architecture overview
│   ├── commands.md       # Detailed command reference
│   ├── configuration.md  # Environment setup guide
│   ├── discord-setup.md  # Discord bot setup instructions
│   ├── roles.md          # Role management documentation
│   └── ...              # Additional documentation
└── storage/              # Persistent data storage (auto-created)
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture](docs/architecture.md)** - System design and component overview
- **[Commands](docs/commands.md)** - Complete command reference and examples
- **[Configuration](docs/configuration.md)** - Environment setup and variables
- **[Discord Setup](docs/discord-setup.md)** - Bot creation and permissions
- **[Roles](docs/roles.md)** - Pronoun roles and bulk role management
- **[Testing](docs/testing.md)** - Test setup, running tests, and coverage
- **[Examples](docs/examples.md)** - Usage examples and common scenarios
- **[FAQ](docs/faq.md)** - Frequently asked questions and troubleshooting

## Testing

The bot includes comprehensive unit tests for all major functionality.

**Run tests:**
```bash
npm test
```

**Test files:**
- `*.test.js` - Unit tests for each module
- `jest.config.js` - Jest configuration

See [Testing Documentation](docs/testing.md) for detailed information.

## Reporting issues

If you encounter bugs or have suggestions:

1. Check existing issues on GitHub
2. Create a new issue with:
   - Y'all know what to do, just brandtampomatic in the disco
