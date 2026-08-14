# Alraed Tournament 2026 - Registration Website

A professional, modern, and fully responsive tournament registration website for Alraed Sports Summer Camp Tournament 2026.

## Features

- 🎨 **Professional Design** - Modern, sports-inspired aesthetic
- 📱 **Mobile-First** - Fully responsive on all devices
- ✅ **Form Validation** - Client-side and server-side validation
- 📊 **CSV Data Collection** - Server-side registration storage
- 🔒 **Security** - Input sanitization and duplicate detection
- ⚡ **Performance** - Lightweight and fast
- ♿ **Accessibility** - Semantic HTML and keyboard navigation
- 🎬 **Animations** - Smooth, professional interactions
- 📱 **WhatsApp Integration** - Direct contact functionality

## Project Structure

```
.
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Complete stylesheet with responsive design
│   ├── script.js           # Frontend JavaScript with form validation
│   └── images/             # Folder for tournament images (placeholder ready)
│
├── data/
│   └── tournament-registrations.csv  # Auto-generated registration data
│
├── server.js               # Express.js backend server
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (included with Node.js)

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server
- `body-parser` - Request body parsing
- `csv-parser` - CSV parsing (included for future extensions)

### 2. Start the Application

```bash
npm start
```

Or for development:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 3. Open in Browser

Navigate to: **http://localhost:3000**

## Configuration

### WhatsApp & Phone Numbers

Edit these values in `public/script.js`:

```javascript
const TOURNAMENT_CONFIG = {
  name: 'Alraed Tournament 2026',
  date: '27 August 2026',
  reportingTime: '10:00 AM',
  whatsappNumber: 'WHATSAPP_NUMBER_HERE',    // ← Change this
  phoneNumber: 'PHONE_NUMBER_HERE'            // ← Change this
};
```

**WhatsApp Format**: Use the full phone number including country code, e.g., `971501234567`

**Phone Format**: Use the number in your preferred format, e.g., `+971 50 123 4567`

### Tournament Image

1. Prepare your tournament image (JPG/PNG, recommended 1000x1200px or similar 4:5 aspect ratio)
2. Place it in: `public/images/tournament.jpg` (or any accessible location)
3. Update the image URL in `public/index.html`:

```html
<img src="public/images/tournament.jpg" alt="Alraed Sports Tournament" class="hero-image">
```

Change only the `src` attribute, everything else stays the same.

## How It Works

### User Flow

1. **Landing Page** - User sees the welcome screen with tournament information and CTA button
2. **Registration Form** - User fills in mandatory fields:
   - Student Name
   - Parent Name
   - Phone Number (WhatsApp)
   - Age
   - Batch Selection
3. **Validation** - Form validates both on the frontend and backend
4. **CSV Storage** - Upon successful submission, data is appended to `data/tournament-registrations.csv`
5. **Success Screen** - User sees confirmation and contact options

### Registration Data Storage

Registrations are saved to: `data/tournament-registrations.csv`

**CSV Format:**
```
Student Name,Parent Name,Phone Number,Age,Batch,Registration Date,Registration Time
Ahmed Ali,Mohammed Ali,0501234567,12,10:00 AM - 12:00 PM,2026-08-14,10:32 AM
Fatima Khan,Sarah Khan,0509876543,11,12:00 PM - 2:00 PM,2026-08-14,11:15 AM
```

- File is created automatically on first submission
- New registrations are appended (never overwritten)
- Timestamps are added automatically

### Duplicate Detection

The system detects duplicate registrations within 5 minutes using:
- Student Name
- Parent Name
- Phone Number

If a duplicate is detected, the user sees a friendly message with option to contact support.

## API Endpoints

### POST /api/register

Submits a tournament registration.

**Request Body:**
```json
{
  "studentName": "Ahmed Ali",
  "parentName": "Mohammed Ali",
  "phoneNumber": "0501234567",
  "age": "12",
  "batch": "10:00 AM - 12:00 PM"
}
```

**Successful Response (200):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "studentName": "Ahmed Ali",
    "registrationDate": "2026-08-14",
    "registrationTime": "10:32 AM"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "message": "Error message",
  "isDuplicate": false
}
```

### GET /api/health

Health check endpoint (returns `{ "status": "OK" }`).

## Testing Checklist

- [x] Landing page loads correctly
- [x] CTA button navigates to registration form
- [x] Form validates all required fields
- [x] Invalid phone numbers are rejected
- [x] Invalid ages (outside 5-25) are rejected
- [x] Cannot submit with empty fields
- [x] Success screen appears after submission
- [x] CSV file is created with headers
- [x] Second registration is appended (not overwritten)
- [x] Duplicate detection works
- [x] WhatsApp button links correctly
- [x] Responsive on mobile (320px+)
- [x] Responsive on tablet (768px+)
- [x] Responsive on desktop (1024px+)
- [x] No console errors
- [x] Animations respect `prefers-reduced-motion`

## Deployment

### Option 1: Vercel (Recommended for simple hosting)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. **Note**: Vercel's serverless functions may have file system limitations. Consider Option 2 for persistent CSV storage.

### Option 2: Heroku (Better for persistent file storage)

1. Create a Heroku account and install Heroku CLI
2. Create a new app: `heroku create your-app-name`
3. Deploy: `git push heroku main`
4. CSV file persists between deployments (on Heroku's file system)

### Option 3: AWS/Azure/Google Cloud

For production, consider:
- **AWS Lambda + S3** - CSV stored in S3 bucket
- **Azure Functions + Blob Storage** - CSV in Azure Blob
- **Google Cloud Functions + Cloud Storage** - CSV in Google Cloud Storage

### Option 4: Traditional Hosting (Recommended for production)

Use hosting like:
- **DigitalOcean** (droplets)
- **Linode**
- **AWS EC2**
- **Hetzner**

On traditional hosting:
1. SSH into your server
2. Clone the repository
3. Run `npm install`
4. Use `pm2` or `systemd` to keep the server running
5. Use Nginx as reverse proxy
6. CSV file persists on the server's file system

### Production Deployment Steps (Traditional Server)

```bash
# On your server
git clone <repository-url>
cd tournament-website
npm install

# For persistent running with PM2
npm install -g pm2
pm2 start server.js --name "alraed-tournament"
pm2 startup
pm2 save

# Configure Nginx (as reverse proxy)
# Create /etc/nginx/sites-available/tournament
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}

# Enable and restart Nginx
sudo ln -s /etc/nginx/sites-available/tournament /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### Accessing CSV in Production

The CSV file is stored at: `/data/tournament-registrations.csv` (relative to project root)

You can download it:
1. Via SCP: `scp user@server:/path/to/project/data/tournament-registrations.csv .`
2. Via SFTP client
3. By setting up a secure admin endpoint (not included by default)

## Customization

### Change Tournament Details

Edit `server.js` and `public/script.js`:
- Tournament name
- Date
- Reporting time
- Batch times (must match form options)

### Change Colors

Edit CSS variables in `public/styles.css`:

```css
:root {
  --primary-color: #0052cc;      /* Deep Blue */
  --accent-color: #ff6b35;       /* Vibrant Orange */
  /* ... other colors */
}
```

### Change Tournament Batches

Edit both:
1. `public/index.html` - Change `<select>` options
2. `public/script.js` - Update validation rules if needed
3. Server-side validation in `server.js` (optional but recommended)

### Add Custom Styling

Add to the end of `public/styles.css` or create a new file and link it in `public/index.html`.

## Security Notes

- ✅ Input validation on both client and server
- ✅ Phone numbers and names are sanitized
- ✅ CSV is NOT publicly accessible
- ✅ Duplicate registration prevention
- ✅ No sensitive data in frontend
- ✅ No user authentication (by design - per requirements)
- ⚠️ In production, consider:
  - Rate limiting (prevent spam)
  - HTTPS only
  - CORS configuration if needed
  - Admin authentication for CSV access

## Troubleshooting

### Port Already in Use

If you get "Port 3000 already in use":

```bash
# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
Stop-Process -Id <PID>

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

Or use a different port:

```bash
PORT=3001 npm start
```

### CSV File Not Found

The CSV file is created automatically on first submission. If it's missing:
1. Check that the `data/` folder exists and is writable
2. Verify the application has write permissions
3. Check server logs for errors

### Form Not Submitting

Check the browser console (F12 > Console) for errors. Common issues:
- Incorrect WhatsApp number format
- Server not running (check `http://localhost:3000` loads)
- Network error (check Network tab in DevTools)

### Images Not Loading

Ensure image paths are correct and files exist in the `public/` directory.

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## File Sizes & Performance

- HTML: ~12 KB
- CSS: ~25 KB
- JavaScript: ~8 KB
- **Total (uncompressed): ~45 KB**
- **Page loads in under 1 second** (on decent connection)

## Future Enhancements (Optional)

- Email notifications to parents
- SMS confirmations
- Payment integration
- Team registration
- Admin dashboard for viewing registrations
- Export to Excel
- QR code for sharing

## Support & Questions

If you have questions about:
- **WhatsApp Integration**: Update the `whatsappNumber` in `public/script.js`
- **Image Replacement**: Update the `src` in `public/index.html`
- **Deployment**: Follow the deployment section above
- **Data Access**: CSV is at `data/tournament-registrations.csv`

## License

MIT License - Free to use and modify

## Version

- **1.0.0** - Initial Release (August 2026)

---

**Built with ❤️ for Alraed Sports**

For professional support or custom modifications, contact development team.
