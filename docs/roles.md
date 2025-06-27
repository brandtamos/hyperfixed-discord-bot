# Available Roles

## Pronoun Roles

The Hyperfixed Discord Bot supports the following built-in pronoun roles that users can select via reactions.

| Role Name     | Assignment Emoji Token                   | Assignment Emoji Name | Role ID                 |
|---------------|------------------------------------------|-----------------------|-------------------------|
| **He/Him**    | `<:pronoun_he:1367994903048753222>`     | `pronoun_he`          | `1367997513122189312`   |
| **She/Her**   | `<:pronoun_she:1367993600721424526>`    | `pronoun_she`         | `1367997561683837048`   |
| **They/Them** | `<:pronoun_they:1367993598078877746>`   | `pronoun_they`        | `1367997601722400818`   |
| **Ask Me**    | `<:pronoun_ask:1367993602109603972>`    | `pronoun_ask`         | `1367997625118490634`   |
| **Any**       | `<:pronoun_any:1367993599895011459>`    | `pronoun_any`         | `1367997724317712464`   |

### Managing Pronoun Roles
1. Go to the configured reaction channel and find the bot's pronoun post
2. Click the matching reaction emoji to toggle that pronoun role
3. Removing your reaction removes the role from your account

## Administrative Roles

### MOD Role

The **MOD** role provides elevated permissions for bot administration.

**Role Name:** `MOD`

**Permissions Granted:**
- Create custom commands using `!addcommand`
- Remove custom commands using `!removecommand`

**Assignment:** Manual assignment by server administrators

**Requirements:**
- Role must be named exactly "MOD" (case-sensitive)
- Role should be assigned to trusted users only
- Users without this role cannot modify custom commands

For complete command documentation, see [Bot Commands Reference](commands.md).
