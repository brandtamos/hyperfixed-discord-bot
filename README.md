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

---

## Installation

1. **Clone the repository**  
    ```bash
    git clone https://github.com/brandtamos/hyperfixed-discord-bot.git
    cd hyperfixed-discord-bot
    ```

2. **Install dependencies**  
    ```bash
    npm install
    ```

3. **Create and populate `.env`**  
    ```bash
    cp .env_example .env
    ```  
    Edit `.env` with your Discord bot values (see [docs/discord-setup.md](docs/discord-setup.md)).

---

## Quick Start

1. Install dependencies (if you haven’t already):  
    ```bash
    npm install
    ```

2. Configure your bot:  
    ```bash
    cp .env_example .env
    ```  
    Edit `.env` with your Discord bot token and channel IDs (see [docs/discord-setup.md](docs/discord-setup.md)).

3. Start the bot:  
    ```bash
    npm start
    ```

---

## Discord Setup

Before running the bot, you need to:

1. Create a Discord application and bot user.  
2. Get your bot token.  
3. Invite the bot to your server with proper permissions.  
4. Set up the pronoun reaction message and roles.

See the **[Discord Setup Guide](docs/discord-setup.md)** for complete instructions.

---

## Features

- **Custom Commands**  
  Create text responses with `!addcommand` / `!removecommand` (MOD role required).
- **Bully Tracking**  
  Fun statistics tracking with `!bully`, `!wully`, and other `!*ully` commands.
- **Bully Leaderboard**  
  Rankings of users by bully command frequency with `!bullyleaderboard`.
- **Time Zone Display**  
  Show current time across Hyperfixed population centers with `!time`.
- **Automatic Temperature Conversion**  
  Real-time Celsius ↔ Fahrenheit conversion for any temperatures mentioned in chat.
- **Reaction-based Pronoun Roles**  
  Automatic role assignment via emoji reactions.
- **Auto-generated Help**  
  Dynamic `!help` command showing all available commands.
- **Persistent Storage**  
  Custom commands and statistics saved via `node-persist`.
- **Easter Eggs**  
  Weezer detection and other hidden features.

---

## Examples

### Custom Commands

- **Add a command** (MOD role required)  
  ```text
  !addcommand welcome New member greeting | Welcome to our awesome server! 🎉
  ```
- **Use the command**  
  ```text
  !welcome
  ```  
  **Output:**  
  ```
  Welcome to our awesome server! 🎉
  ```
- **Remove a command**  
  ```text
  !removecommand welcome
  ```

### Bullying Stats

- **Standard bullying**  
  ```text
  !bully
  ```  
  **Output:** Detailed statistics with time tracking and records.

- **Variants**  
  ```text
  !wully    # Replaces 'b' with 'w'
  !cully    # Replaces 'b' with 'c'
  ```

_For more examples, see [docs/examples.md](docs/examples.md)._

---

## Configuration

Set the following environment variables in your `.env` file:

| Variable                   | Description                           | Default |
| -------------------------- | ------------------------------------- | ------- |
| `BOT_TOKEN`                | Your Discord bot token                | *None*  |
| `REACTION_CHANNEL_ID`      | Channel ID for pronoun reactions      | *None*  |
| `PRONOUN_REACTION_POST_ID` | Message ID for pronoun reactions      | *None*  |
| `ROLE_PRONOUN_HE`          | Role ID for He/Him pronouns           | *None*  |
| `ROLE_PRONOUN_SHE`         | Role ID for She/Her pronouns          | *None*  |
| `ROLE_PRONOUN_THEY`        | Role ID for They/Them pronouns        | *None*  |
| `ROLE_PRONOUN_ASK`         | Role ID for Ask Me pronouns           | *None*  |
| `ROLE_PRONOUN_ANY`         | Role ID for Any pronouns              | *None*  |

---

## Documentation

### Quick Links

- **[Getting Started](docs/getting-started.md)** – Installation and first run  
- **[Discord Setup](docs/discord-setup.md)** – Complete Discord bot setup guide  
- **[Configuration](docs/configuration.md)** – Environment variables and settings  
- **[Bot Commands](docs/commands.md)** – Complete command reference and usage
- **[Available Roles](docs/roles.md)** – Pronoun roles and administrative permissions
- **[Examples](docs/examples.md)** – Real usage examples and workflows  
- **[FAQ](docs/faq.md)** – Common questions and troubleshooting  
- **[Deployment](docs/deployment.md)** – Production hosting options  

### Technical Docs

- **[API Reference](docs/api.md)** – Function documentation  
- **[Architecture](docs/architecture.md)** – System design overview  
- **[CLI Guide](docs/cli.md)** – Command-line usage  
- **[Changelog](docs/changelog.md)** – Version history  

---

## Project Structure

```text
├── index.js                  # Main bot logic and event handlers
├── bully.js                  # Bully tracking and leaderboard functionality  
├── temperature.js            # Automatic temperature conversion utilities
├── timezone.js               # Time zone display functionality
├── package.json              # Project metadata and scripts
├── .env_example              # Environment variable template
├── .gitignore                # Ignore configuration
├── CODEOWNERS                # Repo ownership
├── README.md                 # Project overview and usage
├── storage/                  # Persistent data (auto-created)
│   ├── storedCommands        # Custom commands
│   ├── lastBullyTime         # Bully tracking timestamp
│   ├── bullyCount            # Total bully events
│   ├── bullyRecord           # Longest streak record
│   └── bullyLeaderboard      # User rankings by bully frequency
└── docs/                     # Comprehensive documentation
    ├── api.md                # Library/API reference
    ├── architecture.md       # System design overview
    ├── changelog.md          # Version history
    ├── cli.md                # Command-line usage
    ├── commands.md           # Bot commands reference and usage
    ├── configuration.md      # Environment variables & settings
    ├── deployment.md         # Production hosting options
    ├── discord-setup.md      # Discord bot setup guide
    ├── examples.md           # Usage examples & workflows
    ├── faq.md                # Troubleshooting & common questions
    ├── getting-started.md    # Installation & first run
    ├── mkdocs.yml            # MkDocs site configuration
    └── roles.md              # Available roles and permissions

```

---

## Contributing

1. Fork the repository and clone your fork.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```  
3. Implement your changes, following code style and linting.  
4. Run tests (if any) and ensure no errors.  
5. Commit with a conventional message:  
   ```
   feat: add new feature
   ```  
6. Push and open a Pull Request.

---

## License & Authors

This project is licensed under the ISC License.  
© 2025 Brandt Amos (MT2F Industries)
