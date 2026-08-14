# Deploy to Vercel (Simple Guide)

Vercel hosts both your frontend and backend. Registrations save to Excel file automatically.

## 5-Minute Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository (name: `alraed-tournament`)
3. Choose **Public** or **Private**
4. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open PowerShell in your project folder:

```powershell
cd "c:\Users\SSD\Desktop\New folder\AL RAED SPORTS\Al Raed (MDZ)\Coaching\Coaching Details\2026\AUG_2026\Summer Camp Website"

# Initialize git
git init
git add .
git commit -m "Initial commit: Alraed Tournament Registration"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/alraed-tournament.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Done!** Your code is now on GitHub.

---

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" → Sign up with GitHub
3. Connect your GitHub account
4. Click "Import Project"
5. Select your repository: `alraed-tournament`
6. Click "Import"
7. Wait ~2 minutes for deployment
8. Copy your live URL (looks like: `https://alraed-tournament.vercel.app`)

**Done!** Your website is LIVE! ✓

---

## How to Use

### Access Your Website
Visit your Vercel URL:
```
https://alraed-tournament.vercel.app
```

Share this link with parents via WhatsApp!

### Download Registrations

Registrations are saved to `/data/tournament-registrations.csv`

**To download:**
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click "Functions" or "Storage"
5. Navigate to `data/` folder
6. Download `tournament-registrations.csv`

**Or via Vercel CLI:**
```powershell
npm install -g vercel

# Login to Vercel
vercel login

# Download file from production
vercel env pull

# File is in .env file or use:
vercel link  # Links your local project
```

---

## Before You Deploy - Config Updates

Make sure to add WhatsApp number:

### Update WhatsApp Number
File: `public/script.js` (Line 9)
```javascript
whatsappNumber: '971501234567',  // ← Change to your number
```

### Commit and Push
```powershell
git add .
git commit -m "Update WhatsApp number"
git push
```

Vercel will auto-deploy! (takes ~30 seconds)

---

## Testing Live Website

1. Open your Vercel URL in browser
2. Fill registration form
3. Click "Register for Tournament"
4. Should see success page ✓

The registration is automatically saved to the CSV file!

---

## Troubleshooting

### "Deployment failed"
- Check GitHub repo has all files
- Make sure `.gitignore` doesn't exclude important files
- Check `package.json` exists

### "Form doesn't submit"
- Check browser console (F12)
- Make sure you're on HTTPS (Vercel URL)
- Wait a few minutes for deployment to complete

### "Can't find CSV file"
- CSV is created automatically after first submission
- Check Vercel storage/functions
- File path: `/data/tournament-registrations.csv`

### "Need to update WhatsApp number"
1. Edit `public/script.js` (Line 9)
2. Run: `git add . && git commit -m "Update number" && git push`
3. Vercel auto-deploys in ~30 seconds
4. Refresh your browser

---

## Access CSV File from Vercel

### Option 1: Via Vercel Web Interface
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Storage" tab
4. Navigate to file
5. Download

### Option 2: Create Admin Download Link (Optional)

If you want to access registrations easily, I can add a download button.

Just ask and I'll create it!

---

## After Deployment

### Share with Parents
Send them this link via WhatsApp:
```
https://alraed-tournament.vercel.app
```

### Monitor Registrations
- Registrations appear in CSV automatically
- Check daily or before tournament
- Download final list for fixtures

### Make Changes
Any changes you make:
1. Edit file locally
2. `git add .`
3. `git commit -m "Description"`
4. `git push`
5. Vercel auto-deploys! ✓

---

## Key Points

✅ **Free** - Vercel free tier includes everything
✅ **Fast** - Deployed on CDN globally
✅ **Automatic** - Updates instantly when you push to GitHub
✅ **Secure** - HTTPS by default
✅ **Reliable** - 99.9% uptime

---

## Your Live URL Structure

```
https://alraed-tournament.vercel.app
├── / (Landing page)
├── /api/register (Form submissions)
└── /data/tournament-registrations.csv (Registrations)
```

---

## Questions?

**"How do I change something?"**
→ Edit file, `git push`, Vercel auto-deploys

**"Where are registrations?"**
→ `/data/tournament-registrations.csv` on Vercel

**"Can I share the WhatsApp link?"**
→ Yes! https://wa.me/WHATSAPP_NUMBER?text=Register%20here:%20https://alraed-tournament.vercel.app

**"Is it secure?"**
→ Yes! HTTPS, server-side validation, input sanitization

---

**That's it! You're live on Vercel!** 🚀
