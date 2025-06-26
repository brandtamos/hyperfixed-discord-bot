# Changelog

## [2.1.0] - 2025-06-26
### ✨ Features
- Added automatic temperature conversion detection in messages (`temperature.js`)
- Added `!time` command showing current time across Hyperfixed population centers (`timezone.js`)
- Added `!bullyleaderboard` command to show user rankings by bully frequency
- Enhanced bully commands to support any `!*ully` pattern (e.g., `!wully`, `!cully`)
- Added Weezer detection easter egg responding with "*Weeer"

### 🐛 Fixes
- Fixed temperature regex to enforce proper word boundaries and allow punctuation
- Fixed NaN handling in bully tracking timestamps and counters
- Fixed async/await issue in `getAndSetBullyRecord` function
- Fixed casing in bully message output
- Fixed issue where new bulliers weren't properly added to leaderboard

### 🔨 Refactors
- Extracted bully functionality to separate `bully.js` module
- Moved pronoun role IDs from hardcoded values to environment variables
- Improved bully command pattern matching with regex

### 📄 Docs
- Complete documentation overhaul with comprehensive guides
- Added comprehensive API reference (`docs/api.md`)
- Added architecture documentation (`docs/architecture.md`)
- Added configuration guide (`docs/configuration.md`)
- Added deployment guide (`docs/deployment.md`)
- Added Discord setup guide (`docs/discord-setup.md`)
- Added usage examples (`docs/examples.md`)
- Added FAQ (`docs/faq.md`)
- Added getting started guide (`docs/getting-started.md`)
- Added CLI documentation (`docs/cli.md`)
- Added roles and commands documentation (`docs/roles.md`, `docs/commands.md`)
- Added MkDocs configuration for documentation site
- Updated README with comprehensive feature descriptions and quick start

### 🔧 Configuration
- Added `ROLE_PRONOUN_*` environment variables for pronoun role management
- Added `luxon` dependency for timezone functionality
- Added `CODEOWNERS` file for repository management

### Contributors
- @brandtamos (Evan Brandt)
- @xulinus (linus) 
- @WPTK (BK)
- @markmcd (Mark McDonald)
- @lelbarton (Laura Barton)
- @gla3dr

## [1.0.0] - 2025-06-17
### ✨ Features
- Initial release with custom commands system (`!addcommand`, `!removecommand`)
- Basic bully tracking with `!bully` command
- Pronoun role assignment via emoji reactions
- Persistent storage using node-persist
- MOD role permission system

### 🔧 Configuration
- Basic Discord.js bot setup
- Environment configuration with `.env` support
- Package configuration with discord.js, dotenv, node-persist dependencies

### Contributors
- @brandtamos (Evan Brandt)

Using Semantic Versioning from https://semver.org/