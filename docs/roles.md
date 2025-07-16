# Available roles

## Pronoun roles

The bot supports pronoun roles that users can select via emoji reactions.

### Supported pronouns

- **He/Him** - Assigned via `pronoun_he` emoji
- **She/Her** - Assigned via `pronoun_she` emoji  
- **They/Them** - Assigned via `pronoun_they` emoji
- **Ask Me** - Assigned via `pronoun_ask` emoji
- **Any** - Assigned via `pronoun_any` emoji

### How pronoun roles work

1. Create Discord roles for each pronoun set you want to support
2. Create custom emojis with the names listed above
3. Set up a message where users can react with pronoun emojis
4. Configure the bot with the message ID and role IDs in your `.env` file
5. Users click reactions to add/remove pronoun roles

## Administrative roles

### MOD role

The **MOD** role provides elevated permissions for bot administration.

**Permissions granted:**
- Create custom commands using `!addcommand`
- Remove custom commands using `!removecommand`
- Add bookmarked threads using `!addthread`
- Remove bookmarked threads using `!removethread`

**Assignment:** Manual assignment by server administrators

**Requirements:**
- Role must be named exactly "MOD" (case-sensitive)
- Role should be assigned to trusted users only
- Users without this role cannot modify custom commands or threads
