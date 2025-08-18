# 🚀 Static Website Email Setup Guide

## 🎯 **Overview**
This guide shows you how to set up email functionality for your static website using serverless functions and free services that work without a backend server.

## ⚙️ **Current Configuration**
- **Recipient Email**: `playroommadison@gmail.com`
- **Email Service**: Multiple options for static websites
- **Self-Sending**: Emails sent from your email to itself

## 🔧 **Option 1: Web3Forms (Easiest - Free)**

### **Step 1: Get Web3Forms Access Key**
1. Go to [web3forms.com](https://web3forms.com/)
2. Click **"Get Access Key"**
3. Enter your email: `playroommadison@gmail.com`
4. **Copy the access key** (looks like: `12345678-1234-1234-1234-123456789abc`)

### **Step 2: Update Configuration**
Edit `email-config.js`:
```javascript
web3forms: {
    accessKey: 'YOUR_ACTUAL_ACCESS_KEY' // Replace with your key
}
```

### **Step 3: Test**
1. Submit any form on your website
2. Check your email for notifications
3. No additional setup needed!

**✅ Pros:**
- Completely free
- No setup required
- Works immediately
- 250 submissions/month free

**❌ Cons:**
- Limited to 250 submissions/month
- Basic email formatting

## 🔧 **Option 2: Netlify Functions (If on Netlify)**

### **Step 1: Create Netlify Function**
Create file: `netlify/functions/send-email.js`

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { to, from, subject, content, formType, formData } = JSON.parse(event.body);

        // Create transporter
        const transporter = nodemailer.createTransporter({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'playroommadison@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Send email
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: content,
            html: content.replace(/\n/g, '<br>')
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

### **Step 2: Install Dependencies**
Create `package.json`:
```json
{
  "dependencies": {
    "nodemailer": "^6.9.0"
  }
}
```

### **Step 3: Set Environment Variables**
In Netlify dashboard:
- Go to **Site Settings** → **Environment Variables**
- Add: `GMAIL_APP_PASSWORD` = Your Gmail App Password

### **Step 4: Deploy**
1. Push to your Git repository
2. Netlify will automatically deploy the function
3. Test your forms

## 🔧 **Option 3: Vercel Functions (If on Vercel)**

### **Step 1: Create Vercel Function**
Create file: `api/send-email.js`

```javascript
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { to, from, subject, content, formType, formData } = req.body;

        // Create transporter
        const transporter = nodemailer.createTransporter({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'playroommadison@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Send email
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: content,
            html: content.replace(/\n/g, '<br>')
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

### **Step 2: Install Dependencies**
Create `package.json`:
```json
{
  "dependencies": {
    "nodemailer": "^6.9.0"
  }
}
```

### **Step 3: Set Environment Variables**
In Vercel dashboard:
- Go to **Project Settings** → **Environment Variables**
- Add: `GMAIL_APP_PASSWORD` = Your Gmail App Password

### **Step 4: Deploy**
1. Push to your Git repository
2. Vercel will automatically deploy the function
3. Test your forms

## 🔧 **Option 4: Gmail App Password Setup**

### **Step 1: Enable 2-Factor Authentication**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification**
3. This is required for App Passwords

### **Step 2: Generate App Password**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"App passwords"**
3. Select **"Mail"** and **"Other (Custom name)"**
4. Name it: "Little Playroom Cafe"
5. **Copy the 16-character password**

### **Step 3: Use in Serverless Functions**
Add the App Password to your environment variables:
- **Netlify**: `GMAIL_APP_PASSWORD`
- **Vercel**: `GMAIL_APP_PASSWORD`

## 🚀 **Recommended Setup Order**

### **For Quick Start:**
1. **Use Web3Forms** (Option 1) - Works immediately
2. **Get access key** and update configuration
3. **Test forms** - Should work right away

### **For Professional Setup:**
1. **Choose your hosting platform** (Netlify/Vercel)
2. **Set up serverless functions** (Option 2 or 3)
3. **Configure Gmail App Password** (Option 4)
4. **Deploy and test**

## 📧 **How It Works**

### **Web3Forms Flow:**
```
User submits form → Web3Forms API → Email sent to playroommadison@gmail.com
```

### **Serverless Functions Flow:**
```
User submits form → Serverless function → SMTP → Email sent to playroommadison@gmail.com
```

## 🎨 **Email Content Examples**

### **Waiver Submission:**
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
```

## 🧪 **Testing Instructions**

### **1. Web3Forms Testing:**
1. Get access key from web3forms.com
2. Update `email-config.js`
3. Submit any form
4. Check email for notification

### **2. Serverless Functions Testing:**
1. Set up function files
2. Configure environment variables
3. Deploy to hosting platform
4. Submit forms and check email

### **3. Debug Mode:**
Open browser console to see:
- Email service initialization
- Form data processing
- Email sending status
- Any errors or warnings

## 💰 **Pricing Comparison**

### **Web3Forms:**
- **Free**: 250 submissions/month
- **Paid**: $10/month for unlimited

### **Netlify Functions:**
- **Free**: 125,000 requests/month
- **Paid**: $25/month for additional

### **Vercel Functions:**
- **Free**: 100,000 requests/month
- **Paid**: $20/month for additional

## 🔒 **Security & Privacy**

### **Data Protection:**
- No sensitive data stored on website
- Form data only sent via secure channels
- Email content encrypted in transit
- GDPR compliant

### **Environment Variables:**
- App passwords stored securely
- Not exposed in client-side code
- Platform-specific security

## 🚨 **Troubleshooting**

### **Common Issues:**

**1. "Web3Forms access key not working"**
- Verify access key is correct
- Check monthly submission limit
- Try regenerating access key

**2. "Serverless function not found"**
- Check function file path
- Verify deployment was successful
- Check hosting platform logs

**3. "Gmail authentication failed"**
- Verify App Password is correct
- Check 2-Factor Authentication is enabled
- Try generating new App Password

**4. "Environment variables not working"**
- Check variable names match exactly
- Redeploy after adding variables
- Verify hosting platform settings

## 📞 **Support Resources**

### **Web3Forms:**
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Web3Forms Support](https://web3forms.com/support)

### **Netlify:**
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify Support](https://www.netlify.com/support/)

### **Vercel:**
- [Vercel Functions Docs](https://vercel.com/docs/functions)
- [Vercel Support](https://vercel.com/support)

---

## 🎉 **Recommended Solution**

**For your static website, I recommend:**

1. **Start with Web3Forms** - Quick and easy setup
2. **Get access key** and update configuration
3. **Test immediately** - Should work right away
4. **Upgrade later** if you need more features

**Web3Forms is perfect for static websites and requires no backend setup!** 🚀📧 