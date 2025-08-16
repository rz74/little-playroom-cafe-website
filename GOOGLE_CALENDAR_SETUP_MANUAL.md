# 🗓️ Google Calendar Integration Setup Manual

## 📋 Overview

This manual will guide you through setting up Google Calendar integration with your Little Playroom Cafe reservation system. Once configured, the system will:

- ✅ **Sync with your Google Calendar** - Check real-time availability
- ✅ **Create events automatically** - When reservations are made
- ✅ **Update availability** - Based on your calendar events
- ✅ **Default to available** - All time slots are available unless blocked
- ✅ **Real-time updates** - Changes in your calendar reflect immediately

## 🚀 Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name: `Little Playroom Cafe Reservations`
4. Click **"Create"**

### 1.2 Enable Google Calendar API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"Enable"**

### 1.3 Create Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
3. Choose **"Web application"**
4. Set application name: `Little Playroom Cafe Web App`
5. Add authorized JavaScript origins:
   - `http://localhost:8000` (for testing)
   - `https://yourdomain.com` (your actual domain)
6. Click **"Create"**
7. **Save the Client ID and Client Secret** (you'll need these)

### 1.4 Create API Key

1. In **"Credentials"**, click **"Create Credentials"** → **"API Key"**
2. **Save the API Key** (you'll need this)

## 🔐 Step 2: Configure Your Website

### 2.1 Update Configuration File

Edit `google-calendar-config.js` and replace the placeholder values:

```javascript
const GOOGLE_CALENDAR_CONFIG = {
    apiKey: 'YOUR_ACTUAL_API_KEY_HERE',
    clientId: 'YOUR_ACTUAL_CLIENT_ID_HERE',
    clientSecret: 'YOUR_ACTUAL_CLIENT_SECRET_HERE',
    calendarId: 'primary', // or your specific calendar ID
    // ... rest of config remains the same
};
```

### 2.2 Find Your Calendar ID

1. Go to [Google Calendar](https://calendar.google.com/)
2. Click the **three dots** next to your calendar name
3. Select **"Settings and sharing"**
4. Scroll down to **"Integrate calendar"**
5. Copy the **"Calendar ID"** (usually your email address)

## 🌐 Step 3: Deploy and Test

### 3.1 Local Testing

1. Start your local server: `python -m http.server 8000`
2. Open `http://localhost:8000/reservation.html`
3. Check browser console for any errors
4. Test calendar functionality

### 3.2 Production Deployment

1. Upload all files to your web server
2. Ensure your domain is added to authorized origins in Google Cloud Console
3. Test the reservation system on your live site

## 📱 Step 4: Using the System

### 4.1 How It Works

**Default State:**
- All time slots are **available by default**
- System assumes you're open for business during configured hours

**When Reservations Are Made:**
- Customer selects date and time
- System creates event in your Google Calendar
- Time slot becomes **unavailable** for future bookings

**Manual Calendar Updates:**
- If you add/remove events in Google Calendar
- Refresh the reservation page to sync changes
- System will reflect your manual updates

### 4.2 Business Hours Configuration

The system uses these default business hours:

```javascript
businessHours: {
    monday: { start: '09:00', end: '20:00' },
    tuesday: { start: '09:00', end: '20:00' },
    wednesday: { start: '09:00', end: '20:00' },
    thursday: { start: '09:00', end: '20:00' },
    friday: { start: '09:00', end: '20:00' },
    saturday: { start: '09:00', end: '20:00' },
    sunday: { start: '10:00', end: '18:00' }
}
```

**To modify business hours:**
1. Edit `google-calendar-config.js`
2. Update the `businessHours` object
3. Refresh your website

### 4.3 Time Slot Configuration

Default 3-hour time slots:

```javascript
timeSlots: [
    { start: '10:00', end: '13:00', label: '10:00 AM - 1:00 PM' },
    { start: '14:00', end: '17:00', label: '2:00 PM - 5:00 PM' },
    { start: '18:00', end: '21:00', label: '6:00 PM - 9:00 PM' }
]
```

**To modify time slots:**
1. Edit `google-calendar-config.js`
2. Update the `timeSlots` array
3. Refresh your website

## 🔧 Step 5: Advanced Configuration

### 5.1 Reservation Settings

```javascript
reservationSettings: {
    maxReservationsPerDay: 2,        // Maximum bookings per day
    advanceBookingDays: 14,          // Must book 2+ weeks ahead
    slotDuration: 3,                 // Hours per slot
    bufferTime: 30                   // Minutes between reservations
}
```

### 5.2 Event Customization

```javascript
eventSettings: {
    eventTitle: 'Little Playroom Cafe - Reservation',
    eventDescription: 'Reservation for play area access',
    location: 'Little Playroom Cafe, 7956 Tree Lane, Madison WI 53717',
    colorId: '4'                     // Google Calendar color (blue)
}
```

**Available Colors:**
- `1` - Lavender
- `2` - Sage
- `3` - Grape
- `4` - Flamingo (Blue)
- `5` - Banana
- `6` - Tangerine
- `7` - Peacock
- `8` - Graphite
- `9` - Blueberry
- `10` - Basil
- `11` - Tomato

## 🚨 Troubleshooting

### Common Issues

**1. "User not authenticated" Error**
- Check if Google API is loaded properly
- Verify your API credentials are correct
- Ensure you're on an authorized domain

**2. Calendar Not Loading**
- Check browser console for errors
- Verify API key and client ID are correct
- Check if Google Calendar API is enabled

**3. Events Not Creating**
- Verify calendar ID is correct
- Check if you have write permissions to the calendar
- Ensure OAuth scope includes calendar write access

**4. Availability Not Syncing**
- Refresh the page to reload availability
- Check if there are any API rate limits
- Verify calendar events are properly formatted

### Debug Mode

Enable debug logging by checking the browser console. The system logs:
- API initialization status
- Authentication status
- Calendar loading progress
- Event creation/deletion status

## 📞 Support

If you encounter issues:

1. **Check browser console** for error messages
2. **Verify API credentials** are correct
3. **Test with a simple calendar** first
4. **Check Google Cloud Console** for API quotas and errors

## 🔒 Security Notes

- **Never share your API keys** publicly
- **Use environment variables** in production
- **Restrict API access** to your domain only
- **Monitor API usage** in Google Cloud Console
- **Regularly rotate credentials** for security

## 📈 Monitoring and Analytics

### Google Cloud Console
- Monitor API usage and quotas
- View authentication logs
- Track API performance

### Calendar Integration
- Check reservation events in your Google Calendar
- Monitor booking patterns
- Track availability changes

---

**🎉 Congratulations!** Your reservation system is now fully integrated with Google Calendar!

**Next Steps:**
1. Test the system thoroughly
2. Customize business hours and time slots
3. Set up monitoring and alerts
4. Train staff on the new system
5. Go live with your customers! 