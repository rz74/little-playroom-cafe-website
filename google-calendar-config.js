// Google Calendar API Configuration
// This file contains the configuration for integrating with Google Calendar

const GOOGLE_CALENDAR_CONFIG = {
    // Google Calendar API credentials
    apiKey: process.env.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY',
    clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    
    // Calendar ID (found in Google Calendar settings)
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    
    // Business hours configuration
    businessHours: {
        monday: { start: '09:00', end: '20:00' },
        tuesday: { start: '09:00', end: '20:00' },
        wednesday: { start: '09:00', end: '20:00' },
        thursday: { start: '09:00', end: '20:00' },
        friday: { start: '09:00', end: '20:00' },
        saturday: { start: '09:00', end: '20:00' },
        sunday: { start: '10:00', end: '18:00' }
    },
    
    // Time slot configuration (3-hour slots)
    timeSlots: [
        { start: '10:00', end: '13:00', label: '10:00 AM - 1:00 PM' },
        { start: '14:00', end: '17:00', label: '2:00 PM - 5:00 PM' },
        { start: '18:00', end: '21:00', label: '6:00 PM - 9:00 PM' }
    ],
    
    // Reservation settings
    reservationSettings: {
        maxReservationsPerDay: 2,
        advanceBookingDays: 14, // Must book at least 2 weeks in advance
        slotDuration: 3, // hours
        bufferTime: 30 // minutes between reservations
    },
    
    // Event creation settings
    eventSettings: {
        eventTitle: 'Little Playroom Cafe - Reservation',
        eventDescription: 'Reservation for play area access',
        location: 'Little Playroom Cafe, 7956 Tree Lane, Madison WI 53717',
        colorId: '4' // Google Calendar color ID (blue)
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_CALENDAR_CONFIG;
} else {
    window.GOOGLE_CALENDAR_CONFIG = GOOGLE_CALENDAR_CONFIG;
} 