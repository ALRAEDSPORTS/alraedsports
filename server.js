const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CSV_FILE = path.join(DATA_DIR, 'tournament-registrations.csv');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize CSV file with headers if it doesn't exist
if (!fs.existsSync(CSV_FILE)) {
  const headers = 'Student Name,Parent Name,Phone Number,Age,Batch,Registration Date,Registration Time\n';
  fs.writeFileSync(CSV_FILE, headers);
}

// Simple in-memory store for duplicate detection (last 5 minutes)
const recentRegistrations = {};

// Utility: Generate CSV row
function generateCSVRow(data) {
  return [
    escapeCSV(data.studentName),
    escapeCSV(data.parentName),
    escapeCSV(data.phoneNumber),
    data.age,
    escapeCSV(data.batch),
    data.registrationDate,
    data.registrationTime
  ].join(',') + '\n';
}

// Utility: Escape CSV special characters
function escapeCSV(str) {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Utility: Validate phone number (basic check)
function isValidPhoneNumber(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

// Utility: Validate age
function isValidAge(age) {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= 5 && numAge <= 25;
}

// Utility: Create duplicate key
function createDuplicateKey(studentName, parentName, phoneNumber) {
  return `${studentName.toLowerCase().trim()}-${parentName.toLowerCase().trim()}-${phoneNumber.trim()}`;
}

// API endpoint for registration
app.post('/api/register', (req, res) => {
  const { studentName, parentName, phoneNumber, age, batch } = req.body;

  // Validation
  if (!studentName || !studentName.trim()) {
    return res.status(400).json({ success: false, message: 'Student name is required' });
  }

  if (!parentName || !parentName.trim()) {
    return res.status(400).json({ success: false, message: 'Parent name is required' });
  }

  if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Valid phone number is required' });
  }

  if (!isValidAge(age)) {
    return res.status(400).json({ success: false, message: 'Valid age (5-25) is required' });
  }

  if (!batch || batch === 'Select Batch') {
    return res.status(400).json({ success: false, message: 'Please select a batch' });
  }

  // Check for duplicate registration within last 5 minutes
  const dupKey = createDuplicateKey(studentName, parentName, phoneNumber);
  const now = Date.now();

  if (recentRegistrations[dupKey]) {
    const timeSinceLastReg = now - recentRegistrations[dupKey];
    if (timeSinceLastReg < 5 * 60 * 1000) { // 5 minutes
      return res.status(409).json({
        success: false,
        isDuplicate: true,
        message: 'It looks like this registration may have already been submitted. If you believe this is an error, please contact us on WhatsApp.'
      });
    }
  }

  // Update duplicate tracker
  recentRegistrations[dupKey] = now;

  // Get current date and time
  const now_date = new Date();
  const registrationDate = now_date.toISOString().split('T')[0]; // YYYY-MM-DD
  const registrationTime = now_date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Prepare data for CSV
  const registrationData = {
    studentName: studentName.trim(),
    parentName: parentName.trim(),
    phoneNumber: phoneNumber.trim(),
    age: age.trim(),
    batch: batch.trim(),
    registrationDate,
    registrationTime
  };

  // Append to CSV file
  const csvRow = generateCSVRow(registrationData);

  fs.appendFile(CSV_FILE, csvRow, (err) => {
    if (err) {
      console.error('Error writing to CSV:', err);
      return res.status(500).json({
        success: false,
        message: 'We couldn\'t complete your registration right now. Please try again in a moment. If the problem continues, contact us on WhatsApp.'
      });
    }

    // Success response
    res.json({
      success: true,
      message: 'Registration successful',
      data: {
        studentName: registrationData.studentName,
        registrationDate: registrationData.registrationDate,
        registrationTime: registrationData.registrationTime
      }
    });
  });
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Alraed Tournament Registration Server running on http://localhost:${PORT}`);
  console.log(`✓ Registrations will be saved to: ${CSV_FILE}`);
});
