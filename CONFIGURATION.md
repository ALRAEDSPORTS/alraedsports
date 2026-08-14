# Configuration Reference - All Settings in One Place

This file shows every configuration option in the application and where to change it.

## 1. TOURNAMENT DETAILS

### File: `public/script.js` (Lines 1-12)

```javascript
const TOURNAMENT_CONFIG = {
  name: 'Alraed Tournament 2026',              // ← Change tournament name
  date: '27 August 2026',                     // ← Change tournament date
  reportingTime: '10:00 AM',                  // ← Change reporting time
  whatsappNumber: 'WHATSAPP_NUMBER_HERE',     // ← ADD YOUR WHATSAPP NUMBER
  phoneNumber: 'PHONE_NUMBER_HERE'            // ← ADD YOUR PHONE NUMBER
};
```

**Example with Real Numbers:**
```javascript
const TOURNAMENT_CONFIG = {
  name: 'Alraed Summer Cup 2026',
  date: '27 August 2026',
  reportingTime: '10:00 AM',
  whatsappNumber: '971501234567',    // WhatsApp: Include country code, no spaces
  phoneNumber: '+971 50 123 4567'     // Phone: Any format
};
```

---

## 2. REGISTRATION BATCHES (Time Slots)

### File: `public/index.html` (Lines 169-174)

Current batches:
```html
<select id="batch" name="batch" required>
  <option value="Select Batch">Select Batch</option>
  <option value="10:00 AM - 12:00 PM">10:00 AM – 12:00 PM</option>
  <option value="12:00 PM - 2:00 PM">12:00 PM – 2:00 PM</option>
</select>
```

**To Change Batches:**
1. Keep the first line as-is: `<option value="Select Batch">Select Batch</option>`
2. Add/remove/edit options like this:
```html
<option value="TIME_SLOT_HERE">DISPLAY_TEXT_HERE</option>
```

**Example - Add a third batch:**
```html
<select id="batch" name="batch" required>
  <option value="Select Batch">Select Batch</option>
  <option value="8:00 AM - 10:00 AM">8:00 AM – 10:00 AM</option>
  <option value="10:00 AM - 12:00 PM">10:00 AM – 12:00 PM</option>
  <option value="12:00 PM - 2:00 PM">12:00 PM – 2:00 PM</option>
  <option value="2:00 PM - 4:00 PM">2:00 PM – 4:00 PM</option>
</select>
```

---

## 3. TOURNAMENT INFORMATION CARDS

### File: `public/index.html` (Lines 148-175)

The info cards show tournament details. To change them:

```html
<!-- TOURNAMENT NAME CARD -->
<div class="info-card">
  <div class="info-icon">📅</div>
  <div class="info-content">
    <h4>Tournament</h4>
    <p>Alraed Tournament 2026</p>  <!-- ← Change here -->
  </div>
</div>

<!-- DATE CARD -->
<div class="info-card">
  <div class="info-icon">📍</div>
  <div class="info-content">
    <h4>Date</h4>
    <p>27 August 2026</p>  <!-- ← Change here -->
  </div>
</div>

<!-- TIME CARD -->
<div class="info-card">
  <div class="info-icon">⏰</div>
  <div class="info-content">
    <h4>Reporting Time</h4>
    <p>10:00 AM</p>  <!-- ← Change here -->
  </div>
</div>
```

---

## 4. TOURNAMENT IMAGE

### File: `public/index.html` (Line 108)

```html
<img src="YOUR_IMAGE_HERE" alt="Alraed Sports Tournament" class="hero-image">
```

**To Add Your Image:**

1. Save your image file to: `public/images/tournament.jpg`
   - Format: JPG, PNG, or WebP
   - Size: 1000x1200px recommended (will scale automatically)
   - Location: Relative to project root

2. Change the `src` in HTML:
```html
<img src="public/images/tournament.jpg" alt="Alraed Sports Tournament" class="hero-image">
```

**Alternative Locations:**
```html
<!-- From URL: -->
<img src="https://example.com/tournament.jpg" ...>

<!-- From subfolder: -->
<img src="public/images/my-tournament-image.png" ...>

<!-- From root: -->
<img src="tournament.jpg" ...>
```

---

## 5. WELCOME MESSAGE

### File: `public/index.html` (Lines 103-106)

```html
<div class="welcome-message">
  <p>Get ready for an exciting day of competition, teamwork and fun! Our Summer Camp has been all about staying active, building confidence and creating great memories together. Now it's time to bring that energy to the court and enjoy the tournament!</p>
</div>
```

**To Change:** Edit the text between `<p>` and `</p>`

---

## 6. INTRO MESSAGE (On Registration Page)

### File: `public/index.html` (Lines 124-127)

```html
<div class="intro-message">
  <p>We hope this Summer Camp has brought plenty of joy, energy and unforgettable memories to our students...</p>
  <p><strong>Please complete the registration form below carefully...</strong></p>
</div>
```

---

## 7. IMPORTANT NOTICE

### File: `public/index.html` (Lines 179-183)

```html
<div class="important-notice">
  <div class="notice-header">
    <span class="notice-icon">⚠️</span>
    <h4>Important Notice</h4>
  </div>
  <p>Students should report to the court <strong>5 minutes before their scheduled reporting time</strong>...</p>
  <p class="warning-text"><strong>Late entries will not be accepted...</strong></p>
</div>
```

---

## 8. SUCCESS PAGE MESSAGE

### File: `public/index.html` (Lines 308-314)

```html
<div class="success-message">
  <p>Thank you for registering for the Alraed Tournament 2026!</p>
  <p>Your registration has been received successfully. Our team will get back to you with the confirmation through WhatsApp.</p>
  <p>Please keep an eye on your WhatsApp for further tournament details and confirmation.</p>
</div>
```

---

## 9. DUPLICATE REGISTRATION MESSAGE

### File: `server.js` (Line ~142)

```javascript
return res.status(409).json({
  success: false,
  isDuplicate: true,
  message: 'It looks like this registration may have already been submitted. If you believe this is an error, please contact us on WhatsApp.'
});
```

---

## 10. COLOR SCHEME

### File: `public/styles.css` (Lines 16-24)

```css
:root {
  /* Color Palette - Sports Professional */
  --primary-color: #0052cc;        /* Deep Blue */
  --primary-dark: #003d99;         /* Darker Blue */
  --accent-color: #ff6b35;         /* Vibrant Orange */
  --accent-light: #ff8c61;         /* Light Orange */
  --success-color: #10b981;        /* Green */
  --warning-color: #f59e0b;        /* Amber */
  --danger-color: #ef4444;         /* Red */
  --error-color: #dc2626;          /* Darker Red */
  
  --text-dark: #1f2937;            /* Dark Gray */
  /* ... */
}
```

**To Change Colors:**
1. Open `public/styles.css`
2. Find `:root {` section
3. Change the hex color codes
4. Save and refresh browser

**Example - Change to Red Theme:**
```css
--primary-color: #dc2626;        /* Red */
--primary-dark: #b91c1c;         /* Dark Red */
--accent-color: #f59e0b;         /* Gold/Orange */
```

---

## 11. FORM FIELD LABELS

### File: `public/index.html` (Lines 194-217)

```html
<!-- Student Name -->
<label for="studentName">Student Name *</label>
<input ... placeholder="Enter student's full name" ...>

<!-- Parent Name -->
<label for="parentName">Parent's Name *</label>
<input ... placeholder="Enter parent's full name" ...>

<!-- Phone Number -->
<label for="phoneNumber">Phone Number (WhatsApp) *</label>
<input ... placeholder="Enter WhatsApp/contact number" ...>

<!-- Age -->
<label for="age">Age *</label>
<input ... placeholder="Enter student's age" ...>

<!-- Batch -->
<label for="batch">Select Batch *</label>
<select ...>
```

---

## 12. SERVER CONFIGURATION

### File: `server.js` (Lines 1-12)

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;  // ← Change default port
const DATA_DIR = path.join(__dirname, 'data');
const CSV_FILE = path.join(DATA_DIR, 'tournament-registrations.csv');  // ← Change filename
```

**To Change Port:**
- Option 1: Edit `server.js` line 10: `const PORT = 3001;`
- Option 2: Run with environment variable: `PORT=3001 npm start`

---

## 13. DUPLICATE DETECTION TIME WINDOW

### File: `server.js` (Line ~133)

```javascript
const timeSinceLastReg = now - recentRegistrations[dupKey];
if (timeSinceLastReg < 5 * 60 * 1000) { // 5 minutes  ← Change here
```

**To Change to 10 minutes:**
```javascript
if (timeSinceLastReg < 10 * 60 * 1000) { // 10 minutes
```

---

## 14. VALID AGE RANGE

### File: `server.js` (Line ~117)

```javascript
const numAge = parseInt(age);
return !isNaN(numAge) && numAge >= 5 && numAge <= 25;  // ← Change here
```

**To Change to 6-30:**
```javascript
return !isNaN(numAge) && numAge >= 6 && numAge <= 30;
```

---

## 15. VALID PHONE NUMBER FORMAT

### File: `server.js` (Line ~113) and `public/script.js` (Line ~273)

```javascript
const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;  // ← Change here
```

**Current Format Accepts:**
- Digits: 0-9
- Spaces, dashes, plus sign, parentheses
- Length: 7-20 characters

---

## 16. PAGE TITLES & META TAGS

### File: `public/index.html` (Lines 3-22)

```html
<title>Alraed Tournament 2026 | Alraed Sports</title>
<meta name="description" content="Register for the Alraed Sports Summer Camp Tournament 2026.">

<meta property="og:title" content="Alraed Tournament 2026 | Alraed Sports">
<meta property="og:description" content="Register for the Alraed Sports Summer Camp Tournament 2026.">
<meta property="og:image" content="YOUR_IMAGE_HERE">

<meta property="twitter:title" content="Alraed Tournament 2026 | Alraed Sports">
<meta property="twitter:description" content="Register for the Alraed Sports Summer Camp Tournament 2026.">
```

---

## Quick Reference: Where to Change What

| What You Want to Change | File | Location |
|---|---|---|
| WhatsApp number | `public/script.js` | Line 9 |
| Phone number | `public/script.js` | Line 10 |
| Tournament name | `public/script.js` | Line 8 |
| Tournament date | `public/script.js` | Line 9 |
| Reporting time | `public/script.js` | Line 10 |
| Batch times | `public/index.html` | Lines 169-174 |
| Tournament image | `public/index.html` | Line 108 |
| Welcome message | `public/index.html` | Lines 103-106 |
| Important notice | `public/index.html` | Lines 179-183 |
| Success message | `public/index.html` | Lines 308-314 |
| Colors | `public/styles.css` | Lines 16-24 |
| CSV filename | `server.js` | Line 10 |
| Default port | `server.js` | Line 10 |
| Age range (min-max) | `server.js` | Line 117 |
| Duplicate window | `server.js` | Line 133 |
| Phone regex | `server.js` | Line 113 |
| Page title | `public/index.html` | Line 3 |

---

## Making Changes Safely

**Always:**
1. Close the application (Ctrl+C)
2. Make your changes
3. Save the file (Ctrl+S)
4. Start the application again (npm start)
5. Refresh browser (F5)
6. Test your changes

**Never:**
- Edit files while the server is running (may cause issues)
- Delete important sections of code
- Change HTML structure (only change text inside tags)
- Edit the CSV file directly (it's auto-generated)

---

## Testing Changes

After making a change:
1. Check the browser looks correct
2. Check browser console (F12) for errors
3. Try submitting a test registration
4. Verify CSV was updated correctly
5. Test on mobile size if possible

---

## Reverting Changes

If something breaks:
1. Close the application
2. Undo your changes (Ctrl+Z if using VS Code)
3. Or find the original line in this file
4. Save and restart

---

**All configuration options in one place!** ✓
