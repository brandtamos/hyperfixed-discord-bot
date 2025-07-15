# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2025-07-15

### Added
- Automatic distance conversion detection in messages (`distance.js`)
- Support for kilometers/km to miles/mi conversion and vice versa
- Smart rounding for distance values (2 decimal places for values under 10, whole numbers for larger values)

### Changed
- Improved bully command regex to support Unicode characters (`/^!\p{L}ully$/u`)
- Enhanced bully command pattern matching for unicode character support

### Contributors
- @brandtamos (Evan Brandt)
- @xulinus (linus)
- @markmcd (Mark McDonald)
- @WPTK (BK)

## [2.2.0] - 2025-07-15 (hackin' and slashin')

### Changed
- Simplified README.md with streamlined installation and configuration sections
- Cleaned up documentation structure for better maintainability
- Updated architecture documentation to remove unnecessary diagrams
- Simplified role documentation to use generic setup instructions instead of hardcoded IDs

### Removed
- Removed API reference documentation (feature not implemented)
- Removed CLI documentation (unnecessary for simple Node.js script)  
- Removed deployment documentation (not relevant for DIY project)
- Removed MkDocs configuration (not in use)
- Removed hardcoded server-specific role IDs from roles documentation

### Fixed
- Corrected FAQ references to non-existent documentation
- Updated changelog to remove references to deleted documentation files

### Contributors
- @brandtamos (Evan Brandt)
- @WPTK (BK)

## [2.1.0] - 2025-06-26

### Added
- Automatic temperature conversion detection in messages (`temperature.js`)
- `!time` command showing current time across Hyperfixed population centers (`timezone.js`)
- `!bullyleaderboard` command to show user rankings by bully frequency
- Enhanced bully commands to support any `!*ully` pattern (e.g., `!wully`, `!cully`)
- Weezer detection easter egg responding with "*Weeer"
- `ROLE_PRONOUN_*` environment variables for pronoun role management
- `luxon` dependency for timezone functionality
- `CODEOWNERS` file for repository management

### Fixed
- Temperature regex to enforce proper word boundaries and allow punctuation
- NaN handling in bully tracking timestamps and counters
- Async/await issue in `getAndSetBullyRecord` function
- Casing in bully message output
- Issue where new bulliers weren't properly added to leaderboard

### Changed
- Extracted bully functionality to separate `bully.js` module
- Moved pronoun role IDs from hardcoded values to environment variables
- Improved bully command pattern matching with regex
- Complete documentation overhaul with comprehensive guides
- Added architecture documentation (`docs/architecture.md`)
- Added configuration guide (`docs/configuration.md`)
- Added Discord setup guide (`docs/discord-setup.md`)
- Added usage examples (`docs/examples.md`)
- Added FAQ (`docs/faq.md`)
- Added getting started guide (`docs/getting-started.md`)
- Added roles and commands documentation (`docs/roles.md`, `docs/commands.md`)
- Updated README with comprehensive feature descriptions and quick start

### Contributors
- @brandtamos (Evan Brandt)
- @xulinus (linus) 
- @WPTK (BK)
- @markmcd (Mark McDonald)
- @lelbarton (Laura Barton)
- @gla3dr (Zack M)

## [1.0.0] - 2025-06-17

### Added
- Initial release with custom commands system (`!addcommand`, `!removecommand`)
- Basic bully tracking with `!bully` command
- Pronoun role assignment via emoji reactions
- Persistent storage using node-persist
- MOD role permission system
- Basic Discord.js bot setup
- Environment configuration with `.env` support
- Package configuration with discord.js, dotenv, node-persist dependencies

### Contributors
- @brandtamos (Evan Brandt)
