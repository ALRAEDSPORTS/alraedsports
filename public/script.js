/* ========================================
   Configuration
   ======================================== */

const TOURNAMENT_CONFIG = {
  name: 'Alraed Tournament 2026',
  date: '27 August 2026',
  reportingTime: '10:00 AM',
  whatsappNumber: '971561792334',
  registrationEndpoint: 'https://script.google.com/macros/s/AKfycbysKKwh8jjoX5kFVs4BzPcqsBzm2IKVF_rmY_X3Zpl-E7F69Tnp6h5DwoVWdO45Ppcz/exec',
  currentPage: 'landing'  // Track current page
};

/* ========================================
   Page Navigation
   ======================================== */

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    TOURNAMENT_CONFIG.currentPage = pageId;
    window.scrollTo(0, 0);
  }
}

function initializePages() {
  showPage('landing');
}

function navigateToRegistration() {
  showPage('registration');
}

function resetForm() {
  const form = document.getElementById('registrationForm');
  if (form) form.reset();

  resetSubmitButton();
  clearAllValidation();
  showPage('registration');
}

function resetSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = false;
  submitBtn.innerHTML = `
    <span class="submit-text">Register for Tournament</span>
    <svg class="submit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>`;
}

/* ========================================
   Form Validation
   ======================================== */

const validationRules = {
  studentName: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    error: 'Please enter the student\'s name.'
  },
  parentName: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    error: 'Please enter the parent\'s name.'
  },
  phoneNumber: {
    validate: (value) => {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
      return phoneRegex.test(value.trim());
    },
    error: 'Please enter a valid phone number.'
  },
  age: {
    validate: (value) => {
      const numAge = parseInt(value);
      return !isNaN(numAge) && numAge >= 5 && numAge <= 25;
    },
    error: 'Please enter a valid age (5-25).'
  },
};

function validateField(fieldName) {
  const field = document.getElementById(fieldName);
  const value = field.value;
  const rule = validationRules[fieldName];
  const errorElement = document.getElementById(`error-${fieldName}`);

  if (!rule.validate(value)) {
    field.classList.remove('success');
    field.classList.add('error');
    errorElement.textContent = rule.error;
    return false;
  } else {
    field.classList.remove('error');
    field.classList.add('success');
    errorElement.textContent = '';
    return true;
  }
}

function validateForm() {
  const fields = Object.keys(validationRules);
  let isValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function clearAllValidation() {
  const fields = Object.keys(validationRules);
  
  fields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`error-${fieldName}`);
    
    field.classList.remove('error', 'success');
    errorElement.textContent = '';
  });

  const formError = document.getElementById('formError');
  formError.classList.remove('show');
  formError.textContent = '';
}

/* ========================================
   Form Events & Real-time Validation
   ======================================== */

function setupFormValidation() {
  const fields = Object.keys(validationRules);

  fields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    
    // Validate on blur
    field.addEventListener('blur', () => {
      validateField(fieldName);
    });

    // Clear error on focus
    field.addEventListener('focus', () => {
      const errorElement = document.getElementById(`error-${fieldName}`);
      errorElement.textContent = '';
    });

    // Real-time validation on input
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(fieldName);
      }
    });

    // Real-time validation on change (for select)
    field.addEventListener('change', () => {
      if (field.classList.contains('error')) {
        validateField(fieldName);
      }
    });
  });
}

/* ========================================
   Form Submission
   ======================================== */

async function handleFormSubmit(e) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    showFormError('Please fill in all required fields correctly.');
    return;
  }

  // Disable submit button
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="submit-text">Submitting Registration...</span>';

  try {
    // Prepare data
    const formData = {
      studentName: document.getElementById('studentName').value.trim(),
      parentName: document.getElementById('parentName').value.trim(),
      phoneNumber: document.getElementById('phoneNumber').value.trim(),
      age: document.getElementById('age').value.trim(),
    };

    // Send registration to the Google Sheets Apps Script web app.
    // no-cors is required because Apps Script does not return CORS headers.
    await fetch(TOURNAMENT_CONFIG.registrationEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    });

    // Show success page after the Apps Script request has been sent.
    resetSubmitButton();
    showPage('success');
    clearAllValidation();
  } catch (error) {
    console.error('Error submitting form:', error);
    showFormError('We couldn\'t complete your registration right now. Please try again in a moment. If the problem continues, contact us on WhatsApp.');
    
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

function showFormError(message) {
  const formError = document.getElementById('formError');
  formError.textContent = message;
  formError.classList.add('show');
  
  // Scroll to error
  formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ========================================
   Initialize Application
   ======================================== */

function initializeApp() {
  // Initialize pages - show landing page first
  initializePages();
  
  // Setup form validation
  setupFormValidation();

  // Setup form submission
  const form = document.getElementById('registrationForm');
  form.addEventListener('submit', handleFormSubmit);

  // Setup WhatsApp contact button
  updateContactButtons();

  // Log startup
  console.log('✓ Alraed Tournament Registration App initialized');
  console.log(`✓ Configuration:`, TOURNAMENT_CONFIG);
}

/* ========================================
   Contact Methods
   ======================================== */

function updateContactButtons() {
  const whatsappBtn = document.getElementById('whatsappBtn');

  // WhatsApp button
  if (TOURNAMENT_CONFIG.whatsappNumber !== 'WHATSAPP_NUMBER_HERE') {
    const whatsappUrl = `https://wa.me/${TOURNAMENT_CONFIG.whatsappNumber}`;
    whatsappBtn.href = whatsappUrl;
  } else {
    whatsappBtn.textContent = 'WhatsApp number not configured';
    whatsappBtn.style.pointerEvents = 'none';
    whatsappBtn.style.opacity = '0.5';
  }

}

/* ========================================
   Utility Functions
   ======================================== */

function isValidPhoneNumber(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

function isValidAge(age) {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= 5 && numAge <= 25;
}

/* ========================================
   Initialize on DOM Ready
   ======================================== */

document.addEventListener('DOMContentLoaded', initializeApp);

// Log when page visibility changes (useful for debugging)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});
