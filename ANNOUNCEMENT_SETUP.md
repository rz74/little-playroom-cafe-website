# Announcement Feature Setup Guide

## How to Use the Customizable Announcement Feature

The website now includes a customizable announcement section that allows the owner to display important messages on the home page.

### To Set Up an Announcement:

1. **Access Admin Controls**: Add `?admin=true` to the end of your home page URL
   - Example: `https://yourwebsite.com/index.html?admin=true`

2. **Configure Your Announcement**:
   - **Title**: Enter a short title for your announcement (e.g., "Important Notice", "Holiday Hours", etc.)
   - **Message**: Enter your announcement message (e.g., "Currently closed for maintenance", "Special holiday hours", etc.)
   - **Show/Hide**: Check the box to show the announcement, uncheck to hide it

3. **Save Your Changes**: Click the "Save" button to apply your announcement

4. **Clear Announcement**: Use the "Clear" button to remove the announcement completely

### Examples of Announcements:

- **Maintenance**: "Currently closed for maintenance. We apologize for any inconvenience."
- **Holiday Hours**: "Special holiday hours: Open 10 AM - 6 PM on Christmas Eve"
- **Weather**: "Closed today due to inclement weather. Stay safe!"
- **Special Event**: "Join us this Saturday for our special story time event!"

### Features:

- ✅ **Persistent**: Announcements are saved and will appear every time someone visits the home page
- ✅ **Easy to Update**: Simply access the admin controls to change or remove announcements
- ✅ **Responsive**: Works on all devices (desktop, tablet, mobile)
- ✅ **Professional Design**: Matches the website's design with a red gradient background and animated icon

### Security Note:

The admin controls are only visible when you add `?admin=true` to the URL. Regular visitors will not see these controls.

### Technical Details:

- Announcements are stored in the browser's localStorage
- The announcement section appears between the hero section and quick navigation
- The feature includes a pulsing bullhorn icon for attention
- Mobile-responsive design with appropriate text sizing
