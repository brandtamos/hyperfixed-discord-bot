# Command Line Interface

## Starting the Bot

The bot can be started using npm scripts:

```bash
npm start
```

This is equivalent to running:
```bash
node index.js
```

## Development

For development with auto-restart on file changes, you can install and use nodemon:

```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Run with nodemon
nodemon index.js
```

## Environment Variables

Set environment variables before starting:

```bash
# Windows (PowerShell)
$env:BOT_TOKEN="your_token_here"
npm start

# Linux/Mac
BOT_TOKEN="your_token_here" npm start
```

However, using a `.env` file is recommended for configuration.

## Process Management

### Running in Background (Linux/Mac)
```bash
# Using nohup
nohup npm start > bot.log 2>&1 &

# Using screen
screen -S discord-bot
npm start
# Ctrl+A, D to detach
```

### Windows Service
For production Windows deployment, consider using:
- PM2: `npm install -g pm2 && pm2 start index.js --name discord-bot`
- Windows Service wrapper tools

## Logs and Debugging

The bot outputs logs to console. To save logs:

```bash
# Save logs to file
npm start > bot.log 2>&1

# View logs in real-time
npm start | tee bot.log
```

### Common Log Messages
- `Tracking reactions on message: [ID]` - Bot successfully connected
- `[User] added [emoji]` - Reaction role assignment
- `[User] removed [emoji]` - Reaction role removal
- Various error messages for troubleshooting

## Stopping the Bot

- **Interactive mode**: Ctrl+C
- **Background process**: Find process ID and kill it
- **PM2**: `pm2 stop discord-bot`


## Deployment Scripts

You can create custom scripts in `package.json`:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "prod": "NODE_ENV=production node index.js"
  }
}
```
