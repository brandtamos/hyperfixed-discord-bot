# Hyperfixed Discord Bot

[![Build Status](https://img.shields.io/github/actions/workflow/status/brandtamos/hyperfixed-discord-bot/ci.yml)](https://github.com/brandtamos/hyperfixed-discord-bot/actions)
[![License](https://img.shields.io/github/license/brandtamos/hyperfixed-discord-bot)](LICENSE)
[![npm version](https://img.shields.io/npm/v/hyperfixedbot)](https://www.npmjs.com/package/hyperfixedbot)
[![GitHub stars](https://img.shields.io/github/stars/brandtamos/hyperfixed-discord-bot?style=social)](https://github.com/brandtamos/hyperfixed-discord-bot/stargazers)

## Overview
Hyperfixed Discord Bot provides a flexible framework for adding custom commands, reaction-based role assignments, and playful moderation utilities to your Discord server.

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Examples](#examples)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License & Authors](#license--authors)

## Installation
```bash
# Clone the repo
git clone https://github.com/brandtamos/hyperfixed-discord-bot.git
cd hyperfixed-discord-bot

# Install dependencies
npm install

# Create and populate .env
cp .env_example .env
# Edit .env with your Discord bot values (see docs/discord-setup.md)
````

## Quick Start

```bash
# Install dependencies
npm install

# Configure your bot (see docs/discord-setup.md for detailed instructions)
cp .env_example .env
# Edit .env with your Discord bot token and channel IDs

# Start the bot
npm start


## Discord Setup
Before running the bot, you need to:
1. Create a Discord application and bot user
2. Get your bot token
3. Invite the bot to your server with proper permissions
4. Set up pronoun reaction message and roles

**See the [Discord Setup Guide](docs/discord-setup.md) for complete instructions.**

## Features

* **Custom Commands** - Create text responses with `!addcommand` / `!removecommand` (MOD role required)
* **Bully Tracking** - Fun statistics tracking with `!bully`, `!wully`, and other `!*ully` commands
* **Reaction-based Pronoun Roles** - Automatic role assignment via emoji reactions
* **Auto-generated Help** - Dynamic `!help` command showing all available commands
* **Persistent Storage** - Custom commands and statistics saved via `node-persist`
* **Easter Eggs** - Weezer detection and other hidden features

## Examples

### Custom Commands
```bash
# Create a custom command (MOD role required)
!addcommand welcome New member greeting | Welcome to our awesome server! 🎉

# Use the command
!welcome
# Output: Welcome to our awesome server! 🎉

# Remove a command
!removecommand welcome


### Bully Tracking
```bash
# Standard bully tracking
!bully
# Output: Detailed statistics with time tracking and records

# Creative variants
!wully  # Replaces 'b' with 'w' in output
!cully  # Replaces 'b' with 'c' in output
```

For more examples, see [docs/examples.md](docs/examples.md).

## Configuration

Set the following environment variables in `.env`:

| Variable                   | Description                           | Default |
| -------------------------- | ------------------------------------- | ------- |
| `BOT_TOKEN`                | Your Discord bot token                | *None*  |
| `REACTION_CHANNEL_ID`      | Channel ID for pronoun reactions      | *None*  |
| `PRONOUN_REACTION_POST_ID` | Message ID to track pronoun reactions | *None*  |

## Documentation

### Quick Links
- **[Getting Started](docs/getting-started.md)** - Installation and first run
- **[Discord Setup](docs/discord-setup.md)** - Complete Discord bot setup guide
- **[Configuration](docs/configuration.md)** - Environment variables and settings
- **[Examples](docs/examples.md)** - Real usage examples and workflows
- **[FAQ](docs/faq.md)** - Common questions and troubleshooting
- **[Deployment](docs/deployment.md)** - Production hosting options

### Technical Documentation  
- **[API Reference](docs/api.md)** - Function documentation
- **[Architecture](docs/architecture.md)** - System design overview
- **[CLI Guide](docs/cli.md)** - Command line usage
- **[Changelog](docs/changelog.md)** - Version history

## Project Structure

```
├── index.js                 # Main bot logic and event handlers
├── package.json             # Project metadata and scripts  
├── .env_example             # Environment variable template
├── storage/                 # Persistent data (auto-created)
│   ├── storedCommands       # Custom commands
│   ├── lastBullyTime        # Bully tracking timestamp
│   ├── bullyCount          # Total bully events
│   └── bullyRecord         # Longest streak record
└── docs/                   # Comprehensive documentation
    ├── getting-started.md  # Setup instructions
    ├── discord-setup.md    # Discord configuration
    ├── examples.md         # Usage examples
    ├── api.md             # API reference
    ├── faq.md             # Troubleshooting
    └── deployment.md      # Hosting guide
```

## Contributing

1. Fork the repository and clone your fork.
2. Create a new branch: `git checkout -b feature-name`.
3. Implement your changes, following code style and linting.
4. Run tests (if any) and ensure no errors.
5. Commit with conventional commit message: `feat: add new feature`.
6. Push and open a Pull Request.

## License & Authors

This project is licensed under the ISC License. © 2025 Brandt Amos (MT2F Industries)
