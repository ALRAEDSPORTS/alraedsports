# QUICK START GUIDE - Alraed Tournament Registration Website

## Prerequisites: Install Node.js First

Node.js is NOT currently installed on this computer. You need to install it first.

### Step 1: Install Node.js

1. **Go to**: https://nodejs.org/
2. **Download**: LTS (Long Term Support) version - currently Node 20 or 18
3. **Install**: Run the installer and follow the prompts (keep all defaults)
4. **Verify**: Open a new Command Prompt/PowerShell and run:
   ```
   node --version
   npm --version
   ```
   Both should show version numbers

### Step 2: Navigate to Project Folder

Open Command Prompt or PowerShell and navigate to the project:

```powershell
cd "c:\Users\SSD\Desktop\New folder\AL RAED SPORTS\Al Raed (MDZ)\Coaching\Coaching Details\2026\AUG_2026\Summer Camp Website"
```

### Step 3: Install Dependencies

```powershell
npm install
```

This will install:
- **express** (web server)
- **body-parser** (request parsing)
- **csv-parser** (CSV handling)

### Step 4: Start the Application

```powershell
npm start
```

You should see:
```
✓ Alraed Tournament Registration Server running on http://localhost:3000
✓ Registrations will be saved to: [path]/data/tournament-registrations.csv
```

### Step 5: Open in Browser

Open your browser and go to: **http://localhost:3000**

You should see the beautiful landing page with:
- ALRAED SPORTS branding
- ALRAED TOURNAMENT 2026 title
- Welcome message
- "Click Here to Register" button

---

## Project Structure

```
Summer Camp Website/
├── public/
│   ├── index.html              ← Main webpage
│   ├── styles.css              ← Professional styling
│   ├── script.js               ← Form validation & logic
│   └── images/                 ← Put your tournament image here
│
├── data/
│   └── tournament-registrations.csv  ← Registrations saved here (auto-created)
│
├── server.js                   ← Backend server
├── package.json                ← Dependencies
├── .env                        ← Configuration
├── .gitignore                  ← Git settings
└── README.md                   ← Full documentation
```

---

## Quick Configuration

### Change WhatsApp Number

1. Open: `public/script.js`
2. Find line 9: `whatsappNumber: 'WHATSAPP_NUMBER_HERE',`
3. Replace with your number (e.g., `'971501234567'`)
4. Save and refresh browser

### Change Phone Number

1. Open: `public/script.js`
2. Find line 10: `phoneNumber: 'PHONE_NUMBER_HERE',`
3. Replace with your number
4. Save and refresh browser

### Change Tournament Image

1. Place your image in: `public/images/tournament.jpg`
2. Open: `public/index.html`
3. Find line with: `<img src="YOUR_IMAGE_HERE" ...`
4. Change to: `<img src="public/images/tournament.jpg" ...`
5. Save and refresh browser

---

## Testing the Website

### Test Landing Page
✓ Open http://localhost:3000
✓ See the welcome screen with tournament info
✓ Click "Click Here to Register" button

### Test Registration Form
✓ Form appears with fields:
  - Student Name
  - Parent Name
  - Phone Number
  - Age
  - Batch selector

✓ Try submitting with empty fields → Should show errors
✓ Try invalid phone (e.g., "abc") → Should reject
✓ Try invalid age (e.g., "50") → Should reject

### Test Successful Registration
✓ Fill all fields correctly:
  - Student Name: Ahmed Ali
  - Parent Name: Mohammed Ali
  - Phone Number: 0501234567
  - Age: 12
  - Batch: 10:00 AM - 12:00 PM

✓ Click "Register for Tournament" button
✓ Wait for success screen
✓ Should see: "Registration Received! 🎉"

### Test CSV File Creation
✓ Open: `data/tournament-registrations.csv`
✓ Should contain:
  ```
  Student Name,Parent Name,Phone Number,Age,Batch,Registration Date,Registration Time
  Ahmed Ali,Mohammed Ali,0501234567,12,10:00 AM - 12:00 PM,2026-08-14,10:32 AM
  ```

### Test Second Registration
✓ Click "Register Another Student"
✓ Submit another registration with different data
✓ Check CSV file again
✓ First registration should STILL be there
✓ Second registration should be APPENDED (not overwrite)

### Test Duplicate Detection
✓ Try submitting the exact same information twice within 5 minutes
✓ Second submission should show:
  "It looks like this registration may have already been submitted..."

### Test Mobile View
✓ Press F12 in browser
✓ Click mobile device icon (top-left corner)
✓ Choose iPhone or Android device
✓ Verify all elements are readable
✓ Verify buttons are large enough to tap
✓ Verify no horizontal scrolling

### Test WhatsApp Button
✓ On success screen, click "Chat with us on WhatsApp"
✓ Should open WhatsApp (if installed) with your number

---

## Stopping the Server

Press **Ctrl+C** in the Command Prompt/PowerShell where the server is running

```
^C
```

---

## Troubleshooting

### Problem: "npm: The term 'npm' is not recognized"
**Solution**: Node.js not installed properly. Reinstall Node.js from https://nodejs.org/

### Problem: "Port 3000 already in use"
**Solution**: Another app is using port 3000. Either:
- Option 1: Kill the process
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
  ```
- Option 2: Use a different port
  ```powershell
  $env:PORT=3001; npm start
  ```

### Problem: "Cannot GET /"
**Solution**: Server not running. Make sure you ran `npm start` and see the message about port 3000

### Problem: "CSV file not found"
**Solution**: It's created automatically on first successful registration. Check `data/` folder after first submission.

### Problem: Form won't submit
**Solution**: Check browser console (F12 > Console tab) for errors. Common causes:
- Invalid phone number format
- Server not running
- Network error

---

## What's Inside

### Frontend (No Login Required)
- ✓ Beautiful landing page
- ✓ Professional registration form
- ✓ Client-side validation
- ✓ Success confirmation screen
- ✓ Mobile-responsive design
- ✓ Smooth animations
- ✓ WhatsApp contact button

### Backend (Secure Data Storage)
- ✓ Express.js server
- ✓ Server-side validation
- ✓ Input sanitization
- ✓ Duplicate detection
- ✓ CSV file creation/appending
- ✓ Automatic timestamp addition
- ✓ Error handling

### Features
- ✓ No login/authentication needed
- ✓ No Google Forms
- ✓ No browser storage (uses server)
- ✓ All registrations saved to CSV
- ✓ Professional sports aesthetic
- ✓ Fully responsive (320px to 1440px+)
- ✓ Fast & lightweight
- ✓ Secure & validated

---

## Next Steps

1. **Install Node.js** from https://nodejs.org/ (LTS version)
2. **Navigate to project folder** (see Step 2 above)
3. **Run** `npm install` and then `npm start`
4. **Open** http://localhost:3000 in your browser
5. **Configure** WhatsApp number and image (optional)
6. **Test** the complete registration flow
7. **Deploy** to production (see README.md for options)

---

## Need Help?

Read the full documentation in `README.md` for:
- Complete project structure
- Deployment instructions
- API documentation
- Security notes
- Customization guide
- Troubleshooting

---

**Everything is ready! Just install Node.js and run `npm start`** ✓
