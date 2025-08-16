// Google Calendar Service
// Handles all Google Calendar API operations

class GoogleCalendarService {
    constructor() {
        this.config = window.GOOGLE_CALENDAR_CONFIG;
        this.accessToken = null;
        this.isAuthenticated = false;
        this.init();
    }
    
    async init() {
        try {
            // Load Google API client
            await this.loadGoogleAPI();
            // Check if user is already authenticated
            await this.checkAuthStatus();
        } catch (error) {
            console.error('Failed to initialize Google Calendar service:', error);
        }
    }
    
    async loadGoogleAPI() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                window.gapi.load('client:auth2', () => {
                    window.gapi.client.init({
                        apiKey: this.config.apiKey,
                        clientId: this.config.clientId,
                        scope: 'https://www.googleapis.com/auth/calendar',
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
                    }).then(() => {
                        resolve();
                    }).catch(reject);
                });
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    async checkAuthStatus() {
        try {
            const authInstance = window.gapi.auth2.getAuthInstance();
            this.isAuthenticated = authInstance.isSignedIn.get();
            
            if (this.isAuthenticated) {
                this.accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
                console.log('User is already authenticated');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    }
    
    async authenticate() {
        try {
            const authInstance = window.gapi.auth2.getAuthInstance();
            const user = await authInstance.signIn();
            this.accessToken = user.getAuthResponse().access_token;
            this.isAuthenticated = true;
            console.log('User authenticated successfully');
            return true;
        } catch (error) {
            console.error('Authentication failed:', error);
            return false;
        }
    }
    
    async signOut() {
        try {
            const authInstance = window.gapi.auth2.getAuthInstance();
            await authInstance.signOut();
            this.isAuthenticated = false;
            this.accessToken = null;
            console.log('User signed out');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }
    
    async getCalendarAvailability(startDate, endDate) {
        if (!this.isAuthenticated) {
            throw new Error('User not authenticated');
        }
        
        try {
            const response = await window.gapi.client.calendar.events.list({
                calendarId: this.config.calendarId,
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            });
            
            return this.processCalendarEvents(response.result.items, startDate, endDate);
        } catch (error) {
            console.error('Failed to get calendar availability:', error);
            throw error;
        }
    }
    
    processCalendarEvents(events, startDate, endDate) {
        const availability = {};
        const currentDate = new Date(startDate);
        
        // Initialize all dates as available
        while (currentDate <= endDate) {
            const dateKey = this.formatDateKey(currentDate);
            availability[dateKey] = this.getDefaultAvailability();
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Process existing events
        events.forEach(event => {
            const eventStart = new Date(event.start.dateTime || event.start.date);
            const eventEnd = new Date(event.end.dateTime || event.end.date);
            const dateKey = this.formatDateKey(eventStart);
            
            if (availability[dateKey]) {
                // Mark time slots as unavailable based on event times
                this.markTimeSlotUnavailable(availability[dateKey], eventStart, eventEnd);
            }
        });
        
        return availability;
    }
    
    getDefaultAvailability() {
        const availability = {};
        this.config.timeSlots.forEach(slot => {
            const slotKey = `${slot.start}-${slot.end}`;
            availability[slotKey] = true; // Default to available
        });
        return availability;
    }
    
    markTimeSlotUnavailable(dayAvailability, eventStart, eventEnd) {
        this.config.timeSlots.forEach(slot => {
            const slotKey = `${slot.start}-${slot.end}`;
            const slotStart = this.parseTime(slot.start);
            const slotEnd = this.parseTime(slot.end);
            
            // Check if event overlaps with time slot
            if (this.hasTimeOverlap(eventStart, eventEnd, slotStart, slotEnd)) {
                dayAvailability[slotKey] = false;
            }
        });
    }
    
    hasTimeOverlap(eventStart, eventEnd, slotStart, slotEnd) {
        const eventStartTime = eventStart.getHours() * 60 + eventStart.getMinutes();
        const eventEndTime = eventEnd.getHours() * 60 + eventEnd.getMinutes();
        const slotStartTime = slotStart.getHours() * 60 + slotStart.getMinutes();
        const slotEndTime = slotEnd.getHours() * 60 + slotEnd.getMinutes();
        
        return eventStartTime < slotEndTime && eventEndTime > slotStartTime;
    }
    
    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
    
    async createReservationEvent(reservationData) {
        if (!this.isAuthenticated) {
            throw new Error('User not authenticated');
        }
        
        try {
            const event = {
                summary: this.config.eventSettings.eventTitle,
                description: this.config.eventSettings.eventDescription,
                location: this.config.eventSettings.location,
                start: {
                    dateTime: reservationData.startTime,
                    timeZone: 'America/Chicago'
                },
                end: {
                    dateTime: reservationData.endTime,
                    timeZone: 'America/Chicago'
                },
                colorId: this.config.eventSettings.colorId,
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 24 * 60 }, // 1 day before
                        { method: 'popup', minutes: 60 } // 1 hour before
                    ]
                }
            };
            
            const response = await window.gapi.client.calendar.events.insert({
                calendarId: this.config.calendarId,
                resource: event
            });
            
            console.log('Reservation event created:', response.result);
            return response.result;
        } catch (error) {
            console.error('Failed to create reservation event:', error);
            throw error;
        }
    }
    
    async deleteReservationEvent(eventId) {
        if (!this.isAuthenticated) {
            throw new Error('User not authenticated');
        }
        
        try {
            await window.gapi.client.calendar.events.delete({
                calendarId: this.config.calendarId,
                eventId: eventId
            });
            
            console.log('Reservation event deleted:', eventId);
            return true;
        } catch (error) {
            console.error('Failed to delete reservation event:', error);
            throw error;
        }
    }
    
    formatDateKey(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Get business hours for a specific day
    getBusinessHours(dayOfWeek) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = days[dayOfWeek];
        return this.config.businessHours[dayName];
    }
    
    // Check if a date is within business hours
    isWithinBusinessHours(date, timeSlot) {
        const dayOfWeek = date.getDay();
        const businessHours = this.getBusinessHours(dayOfWeek);
        
        if (!businessHours) return false;
        
        const [slotStart] = timeSlot.split('-');
        const slotTime = this.parseTime(slotStart);
        const businessStart = this.parseTime(businessHours.start);
        const businessEnd = this.parseTime(businessHours.end);
        
        return slotTime >= businessStart && slotTime < businessEnd;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleCalendarService;
} else {
    window.GoogleCalendarService = GoogleCalendarService;
} 