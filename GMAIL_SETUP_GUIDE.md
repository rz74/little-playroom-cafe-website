# Gmail SMTP Setup Guide

To send emails directly from your website forms, you need to set up Gmail App Password authentication.

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-Step Verification if not already enabled

## Step 2: Generate App Password

1. Go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Click "Generate"
5. Copy the 16-character password that appears

## Step 3: Set Environment Variable

### Option A: Set in Terminal (Temporary)
```bash
export GMAIL_APP_PASSWORD="your_16_character_app_password"
```

### Option B: Create .env file (Recommended)
1. Create a file named `.env` in your project root
2. Add this line:
```
GMAIL_APP_PASSWORD=your_16_character_app_password
```
3. Make sure `.env` is in your `.gitignore` file

### Option C: Set directly in server.js (Not recommended for production)
Replace `process.env.GMAIL_APP_PASSWORD || 'YOUR_APP_PASSWORD'` with your actual app password.

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Start the Server

```bash
npm start
```

## Step 6: Test the Email Service

1. Open your browser to `http://localhost:3000`
2. Fill out any form (contact, reservation, waiver, etc.)
3. Submit the form
4. Check your email at `jiangdl0129@gmail.com`

## Troubleshooting

### "Invalid login" error
- Make sure you're using the App Password, not your regular Gmail password
- Verify 2-Factor Authentication is enabled
- Check that the App Password was generated correctly

### "Less secure app access" error
- This is expected and normal with App Passwords
- App Passwords are designed for this exact use case

### Port already in use
- Change the PORT in server.js or set PORT environment variable
- Kill any existing processes using the port

## Security Notes

- Never commit your App Password to version control
- Use environment variables for sensitive information
- App Passwords are more secure than regular passwords
- You can revoke App Passwords at any time from Google Account settings

## Production Deployment

For production deployment:
1. Use environment variables for all sensitive data
2. Consider using a service like Heroku, Vercel, or Netlify
3. Set up proper SSL/TLS certificates
4. Use environment-specific configuration files
