# Deployment Guide

## Hosting Options

### Free Hosting Services

#### Railway
1. Create account at [Railway](https://railway.app)
2. Connect GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy automatically on git push

#### Render
1. Create account at [Render](https://render.com)
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

#### Heroku (Free tier discontinued, but affordable paid options)
1. Install Heroku CLI
2. Create new app: `heroku create your-bot-name`
3. Set environment variables: `heroku config:set BOT_TOKEN=your_token`
4. Deploy: `git push heroku main`

### VPS/Cloud Hosting

#### DigitalOcean Droplet
1. Create Ubuntu droplet
2. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
3. Clone repository and install dependencies
4. Use PM2 for process management
5. Set up reverse proxy with nginx (optional)

#### AWS EC2
1. Launch EC2 instance (t2.micro eligible for free tier)
2. Configure security groups for SSH access
3. Install Node.js and git
4. Deploy application with PM2
5. Consider using Elastic IP for static IP

## Environment Setup

### Production Environment Variables

Create production `.env` file:
```ini
NODE_ENV=production
BOT_TOKEN=your_production_bot_token
REACTION_CHANNEL_ID=your_channel_id
PRONOUN_REACTION_POST_ID=your_message_id
```

### PM2 Configuration

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'hyperfixed-discord-bot',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

USER node

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  discord-bot:
    build: .
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - ./storage:/app/storage
```

Deploy:
```bash
docker-compose up -d
```

## Security Considerations

### Environment Variables
- Never commit `.env` files
- Use secrets management in production
- Rotate bot tokens regularly
- Use least-privilege Discord permissions

### Network Security
- Use HTTPS for webhooks (if implemented)
- Restrict SSH access to specific IPs
- Keep system packages updated
- Use firewall rules appropriately

### Application Security
- Validate all user inputs
- Implement rate limiting for commands
- Monitor for suspicious activity
- Regular security updates

## Monitoring

### Basic Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs

# Restart if needed
pm2 restart hyperfixed-discord-bot
```

### Advanced Monitoring
- Use services like New Relic, DataDog, or Prometheus
- Set up Discord webhooks for error notifications
- Monitor system resources (CPU, memory, disk)
- Track bot uptime and response times

## Backup Strategy

### What to Backup
- Environment configuration files
- `storage/` directory (contains custom commands and bully data)
- Application code (should be in git)

### Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_${DATE}.tar.gz" .env storage/
# Upload to cloud storage service
```

### Automated Backups
- Set up cron jobs for regular backups
- Use cloud storage for redundancy
- Test restore procedures regularly

## Scaling Considerations

### Single Server Scaling
- Use PM2 cluster mode for CPU-intensive operations
- Monitor memory usage and restart thresholds
- Optimize storage access patterns

### Multi-Server Scaling
- Current bot design is single-server focused
- For multiple servers, consider:
  - Separate bot instances per server
  - Shared database for cross-server features
  - Load balancing for high-traffic bots

## Troubleshooting Deployment

### Common Issues

**Bot offline after deployment:**
- Check process is running: `pm2 status`
- Verify environment variables are set
- Check logs for error messages: `pm2 logs`

**Permission errors:**
- Verify bot has correct Discord permissions
- Check file system permissions on storage directory
- Ensure bot token is valid and not expired

**Memory issues:**
- Monitor memory usage: `free -h`
- Adjust PM2 memory restart threshold
- Check for memory leaks in logs

**Network connectivity:**
- Test internet connectivity from server
- Verify firewall allows outbound HTTPS (port 443)
- Check DNS resolution

### Getting Help
- Check [FAQ](faq.md) for common issues
- Review [Getting Started](getting-started.md) for setup problems
- Open GitHub issue for deployment-specific problems
