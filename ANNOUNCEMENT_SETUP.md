# Netlify CMS Announcement Setup Guide

## Overview
The website now uses Netlify CMS (Decap CMS) to manage announcements. This provides a user-friendly admin interface that allows the owner to update announcements without touching any code.

## How to Set Up Netlify CMS

### Step 1: Enable Netlify Identity
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Identity**
3. Click **Enable Identity**
4. Go to **Identity** → **Services** → **Enable Git Gateway**

### Step 2: Invite Users
1. In **Identity** → **Invite users**
2. Enter the owner's email address
3. They will receive an invitation email with a magic link

### Step 3: Access the Admin Panel
1. The owner clicks the invitation link in their email
2. They can then access the admin panel at: `https://yourdomain.com/admin`
3. Recommend adding this to their phone's home screen for easy access

## How to Update Announcements

### Using the Admin Panel:
1. **Login**: Click the invitation link or go to `/admin`
2. **Edit**: Click on "Announcement" → "Site Announcement"
3. **Configure**:
   - **Enabled**: Toggle to show/hide the announcement
   - **Title**: The announcement title
   - **Message**: The announcement text (supports line breaks)
   - **Severity**: Choose the color/style (info, success, warning, error)
   - **Start/End Date**: Optional scheduling (leave empty for immediate)
4. **Publish**: Click "Publish" in the top right
5. **Wait**: Netlify will automatically deploy the changes (1-2 minutes)

### Announcement Types:
- **Info** (Blue): General information
- **Success** (Green): Positive news, confirmations
- **Warning** (Orange): Important notices, temporary changes
- **Error** (Red): Critical issues, closures

## Example Announcements

### Temporary Closure:
```
Title: "Temporary Closure"
Message: "We will be closed for renovations from March 15-20. We apologize for any inconvenience."
Severity: Warning
```

### Special Hours:
```
Title: "Special Holiday Hours"
Message: "This weekend we're open extended hours:\nFriday 9AM-8PM\nSaturday 8AM-9PM!"
Severity: Info
```

### Success Message:
```
Title: "New Menu Items Available!"
Message: "We've added healthy smoothies and organic snacks to our menu. Come try them!"
Severity: Success
```

## Technical Details

### Files Created:
- `/public/admin/index.html` - Admin interface
- `/public/admin/config.yml` - CMS configuration
- `/data/announcement.json` - Announcement data
- `/js/announcement.js` - Frontend loader

### Security:
- Only the `/data/announcement.json` file is editable
- Users cannot access other parts of the codebase
- All changes are version controlled in Git

### Deployment:
- Changes are automatically deployed when published
- No manual code editing required
- Works perfectly with static hosting

## Troubleshooting

### If the admin panel doesn't load:
1. Check that Netlify Identity is enabled
2. Verify Git Gateway is enabled
3. Ensure the user has been invited and accepted

### If announcements don't appear:
1. Check that "Enabled" is set to true
2. Verify the start/end dates (if set)
3. Clear browser cache and refresh

### If changes don't deploy:
1. Check Netlify build logs
2. Verify the GitHub repository connection
3. Ensure the user has proper permissions

## Current Status
The announcement system is currently **disabled** by default. To show an announcement, the owner needs to:
1. Go to `/admin`
2. Enable the announcement
3. Set the title and message
4. Click Publish
