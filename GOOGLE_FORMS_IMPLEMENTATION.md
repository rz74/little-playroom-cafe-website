# Google Forms Implementation Guide

## ✅ What's Been Done

1. **Created comprehensive setup guides**:
   - `GOOGLE_FORMS_SETUP.md` - Detailed setup instructions
   - `GOOGLE_FORM_TEMPLATE.md` - HTML templates and examples

2. **Added CSS styling** for Google Form embeds to `styles.css`

3. **Updated contact form** as an example in `pages/contact.html`

## 🎯 Next Steps for You

### Step 1: Create Google Forms

Go to [forms.google.com](https://forms.google.com) and create these 5 forms:

#### 1. Contact Form
**Fields**:
- Name (Short answer, required)
- Email (Email, required)
- Phone (Phone number)
- Subject (Dropdown: General Inquiry, Feedback, Suggestion, Other)
- Message (Paragraph, required)

**Settings**:
- Collect email addresses: ✅
- Response receipts: Always ✅
- Email notifications: Yes ✅

#### 2. Party Booking Form
**Fields**:
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

#### 3. Partnership Form
**Fields**:
- Name (Short answer, required)
- Email (Email, required)
- Phone (Phone number)
- Company/Organization (Short answer)
- Business Description (Paragraph)
- Partnership Type (Dropdown: Event Collaboration, Sponsorship, Community Partnership, Other)
- Investment Capacity (Dropdown: $0-500, $500-1000, $1000-5000, $5000+)
- Proposal (Paragraph)

#### 4. Reservation Form
**Fields**:
- Name (Short answer, required)
- Email (Email, required)
- Phone (Phone number)
- Date (Date, required)
- Time (Time, required)
- Number of Guests (Number)
- Reservation Type (Dropdown: Table, Play Area, Party Space)
- Duration (Dropdown: 1 hour, 2 hours, 3+ hours)
- Special Requests (Paragraph)
- Waiver Agreement (Checkbox)

#### 5. Waiver Form
**Fields**:
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

### Step 2: Get Embed Codes

For each Google Form:
1. Click "Send" button
2. Choose "Embed" tab
3. Copy the iframe code
4. Extract the form ID from the URL

### Step 3: Update HTML Files

Replace the form sections in these files:

- `pages/contact.html` ✅ (Already done as example)
- `pages/party.html` (Party booking form)
- `pages/partnership.html` (Partnership form)
- `pages/reservation.html` (Reservation form)
- `pages/waiver.html` (Waiver form)

### Step 4: Replace Form IDs

In each HTML file, replace:
- `YOUR_CONTACT_FORM_ID` with actual contact form ID
- `YOUR_PARTY_FORM_ID` with actual party form ID
- `YOUR_PARTNERSHIP_FORM_ID` with actual partnership form ID
- `YOUR_RESERVATION_FORM_ID` with actual reservation form ID
- `YOUR_WAIVER_FORM_ID` with actual waiver form ID

### Step 5: Remove JavaScript Form Handlers

Remove or comment out the JavaScript form submission code in each file.

## 📋 Form IDs Template

Once you create your Google Forms, replace these placeholders:

```html
<!-- Contact Form -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_CONTACT_FORM_ID/viewform?embedded=true" ...>

<!-- Party Booking Form -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_PARTY_FORM_ID/viewform?embedded=true" ...>

<!-- Partnership Form -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_PARTNERSHIP_FORM_ID/viewform?embedded=true" ...>

<!-- Reservation Form -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_RESERVATION_FORM_ID/viewform?embedded=true" ...>

<!-- Waiver Form -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_WAIVER_FORM_ID/viewform?embedded=true" ...>
```

## 🎉 Benefits You'll Get

- **Automatic email receipts** for all form submissions
- **No server maintenance** - Google handles everything
- **Responses stored** in Google Sheets automatically
- **Mobile-friendly** forms that work perfectly
- **Built-in validation** and error handling
- **Free service** with your Google account

## 🔧 Testing Checklist

After setting up each form:
- [ ] Form loads correctly on desktop
- [ ] Form loads correctly on mobile
- [ ] All fields display properly
- [ ] Required fields work
- [ ] Submit button works
- [ ] Email receipt is sent to signer
- [ ] Response appears in Google Sheets
- [ ] Owner receives email notification (if enabled)

## 📞 Need Help?

If you need assistance with:
- Creating the Google Forms
- Getting the embed codes
- Updating the HTML files
- Testing the forms

Just let me know and I can help you with any specific step!
