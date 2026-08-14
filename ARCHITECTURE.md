# Application Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      ALRAED TOURNAMENT REGISTRATION              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND (Browser)                    │   │
│  │                                                          │   │
│  │  public/index.html          Landing Page               │   │
│  │  public/script.js           Registration Form           │   │
│  │  public/styles.css          Success Screen              │   │
│  │                                                          │   │
│  │  Features:                                               │   │
│  │  - Client-side validation                              │   │
│  │  - Beautiful responsive UI                             │   │
│  │  - WhatsApp integration                                │   │
│  │  - Real-time error messages                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↕ HTTP/JSON                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   BACKEND (Node.js Server)              │   │
│  │                                                          │   │
│  │  server.js - Express.js Application                     │   │
│  │                                                          │   │
│  │  Endpoints:                                             │   │
│  │  - POST /api/register    (Submit registration)          │   │
│  │  - GET /api/health       (Server health check)          │   │
│  │                                                          │   │
│  │  Features:                                               │   │
│  │  - Server-side validation                               │   │
│  │  - Input sanitization                                   │   │
│  │  - Duplicate detection                                  │   │
│  │  - CSV file management                                  │   │
│  │  - Error handling                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↕ File System                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   DATA STORAGE (File System)             │   │
│  │                                                          │   │
│  │  data/tournament-registrations.csv                      │   │
│  │                                                          │   │
│  │  - Auto-created on first registration                  │   │
│  │  - Headers: Student Name, Parent Name, Phone, Age...  │   │
│  │  - New registrations appended (never overwritten)       │   │
│  │  - UTF-8 encoding with proper escaping                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Journey Flow

```
START
  │
  ├─────────────────────────────────────────────────────────┐
  │                                                         │
  ▼                                                         │
┌─────────────────────┐                                    │
│  Landing Page       │  (User Opens Link)                │
│                     │                                    │
│ - ALRAED SPORTS     │                                    │
│ - Tournament Info   │                                    │
│ - Welcome Message   │                                    │
│ - CTA Button        │                                    │
│                     │                                    │
│ [Click to Register] │                                    │
└──────────┬──────────┘                                    │
           │                                               │
           ▼                                               │
┌─────────────────────┐                                    │
│ Registration Form   │  (Page 2)                         │
│                     │                                    │
│ □ Student Name      │  Client-side                      │
│ □ Parent Name       │  Validation                       │
│ □ Phone Number      │  ────────────                     │
│ □ Age               │  - Validate each field            │
│ □ Batch Selector    │  - Show error messages            │
│                     │  - Show success indicators        │
│ [Register]          │                                    │
└──────────┬──────────┘                                    │
           │                                               │
           ├─ Invalid? ──────────────────────────┐         │
           │                                    │          │
           ▼                                    │          │
    All Valid?  ──────NO──────┐               │          │
           │ YES              │               │          │
           │                  ▼               │          │
           │           Show Error             │          │
           │           (Stay on Form)         │          │
           │                  │               │          │
           │                  └─────────┬─────┘          │
           │                            │                 │
           │                            ▼                 │
           │                      [User Fixes]            │
           │                            │                 │
           │                            └─────────────────┘
           │
           ▼
┌─────────────────────┐
│ Send to Backend     │  (API Call)
│ POST /api/register  │
│                     │
│ Server validates:   │
│ - All fields filled │
│ - Valid phone       │
│ - Valid age         │
│ - Valid batch       │
└──────────┬──────────┘
           │
           ├─ Invalid? ──────────────────────────┐
           │                                    │
           ▼                                    │
    All Valid?                                 │
           │ YES                                │
           │                                    ▼
           │                          Error Response
           │                          Show to User
           │                          (Stay on Form)
           │
           ▼
┌─────────────────────┐
│ Duplicate Check     │  (5-minute window)
│                     │
│ Same:               │
│ - Student Name      │
│ - Parent Name       │
│ - Phone Number      │
│                     │
└──────────┬──────────┘
           │
           ├─ Duplicate Found? ────────────┐
           │ YES                           │
           ▼                               │
    Last Reg < 5min?                       │
           │ YES                           │
           │                               ▼
           │                      Duplicate Error
           │                      (Suggest WhatsApp)
           │
           ▼ NO / Not Found
┌─────────────────────┐
│ Write to CSV File   │
│                     │
│ 1. Create if needed │
│ 2. Add headers      │
│ 3. Append new row   │
│ 4. Add timestamp    │
│                     │
└──────────┬──────────┘
           │
           ├─ Write Failed? ────────────┐
           │                           │
           ▼                           │
    Success? YES                       │
           │                           ▼
           │                    Error Response
           │                    (Technical issue)
           │
           ▼ NO
┌─────────────────────┐
│ Send Success        │
│ Response            │
│                     │
│ { success: true,    │
│   message: "..." }  │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ SUCCESS PAGE        │  (Page 3)
│                     │
│ 🎉 Registration    │
│    Received!        │
│                     │
│ ✓ Confirmation      │
│ ✓ Tournament Info   │
│ ✓ Important Notice  │
│                     │
│ WhatsApp Contact    │
│ Phone Contact       │
│                     │
│ [Register Another]  │
└────────┬────────────┘
         │
         ├──────────────────────────┐
         │                          │
         ▼                          ▼
    Back to Form       (Optional) End
    (Clear & Reset)
         │
         └─────────────────────────────┘
                    │
                    ▼
                  LOOP: Accept More
                  Registrations
                    │
                    └──────────────────────────────┐
                                                   │
                                                   ▼
                                            Keep accepting until
                                            tournament date

END OF REGISTRATION PERIOD
│
└─ Download CSV File from: data/tournament-registrations.csv
   └─ Use for tournament fixture planning and communication
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│                                                         │
│  Form Inputs:                                           │
│  ├─ studentName: "Ahmed Ali"                           │
│  ├─ parentName: "Mohammed Ali"                         │
│  ├─ phoneNumber: "0501234567"                          │
│  ├─ age: "12"                                          │
│  └─ batch: "10:00 AM - 12:00 PM"                       │
│                                                         │
└─────────────┬───────────────────────────────────────────┘
              │
              │ JavaScript Validation
              ▼
    ┌──────────────────────┐
    │ Client-Side Checks   │
    │                      │
    │ ✓ Field not empty    │
    │ ✓ Valid phone format │
    │ ✓ Valid age (5-25)   │
    │ ✓ Batch selected     │
    └──────────┬───────────┘
               │ VALID
               │
               ▼
    ┌──────────────────────┐
    │ Serialize to JSON    │
    │                      │
    │ {                    │
    │   studentName: "...", │
    │   parentName: "...",  │
    │   phoneNumber: "...", │
    │   age: "...",         │
    │   batch: "..."        │
    │ }                     │
    └──────────┬───────────┘
               │
               │ POST /api/register
               ▼
        ┌─────────────────────────────────────────────┐
        │              EXPRESS SERVER                 │
        │                                             │
        │  Request Handler: server.js                │
        │                                             │
        └──────────────┬────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Parse JSON Body                          │
        │ Extract fields                           │
        │                                          │
        │ {                                        │
        │   studentName: "Ahmed Ali"               │
        │   parentName: "Mohammed Ali"             │
        │   phoneNumber: "0501234567"              │
        │   age: "12"                              │
        │   batch: "10:00 AM - 12:00 PM"           │
        │ }                                        │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Server-Side Validation                   │
        │                                          │
        │ Check:                                   │
        │ ✓ studentName not empty                  │
        │ ✓ parentName not empty                   │
        │ ✓ phoneNumber valid regex                │
        │ ✓ age numeric & 5-25                     │
        │ ✓ batch not "Select Batch"               │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │ VALID
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Sanitization                             │
        │                                          │
        │ .trim() all strings                      │
        │ .toLowerCase() for comparison            │
        │ Escape special CSV characters            │
        │ (quotes, commas, newlines)               │
        │                                          │
        │ Result:                                  │
        │ "O'Malley" → "O'Malley"  ✓               │
        │ "Smith, Jr." → "Smith Jr." ✓             │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Duplicate Detection                      │
        │                                          │
        │ Create Key:                              │
        │ "ahmed ali-mohammed ali-0501234567"      │
        │                                          │
        │ Check if in recentRegistrations          │
        │ Check if submitted < 5 minutes ago       │
        │                                          │
        │ If YES: Return error                     │
        │ If NO: Continue                          │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Get Current Date & Time                  │
        │                                          │
        │ registrationDate: "2026-08-14"           │
        │ registrationTime: "10:32 AM"             │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Prepare CSV Row                          │
        │                                          │
        │ "Ahmed Ali,Mohammed Ali,0501234567,...   │
        │  12,10:00 AM - 12:00 PM,2026-08-14,...   │
        │  10:32 AM\n"                             │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Write to File                            │
        │                                          │
        │ Check if data/ exists → Create if not    │
        │ Check if CSV exists → Create if not      │
        │ Append new row to file                   │
        │                                          │
        │ File: data/tournament-registrations.csv  │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │ SUCCESS
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Send Success Response                    │
        │                                          │
        │ {                                        │
        │   "success": true,                       │
        │   "message": "Registration successful",  │
        │   "data": {                              │
        │     "studentName": "Ahmed Ali",          │
        │     "registrationDate": "2026-08-14",    │
        │     "registrationTime": "10:32 AM"       │
        │   }                                      │
        │ }                                        │
        │                                          │
        └──────────────┬───────────────────────────┘
                       │ JSON Response
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│                                                         │
│  Handle Response:                                       │
│  ✓ Success === true                                    │
│  ✓ Show Success Page                                  │
│  ✓ Display student name                               │
│  ✓ Display registration date/time                     │
│                                                         │
│  UI Updates:                                            │
│  ├─ Fade out form                                     │
│  ├─ Fade in success screen                            │
│  ├─ Show checkmark animation                          │
│  ├─ Display confirmation message                      │
│  └─ Show contact options                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## CSV File Structure

```
Input Registration
       │
       ▼
┌──────────────────────────────┐
│ Raw Data                     │
│ {                            │
│  studentName: "Ahmed Ali",   │
│  parentName: "Mohammed Ali", │
│  phoneNumber: "0501234567",  │
│  age: "12",                  │
│  batch: "10:00 AM..."        │
│  timestamp: "2026-08-14 ..." │
│ }                            │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Sanitize for CSV             │
│                              │
│ "O'Malley" → "O'Malley"      │
│ "Smith, Jr" → "Smith, Jr"    │
│ Date as: 2026-08-14          │
│ Time as: 10:32 AM            │
│                              │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Format as CSV Row            │
│                              │
│ Ahmed Ali,Mohammed Ali,      │
│ 0501234567,12,               │
│ 10:00 AM - 12:00 PM,         │
│ 2026-08-14,10:32 AM          │
│                              │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Append to File               │
│                              │
│ File: tournament-...csv      │
│                              │
│ Student Name,Parent Name,... │
│ Ahmed Ali,Mohammed Ali,...   │
│ [New registration appended]  │
│                              │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Saved Registration           │
│                              │
│ Ready to download/analyze    │
│ Persists across restarts     │
│ Can import to Excel/Sheets   │
│                              │
└──────────────────────────────┘
```

---

## Error Handling Flow

```
Error Occurs
     │
     ├─ Client-Side Error (Frontend Validation)
     │  │
     │  ├─ Empty Field
     │  │  └─ Show: "Please enter the student's name."
     │  │
     │  ├─ Invalid Phone
     │  │  └─ Show: "Please enter a valid phone number."
     │  │
     │  ├─ Invalid Age
     │  │  └─ Show: "Please enter a valid age (5-25)."
     │  │
     │  └─ Invalid Batch
     │     └─ Show: "Please select a batch."
     │
     ├─ Server-Side Error (API Response)
     │  │
     │  ├─ 400 Bad Request
     │  │  └─ Same validation messages
     │  │
     │  ├─ 409 Conflict (Duplicate)
     │  │  └─ Show: "It looks like this registration 
     │  │     may have already been submitted..."
     │  │
     │  └─ 500 Server Error
     │     └─ Show: "We couldn't complete your 
     │        registration right now. Please try 
     │        again in a moment..."
     │
     └─ Network Error
        └─ Show: "Connection failed. Please check 
           your internet and try again."

All Errors:
✓ Show friendly message (no technical jargon)
✓ Re-enable submit button
✓ Keep form data for user to retry
✓ Log technical error on server (for debugging)
```

---

## Deployment Architecture Options

```
OPTION 1: LOCAL MACHINE
┌──────────────────────┐
│  Your Computer       │
│                      │
│  ├─ Node.js Server   │
│  ├─ Public Files     │
│  └─ CSV File         │
│                      │
│  Access: localhost   │
│  Share: LAN only     │
│  Uptime: While on    │
│                      │
└──────────────────────┘

OPTION 2: HEROKU
┌──────────────────────┐
│  Heroku Cloud        │
│                      │
│  ├─ Node.js Dyno     │
│  ├─ Public Files     │
│  └─ CSV File*        │
│                      │
│  Access: HTTPS URL   │
│  Share: Worldwide    │
│  Uptime: 24/7**      │
│                      │
│  Cost: Free-$50/mo   │
│  *CSV persists       │
│  **Free tier sleeps  │
│                      │
└──────────────────────┘

OPTION 3: DIGITALOCEAN
┌──────────────────────┐
│ DigitalOcean Droplet │
│                      │
│ ├─ Ubuntu Server     │
│ ├─ Node.js App       │
│ ├─ Nginx Proxy       │
│ ├─ Public Files      │
│ ├─ CSV File          │
│ └─ SSL Certificate   │
│                      │
│ Access: HTTPS URL    │
│ Share: Worldwide     │
│ Uptime: 24/7 99.9%   │
│ Cost: $5-12/mo       │
│                      │
└──────────────────────┘

OPTION 4: AWS/GOOGLE/AZURE
┌──────────────────────┐
│  Cloud Provider      │
│                      │
│  ├─ Load Balancer    │
│  ├─ App Servers      │
│  ├─ Database/Storage │
│  ├─ CDN              │
│  ├─ Auto-scaling     │
│  └─ Backups          │
│                      │
│  Access: HTTPS URL   │
│  Share: Worldwide    │
│  Uptime: 24/7 99.99% │
│  Cost: $20-100+/mo   │
│  Features: Enterprise│
│                      │
└──────────────────────┘
```

---

## File System Structure

```
Summer Camp Website/
│
├── public/                      [Frontend - Served to Browser]
│   ├── index.html               (Landing + Form + Success)
│   ├── styles.css               (Complete styling)
│   ├── script.js                (Form logic & validation)
│   └── images/                  (Your tournament image goes here)
│       └── tournament.jpg        [User to add]
│
├── data/                        [Data Storage]
│   └── tournament-registrations.csv  (Auto-created & appended)
│       └── Headers: Student Name, Parent Name, Phone, Age, Batch, Date, Time
│       └── 1 row per registration
│       └── Never overwritten
│
├── server.js                    [Backend - Node.js/Express]
│   ├── POST /api/register       (Submit registration)
│   ├── GET /api/health          (Health check)
│   └── Serves: public/ folder
│
├── package.json                 [Dependencies]
│   ├── express
│   ├── body-parser
│   └── csv-parser
│
├── .env                         [Environment Config]
│   └── PORT=3000
│
├── .gitignore                   [Git Settings]
│   ├── node_modules/
│   ├── data/*.csv
│   └── .env
│
└── Documentation/
    ├── README.md                (Full reference)
    ├── QUICK_START.md           (Setup guide)
    ├── DEPLOYMENT.md            (Deployment options)
    ├── CONFIGURATION.md         (All settings)
    ├── PROJECT_SUMMARY.md       (Overview)
    └── ARCHITECTURE.md          (This file)
```

---

**All diagrams showing how your Alraed Tournament Registration website works!** ✓
