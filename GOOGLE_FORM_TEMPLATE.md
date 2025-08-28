# Google Form Embed Template

## How to Replace HTML Forms with Google Forms

### Step 1: Create Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Create new form with required fields
3. Enable settings:
   - Collect email addresses: ✅
   - Response receipts: Always ✅
   - Email notifications: Yes ✅

### Step 2: Get Embed Code
1. In Google Form, click "Send" button
2. Choose "Embed" tab
3. Copy the iframe code

### Step 3: Replace HTML Form

**BEFORE (Current HTML Form)**:
```html
<!-- Contact Form -->
<div class="contact-form-section">
    <h2>Send us a Message</h2>
    <form class="contact-form">
        <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone">
        </div>
        
        <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" name="subject">
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="birthday-party">Birthday Party Booking</option>
                <option value="menu">Menu Questions</option>
                <option value="hours">Hours & Pricing</option>
                <option value="feedback">Feedback</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Send Message</button>
    </form>
</div>
```

**AFTER (Google Form Embed)**:
```html
<!-- Contact Form -->
<div class="contact-form-section">
    <h2>Send us a Message</h2>
    
    <!-- Google Form Embed -->
    <div class="google-form-container">
        <iframe 
            src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
            width="100%" 
            height="800" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">
            Loading…
        </iframe>
    </div>
    
    <div class="form-note">
        <p><strong>Note:</strong> After submitting this form, you will receive an automatic email confirmation with your responses.</p>
    </div>
</div>
```

### Step 4: Add CSS for Google Form Styling

Add this CSS to your `styles.css`:

```css
/* Google Form Embed Styling */
.google-form-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    background: var(--bg-primary);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px var(--shadow-dark);
}

.google-form-container iframe {
    width: 100%;
    height: 800px;
    border: none;
    border-radius: 12px;
}

.form-note {
    text-align: center;
    margin-top: 20px;
    padding: 15px;
    background: var(--bg-accent);
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.form-note p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .google-form-container iframe {
        height: 600px;
    }
    
    .form-note {
        margin: 15px;
        padding: 12px;
    }
}
```

### Step 5: Remove JavaScript Form Handlers

Remove or comment out the JavaScript form submission code:

```javascript
// REMOVE THIS SECTION
/*
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // ... form handling code
    });
}
*/
```

## Form-Specific Templates

### Contact Form
**Google Form Fields**:
- Name (Short answer, required)
- Email (Email, required) 
- Phone (Phone number)
- Subject (Dropdown: General Inquiry, Feedback, Suggestion, Other)
- Message (Paragraph, required)

### Party Booking Form
**Google Form Fields**:
- Parent Name (Short answer, required)
- Email (Email, required)
- Phone (Phone number)
- Child Name (Short answer, required)
- Child Age (Number)
- Party Date (Date, required)
- Party Time (Time, required)
- Party Package (Dropdown: Basic, Deluxe, Premium)
- Number of Guests (Number)
- Special Requests (Paragraph)

### Waiver Form
**Google Form Fields**:
- Participant Name (Short answer, required)
- Date of Birth (Date, required)
- Parent/Guardian Name (Short answer, required)
- Email (Email, required)
- Phone (Phone number)
- Emergency Contact Name (Short answer, required)
- Emergency Contact Phone (Phone number, required)
- Medical Conditions (Paragraph)
- Waiver Agreement (Checkbox, required)
- Photo Consent (Checkbox)

## Benefits of This Approach

1. **Automatic Email Receipts**: Signers get instant confirmation
2. **No Server Setup**: Google handles everything
3. **Data Storage**: Responses automatically go to Google Sheets
4. **Mobile Friendly**: Forms work perfectly on all devices
5. **Validation**: Built-in form validation
6. **Analytics**: Google provides form analytics
7. **No Maintenance**: Set it and forget it

## Testing Checklist

- [ ] Form loads correctly
- [ ] All fields display properly
- [ ] Required fields work
- [ ] Submit button works
- [ ] Email receipt is sent
- [ ] Response appears in Google Sheets
- [ ] Form looks good on mobile
- [ ] Form looks good on desktop
