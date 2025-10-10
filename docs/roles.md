# Role Management

## Pronoun Roles

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

### Configuration Required

Set these environment variables in your `.env` file:
- `REACTION_CHANNEL_ID` - Channel where the pronoun message is located
- `PRONOUN_REACTION_POST_ID` - Specific message ID for reactions
- `ROLE_PRONOUN_HE`, `ROLE_PRONOUN_SHE`, etc. - Discord role IDs

## Bulk Role Management (MOD only)

The bot provides powerful bulk role management tools for server administrators.

### Add Role to All Members

**Commands:**
- `!addrole <role_name_or_id>` - Adds role to all server members
- `!dryaddrole <role_name_or_id>` - Preview mode (shows what would happen)

**Features:**
- Accepts role name or role ID
- Works with all existing server members
- Dry run mode for safe testing
- Progress logging to console
- Error handling for permission issues

**Examples:**
```
!addrole Member
!addrole 123456789012345678
!dryaddrole "New User"
```

### Remove Role from All Members

**Commands:**
- `!removerole <role_name_or_id>` - Removes role from all server members  
- `!dryremoverole <role_name_or_id>` - Preview mode (shows what would happen)

**Features:**
- Same functionality as add commands but removes roles
- Safe dry run testing
- Comprehensive error handling

### Find Users Without Role

**Command:** `!usersworole <role_name_or_id>`

**Functionality:**
- Creates a temporary thread listing all users without the specified role
- Handles message length limits by splitting into multiple messages
- Thread auto-archives after 1 hour
- Useful for identifying members who need specific roles

**Example Output:**
Creates thread: "Users without the `Verified` role"
```
user1 [123456789]
user2 [234567890]  
user3 [345678901]
```

## Administrative Roles

### MOD Role

The **MOD** role provides elevated permissions for bot administration.

**Permissions granted:**
- **Custom Commands**: Create/remove standard and secret menu commands
- **Thread Management**: Add/remove bookmarked threads  
- **Bulk Role Management**: Add/remove roles to all server members
- **Role Auditing**: List users missing specific roles

**Commands available to MOD role:**
```
!addcommand, !removecommand
!addsecretmenucommand, !removesecretmenucommand  
!addthread, !removethread
!addrole, !dryaddrole
!removerole, !dryremoverole
!usersworole
```

**Assignment:** Manual assignment by server administrators

**Requirements:**
- Role must be named exactly "MOD" (case-sensitive)
- Role should be assigned to trusted users only
- Users without this role cannot use administrative commands

### Security Notes

- Bulk role management commands can affect all server members
- Always use dry run commands first to preview changes
- Monitor console output for errors during bulk operations
- Bot must have appropriate permissions to manage target roles
- Bot cannot manage roles higher than its own highest role
