# Hyperfixed Discord Bot

A Discord bot that tracks bullying statistics, converts temperatures, displays time zones, and manages custom commands and pronoun roles.

## Table of contents

- [Installation](#installation)  
- [Configuration](#configuration)  
- [Commands](#commands)  
- [File structure](#file-structure)
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

### Moderator commands

Requires the "MOD" role:

- `!addcommand [name] [description] | [response]` - Add a custom command
- `!removecommand [name]` - Remove a custom command  
- `!addthread [thread_id] | [description]` - Bookmark a thread
- `!removethread [thread_id]` - Remove a bookmarked thread

### Automatic features

- **Temperature conversion** - Automatically converts between Celsius and Fahrenheit when temperatures are mentioned
- **Distance conversion** - Automatically converts between kilometers and miles when distances are mentioned
- **Pronoun roles** - Assigns roles based on emoji reactions to the configured message
- **Weezer detection** - Responds to Weezer mentions

## File structure

```
├── index.js              # Main bot logic and event handlers
├── bully.js              # Bully tracking and leaderboard functionality  
├── temperature.js        # Temperature conversion utilities
├── distance.js           # Distance conversion utilities
├── timezone.js           # Time zone display functionality
├── threads.js            # Thread bookmarking functionality
├── package.json          # Project metadata and dependencies
├── .env_example          # Environment variable template
└── storage/              # Persistent data storage (auto-created)
```

## Reporting issues

If you encounter bugs or have suggestions:

1. Check existing issues on GitHub
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Bot logs (if relevant)
   - Your environment (.env values can be redacted)
