# 🚀 Quick Start Guide

## What's New

Your website forms now send emails **directly** to `jiangdl0129@gmail.com` using Gmail SMTP - no more email clients opening!

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Gmail App Password
1. Follow the detailed guide in `GMAIL_SETUP_GUIDE.md`
2. Create a `.env` file with your App Password:
```
GMAIL_APP_PASSWORD=your_16_character_app_password
```

### 3. Test the Email Service
```bash
./test-email.sh
```

Or manually:
```bash
npm start
```

### 4. Test Forms
1. Open `http://localhost:3000` in your browser
2. Fill out any form (contact, reservation, waiver, party, partnership)
3. Submit the form
4. Check your email at `jiangdl0129@gmail.com`

## How It Works Now

✅ **Direct SMTP Connection** - Forms connect directly to Gmail SMTP  
✅ **No Email Clients** - Emails sent directly to your inbox  
✅ **Real-time Delivery** - Instant email notifications  
✅ **Professional Setup** - Uses proper SMTP authentication  

## Files Changed

- `email-service.js` - Updated to use direct SMTP
- `email-config.js` - Added SMTP configuration
- `server.js` - New Node.js email server
- `package.json` - Added dependencies
- `test-email.sh` - Test script

## Troubleshooting

- **"Invalid login"** → Check your Gmail App Password
- **Port in use** → Change PORT in server.js or kill existing process
- **Dependencies missing** → Run `npm install`

## Next Steps

1. Test all forms work correctly
2. Deploy to your hosting service
3. Set environment variables on your hosting platform
4. Enjoy direct email delivery! 🎉

## Support

If you need help:
1. Check `GMAIL_SETUP_GUIDE.md` for detailed setup
2. Verify your `.env` file is configured
3. Check the server console for error messages
