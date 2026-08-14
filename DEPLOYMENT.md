# Deployment Guide - Alraed Tournament Registration Website

This guide helps you deploy the application to production so it's accessible 24/7 from anywhere.

## Overview of Deployment Options

| Option | Difficulty | Cost | Persistence | Best For |
|--------|-----------|------|-------------|----------|
| **Local Machine** | Easy | Free | Yes | Testing, small event |
| **Heroku** | Easy | Free→Paid | Yes | Small to medium events |
| **Vercel** | Medium | Free→Paid | No* | Serverless (needs db) |
| **DigitalOcean** | Medium | $5-$12/mo | Yes | Production, reliable |
| **AWS/Google Cloud** | Hard | Variable | Yes | Enterprise scale |

*Vercel doesn't persist files by default; you'd need S3 or similar storage.

---

## Option 1: Deploy to Heroku (Easiest)

### Why Heroku?
- Free tier available (limited)
- CSV file persists between deploys
- Easy deployment with git
- HTTPS included
- Good for small to medium events

### Step-by-Step

#### 1. Create Heroku Account
- Go to https://www.heroku.com
- Sign up (free)
- Verify email

#### 2. Install Heroku CLI
- Download from https://devcenter.heroku.com/articles/heroku-cli
- Install and verify:
  ```powershell
  heroku --version
  ```

#### 3. Prepare Git Repository
```powershell
cd "c:\Users\SSD\Desktop\New folder\AL RAED SPORTS\Al Raed (MDZ)\Coaching\Coaching Details\2026\AUG_2026\Summer Camp Website"

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Alraed Tournament Registration website"
```

#### 4. Create Heroku App
```powershell
# Login to Heroku
heroku login

# Create new app (replace my-tournament-app with your chosen name)
heroku create my-tournament-app

# Verify it's created
heroku apps
```

#### 5. Deploy
```powershell
# Push to Heroku
git push heroku main

# Or if branch is called master:
git push heroku master
```

#### 6. Access Your App
Your app is now live at: `https://my-tournament-app.herokuapp.com`

### Managing on Heroku

**View Logs:**
```powershell
heroku logs --tail
```

**Restart App:**
```powershell
heroku restart
```

**View App URL:**
```powershell
heroku open
```

**Download CSV File:**
```powershell
# SSH into app
heroku run bash

# Inside the shell:
cat data/tournament-registrations.csv

# Or copy to local machine:
# (From local machine)
heroku run "cat data/tournament-registrations.csv" > registrations.csv
```

### Heroku Limitations & Notes
- Free tier: app sleeps after 30 minutes of inactivity (wakes on request, ~5s delay)
- Paid tier: always running (starts at $7/month)
- CSV persists on Heroku's file system
- Heroku periodically "dyno reset" (~monthly) but files in `/data` are preserved
- After reset, old registrations may be lost unless you backup

**Recommendation for Production:** Use Heroku Paid Tier ($7-15/mo) for reliability.

---

## Option 2: Deploy to DigitalOcean (Recommended for Production)

### Why DigitalOcean?
- Affordable ($5-12/month for small droplet)
- Full control over server
- CSV persists permanently
- HTTPS via Let's Encrypt (free)
- 99.9% uptime SLA

### Step-by-Step

#### 1. Create DigitalOcean Account
- Go to https://www.digitalocean.com
- Sign up
- Add payment method

#### 2. Create a Droplet (Virtual Server)
- Click "Create" → "Droplets"
- **Choose Image**: Ubuntu 22.04 LTS
- **Choose Plan**: Basic ($5/month)
- **Region**: Choose closest to your location
- **Authentication**: Add SSH key (or password)
- **Hostname**: `alraed-tournament`
- Click "Create Droplet"

#### 3. SSH into Your Server
```powershell
# Get IP from DigitalOcean console
# Then SSH in:
ssh root@YOUR_IP_ADDRESS

# Or with password (if you chose that):
# Will prompt for password
```

#### 4. Setup Server
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install Git
apt install -y git

# Install PM2 (process manager)
npm install -g pm2

# Create directory for app
mkdir -p /var/www/alraed-tournament
cd /var/www/alraed-tournament

# Clone your repository (or upload files)
git clone <YOUR_REPO_URL> .
# or: scp -r /path/to/local/files root@YOUR_IP:/var/www/alraed-tournament/

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "alraed-tournament"
pm2 startup
pm2 save
```

#### 5. Setup Nginx (Reverse Proxy)
```bash
# Install Nginx
apt install -y nginx

# Create config
cat > /etc/nginx/sites-available/alraed-tournament << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/alraed-tournament /etc/nginx/sites-enabled/

# Test config
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### 6. Setup HTTPS (Let's Encrypt)
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate (replace with your domain)
certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically
```

#### 7. Access Your App
Visit: `https://yourdomain.com` (or `http://YOUR_IP` if no domain)

### Managing on DigitalOcean

**Check Server Status:**
```bash
pm2 status
```

**View Logs:**
```bash
pm2 logs alraed-tournament
```

**Restart App:**
```bash
pm2 restart alraed-tournament
```

**Update App (if you push to git):**
```bash
cd /var/www/alraed-tournament
git pull
npm install
pm2 restart alraed-tournament
```

**Backup CSV File:**
```bash
# Copy to your local machine
scp root@YOUR_IP:/var/www/alraed-tournament/data/tournament-registrations.csv .
```

**Download via SFTP:**
- Use FileZilla or WinSCP
- Connect to your server
- Navigate to `/var/www/alraed-tournament/data/`
- Download `tournament-registrations.csv`

---

## Option 3: Deploy to Vercel (Serverless, Requires Database)

### Why NOT Vercel for This Project?
- ❌ Vercel doesn't persist files on disk
- ❌ Would require external database (MongoDB, PostgreSQL, etc.)
- ❌ More complex to setup
- ✓ Only use if you want to use Vercel + separate database

### If You Still Want Vercel + Database:
Would need to modify `server.js` to use:
- MongoDB Atlas (free tier available)
- Firebase Firestore
- PostgreSQL (AWS RDS)
- DynamoDB

This is beyond the scope of this guide. Contact development team for custom setup.

---

## Option 4: AWS EC2 (Enterprise)

Similar to DigitalOcean but more complex. Steps:
1. Create EC2 instance (Ubuntu 22.04)
2. Configure security groups (allow ports 80, 443)
3. SSH in and follow DigitalOcean steps 4-6 above
4. Use Route 53 for DNS
5. Use CloudWatch for monitoring

---

## Post-Deployment Checklist

- [ ] Website loads at your URL
- [ ] Registration form works
- [ ] CSV file is created after first registration
- [ ] Second registration is appended (not overwritten)
- [ ] WhatsApp button works
- [ ] Website is HTTPS (if applicable)
- [ ] Tested on mobile phone
- [ ] Tested on desktop
- [ ] Server doesn't crash with multiple registrations
- [ ] Tested duplicate registration
- [ ] CSV file is accessible and readable
- [ ] Set up automatic backups of CSV

---

## Monitoring & Maintenance

### Daily Checks
```bash
# SSH into server and check:
pm2 status
pm2 logs --lines 50

# If issues:
pm2 restart alraed-tournament
```

### Weekly Backups
```bash
# Manual backup
cp /var/www/alraed-tournament/data/tournament-registrations.csv /backup/$(date +%Y%m%d).csv

# Or use automated backup (cron job):
crontab -e
# Add line: 0 2 * * * cp /var/www/alraed-tournament/data/tournament-registrations.csv /backup/$(date +\%Y\%m\%d).csv
```

### Before Tournament Day
1. Backup CSV file
2. Test complete registration flow
3. Test on various mobile devices
4. Share WhatsApp link with parents
5. Monitor logs during registration period
6. Have backup server ready (optional)

---

## Troubleshooting Deployment

### Website Shows "502 Bad Gateway"
- Server crashed. SSH in and check:
  ```bash
  pm2 logs alraed-tournament
  ```
- Common issues: Out of memory, port conflict
- Restart: `pm2 restart alraed-tournament`

### Can't Connect to Server
- Check security groups/firewall allows ports 80, 443
- Check server is running: `pm2 status`
- Check Nginx: `systemctl status nginx`

### CSV File Lost After Restart
- If using temporary file system (like Vercel), implement backup to database
- If using traditional server, files should persist
- Always backup before major updates

### High Traffic Causes Slowness
- Nginx reverse proxy helps
- Add more memory to server
- Implement caching headers
- Consider load balancing for very large events

---

## Comparing Costs (Rough Estimates)

**Small Event (50-100 registrations):**
- Heroku Free: $0 (with limitations)
- DigitalOcean: $5/month

**Medium Event (100-500 registrations):**
- Heroku Hobby: $7-25/month
- DigitalOcean: $5-12/month
- AWS: $10-30/month (variable)

**Large Event (500+ registrations):**
- Dedicated DigitalOcean: $12-24/month
- AWS with scaling: $20-50+/month
- Load balancer: Add $20+/month

---

## My Recommendation

**For Alraed Sports (Based on Expected Scale):**

### Option 1: Heroku (During Tournament)
- Deploy 1 week before tournament
- Use free tier or hobby plan ($7/mo)
- Take down after tournament
- **Cost**: $0-7 for 1 month

### Option 2: DigitalOcean (Long-term)
- Keep running for future events
- Use $5/month basic droplet
- Backup CSV after each tournament
- **Cost**: $5/month ongoing

### Recommendation
**DigitalOcean** - Most reliable and cost-effective for recurring tournaments.

---

## Need Production Deployment Help?

For custom deployment, cloud setup, or scaling needs, contact the development team with:
1. Expected number of registrations
2. Timeline (when is tournament?)
3. Budget constraints
4. Long-term plans (recurring events?)
5. Domain name (if you have one)

---

**Deploy with confidence!** Your registration data is safe and secure. ✓
