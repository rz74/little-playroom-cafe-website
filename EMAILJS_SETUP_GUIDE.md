# 🚀 EmailJS Setup Guide - Complete Email Solution

## 🎯 **Overview**
EmailJS is a professional email service that will replace Formspree. It's more reliable, has better deliverability, and provides detailed analytics.

## ⚙️ **Current Configuration**
- **Recipient Email**: `playroommadison@gmail.com`
- **Email Service**: EmailJS (primary) + Fallback (if needed)
- **Self-Sending**: Emails sent from your email to itself

## 🔧 **Step-by-Step Setup**

### **Step 1: Create EmailJS Account**
1. Go to [emailjs.com](https://emailjs.com)
2. Click **"Sign Up"** and create an account
3. Use your email: `playroommadison@gmail.com`
4. Verify your email address

### **Step 2: Create Email Service**
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Connect your Gmail account (`playroommadison@gmail.com`)
5. **Save the Service ID** (you'll need this)

### **Step 3: Create Email Template**
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template structure:

```html
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
To: {{to_email}}

{{message}}

---
Form Type: {{form_type}}
Business: {{business_name}}
Address: {{business_address}}
Phone: {{business_phone}}
```

4. **Save the Template ID** (you'll need this)

### **Step 4: Get Your User ID**
1. In EmailJS dashboard, go to **"Account"** → **"API Keys"**
2. **Copy your Public Key** (User ID)

### **Step 5: Update Configuration**
Edit `email-config.js` and update these values:

```javascript
emailService: {
    serviceId: 'YOUR_ACTUAL_SERVICE_ID',      // From Step 2
    templateId: 'YOUR_ACTUAL_TEMPLATE_ID',    // From Step 3
    userId: 'YOUR_ACTUAL_USER_ID'             // From Step 4
}
```

## 📧 **How It Works**

### **Email Flow:**
```
User submits form → EmailJS processes → Email sent to playroommadison@gmail.com
```

### **Template Variables:**
- `{{subject}}` - Form type (Party, Reservation, etc.)
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{to_email}}` - playroommadison@gmail.com
- `{{message}}` - Complete form content
- `{{form_type}}` - Type of form submitted
- `{{business_name}}` - Little Playroom Cafe
- `{{business_address}}` - 7956 Tree Lane, Madison WI 53717
- `{{business_phone}}` - Your phone number

## 🎨 **Email Content Examples**

### **Waiver Submission Email:**
```
Subject: 📋 Waiver Submission - Little Playroom Cafe

From: John Smith <john@example.com>
To: playroommadison@gmail.com

📋 NEW WAIVER SUBMISSION RECEIVED!

👤 Participant Information:
- Participant Name: Emma Smith
- Age: 5
- Parent/Guardian: John Smith

📞 Contact Information:
- Phone: (555) 123-4567
- Email: john@example.com
- Emergency Contact: Lisa Smith

✅ Agreement Status: WAIVER AGREED TO

📅 Submission Date: 12/20/2024
⏰ Submission Time: 2:30:45 PM

📋 COMPLETE WAIVER CONTENT AGREED TO:

[FULL LEGAL WAIVER TEXT]

---
Form Type: waiver
Business: Little Playroom Cafe
Address: 7956 Tree Lane, Madison WI 53717
Phone: [Your Phone]
```

### **Party Registration Email:**
```
Subject: 🎉 Party Registration - Little Playroom Cafe

From: Sarah Johnson <sarah@example.com>
To: playroommadison@gmail.com

🎉 NEW PARTY REGISTRATION RECEIVED!

📅 Party Details:
- Date: December 25, 2024
- Time: 2:00 PM - 5:00 PM
- Party Type: Birthday Party
- Number of Guests: 15

👤 Customer Information:
- Name: Sarah Johnson
- Email: sarah@example.com
- Phone: (555) 987-6543

🎨 Decoration Package: Premium Package
💰 Add-on Services: Balloon Arch, Photo Booth

📝 Special Requests: Dinosaur theme decorations

---
Form Type: party
Business: Little Playroom Cafe
Address: 7956 Tree Lane, Madison WI 53717
Phone: [Your Phone]
```

## 🚀 **Testing Instructions**

### **1. Local Testing**
1. Start your local server: `python -m http.server 8000`
2. Open any form page
3. Fill out and submit the form
4. Check browser console for EmailJS logs
5. Check your email for notifications

### **2. Production Testing**
1. Deploy your website
2. Submit forms from different devices
3. Verify emails are received
4. Check spam folder if needed

## 📊 **EmailJS Dashboard Features**

### **Analytics:**
- Email delivery rates
- Bounce rates
- Open rates
- Click tracking
- Submission history

### **Monitoring:**
- Real-time delivery status
- Error tracking
- Performance metrics
- Usage statistics

## 💰 **Pricing**
- **Free**: 200 emails/month
- **Paid**: $15/month for unlimited emails
- **Enterprise**: Custom pricing for high volume

## 🔄 **Fallback System**

If EmailJS fails for any reason:
- Users see a popup with email content
- They can copy the information manually
- No data is lost

## 🚨 **Troubleshooting**

### **Common Issues:**

**1. "EmailJS not initialized"**
- Check if User ID is correct
- Verify EmailJS script loaded
- Check browser console for errors

**2. "Service ID not found"**
- Verify Service ID in EmailJS dashboard
- Check if Gmail service is connected
- Ensure service is active

**3. "Template ID not found"**
- Verify Template ID in EmailJS dashboard
- Check template syntax
- Ensure template is published

**4. "Emails not sending"**
- Check Gmail connection
- Verify API keys
- Check monthly limits

### **Debug Mode:**
Open browser console to see:
- EmailJS initialization
- Template parameter building
- Email sending status
- Any errors or warnings

## 🔒 **Security & Privacy**

### **Data Protection:**
- No sensitive data stored on website
- Form data only sent via secure channels
- Email content encrypted in transit
- GDPR compliant

### **Rate Limiting:**
- 200 emails/month (free tier)
- Automatic rate limiting
- Spam protection built-in

## 📞 **Support Resources**

### **EmailJS Documentation:**
- [EmailJS Docs](https://www.emailjs.com/docs)
- [Template Examples](https://www.emailjs.com/docs/examples)
- [API Reference](https://www.emailjs.com/docs/rest-api)

### **Community Support:**
- [EmailJS Community](https://community.emailjs.com)
- [GitHub Issues](https://github.com/emailjs/emailjs-com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/emailjs)

---

## 🎉 **You're All Set!**

Once you complete the EmailJS setup:
1. **All forms will work reliably**
2. **Professional email delivery**
3. **Detailed analytics and monitoring**
4. **No more Formspree issues**

**Next Steps:**
1. Follow the setup guide above
2. Update your configuration
3. Test locally and deploy
4. Monitor your EmailJS dashboard

**Need Help?**
- Check EmailJS documentation
- Verify all IDs are correct
- Test with simple forms first
- Contact EmailJS support if needed

---

**EmailJS is much more reliable than Formspree and will solve all your email issues!** 🚀📧 