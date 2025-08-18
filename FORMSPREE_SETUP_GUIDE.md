# 🚀 Quick Fix: Formspree Setup Guide

## 🚨 **The Problem**
Your website is trying to send emails to `/api/send-email` which doesn't exist on static hosting. This causes a 404 error.

## ✅ **The Solution**
Use Formspree - a free service that handles form submissions for static websites.

## 🔧 **Step-by-Step Setup**

### **Step 1: Create Formspree Account**
1. Go to [formspree.io](https://formspree.io)
2. Click "Sign Up" and create an account
3. Use your email: `playroommadison@gmail.com`

### **Step 2: Create a New Form**
1. In your Formspree dashboard, click "New Form"
2. Name it: "Little Playroom Cafe Forms"
3. Copy the form ID (looks like: `xrgjqkqw`)

### **Step 3: Update Your Code**
1. Open `email-service.js`
2. Find this line (around line 58):
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/xrgjqkqw';
   ```
3. Replace `xrgjqkqw` with your actual form ID

### **Step 4: Test**
1. Submit any form on your website
2. Check your email (`playroommadison@gmail.com`)
3. You should receive the form data

## 📧 **How It Works**

**Before (Broken):**
```
Form → /api/send-email (404 Error) → Fail
```

**After (Working):**
```
Form → Formspree → Email to playroommadison@gmail.com → Success
```

## 🎯 **What You'll Receive**

Formspree will send you emails with:
- **Subject**: Form type (Party, Reservation, Contact, etc.)
- **From**: The person who submitted the form
- **To**: playroommadison@gmail.com
- **Content**: All form data in a nice format

## 🔄 **Fallback System**

If Formspree fails for any reason:
- Users see a popup with the email content
- They can copy the information manually
- No data is lost

## 💰 **Cost**
- **Free**: 50 submissions per month
- **Paid**: $8/month for unlimited submissions

## 🚀 **Deploy**
After updating the form ID:
1. Save all files
2. Upload to your hosting
3. Test the forms

## 📞 **Need Help?**
- Check Formspree dashboard for submission history
- Verify form ID is correct
- Check spam folder for emails

---

**This will fix your 404 error and get emails working immediately!** 🎉 