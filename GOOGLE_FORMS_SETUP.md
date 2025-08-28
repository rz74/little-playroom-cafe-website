# Google Forms Setup Guide

## Overview
Replace all email-based form submissions with Google Forms that provide automatic response receipts.

## Benefits
- ✅ Automatic email receipts for signers
- ✅ No server-side email handling needed
- ✅ Responses stored in Google Sheets
- ✅ Built-in form validation
- ✅ Mobile-friendly
- ✅ No maintenance required

## Required Google Form Settings

For each Google Form, enable these settings:

1. **"Collect email addresses"** ✅
2. **"Response receipts (Always)"** ✅
3. **"Get email notifications for new responses"** ✅ (optional)

This creates the workflow:
- Signer fills out form → gets automatic email receipt
- Owner gets responses in Google Sheets + optional email notifications
- Both parties keep records automatically

## Forms to Create

### 1. Contact Form
**Purpose**: General inquiries and feedback

**Fields needed**:
- Name (Short answer)
- Email (Email)
- Phone (Phone number)
- Subject (Dropdown: General Inquiry, Feedback, Suggestion, Other)
- Message (Paragraph)

**Settings**:
- Collect email addresses: Yes
- Response receipts: Always
- Email notifications: Yes

### 2. Party Booking Form
**Purpose**: Birthday party and decoration bookings

**Fields needed**:
- Parent Name (Short answer)
- Email (Email)
- Phone (Phone number)
- Child Name (Short answer)
- Child Age (Number)
- Party Date (Date)
- Party Time (Time)
- Party Package (Dropdown: Basic, Deluxe, Premium)
- Number of Guests (Number)
- Special Requests (Paragraph)

**Settings**:
- Collect email addresses: Yes
- Response receipts: Always
- Email notifications: Yes

### 3. Partnership Form
**Purpose**: Business partnership inquiries

**Fields needed**:
- Name (Short answer)
- Email (Email)
- Phone (Phone number)
- Company/Organization (Short answer)
- Business Description (Paragraph)
- Partnership Type (Dropdown: Event Collaboration, Sponsorship, Community Partnership, Other)
- Investment Capacity (Dropdown: $0-500, $500-1000, $1000-5000, $5000+)
- Proposal (Paragraph)

**Settings**:
- Collect email addresses: Yes
- Response receipts: Always
- Email notifications: Yes

### 4. Reservation Form
**Purpose**: Table and space reservations

**Fields needed**:
- Name (Short answer)
- Email (Email)
- Phone (Phone number)
- Date (Date)
- Time (Time)
- Number of Guests (Number)
- Reservation Type (Dropdown: Table, Play Area, Party Space)
- Duration (Dropdown: 1 hour, 2 hours, 3+ hours)
- Special Requests (Paragraph)
- Waiver Agreement (Checkbox)

**Settings**:
- Collect email addresses: Yes
- Response receipts: Always
- Email notifications: Yes

### 5. Waiver Form
**Purpose**: Legal waiver for play area access

**Fields needed**:
- Participant Name (Short answer)
- Date of Birth (Date)
- Parent/Guardian Name (Short answer)
- Email (Email)
- Phone (Phone number)
- Emergency Contact Name (Short answer)
- Emergency Contact Phone (Phone number)
- Medical Conditions (Paragraph)
- Waiver Agreement (Checkbox - required)
- Photo Consent (Checkbox)

**Settings**:
- Collect email addresses: Yes
- Response receipts: Always
- Email notifications: Yes

## Implementation Steps

1. **Create Google Forms** for each form type above
2. **Get embed codes** from each form
3. **Update HTML files** to use embedded forms
4. **Test all forms** to ensure they work correctly
5. **Update any remaining email references**

## Form Templates

### Contact Form Template
```
https://forms.google.com/your-contact-form-id
```

### Party Booking Template
```
https://forms.google.com/your-party-form-id
```

### Partnership Template
```
https://forms.google.com/your-partnership-form-id
```

### Reservation Template
```
https://forms.google.com/your-reservation-form-id
```

### Waiver Template
```
https://forms.google.com/your-waiver-form-id
```

## Testing Checklist

- [ ] Form loads correctly on desktop
- [ ] Form loads correctly on mobile
- [ ] All required fields work
- [ ] Email receipt is sent to signer
- [ ] Owner receives response in Google Sheets
- [ ] Optional: Owner receives email notification
- [ ] Form validation works
- [ ] Submit button works correctly

## Notes

- Google Forms automatically handle email validation
- Response receipts include all form data
- Google Sheets provide easy data export options
- Forms are automatically mobile-responsive
- No server maintenance required
- Free with Google account
