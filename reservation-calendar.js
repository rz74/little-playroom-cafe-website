// Reservation Calendar System with Google Calendar Integration
class ReservationCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        
        // Google Calendar integration
        this.googleCalendarService = null;
        this.availability = {};
        this.isGoogleCalendarEnabled = false;
        
        this.init();
    }
    
    async init() {
        try {
            // Initialize Google Calendar service
            await this.initializeGoogleCalendar();
            
            // Load initial availability
            await this.loadAvailability();
            
            // Render calendar and bind events
            this.renderCalendar();
            this.bindEvents();
            this.updateTimeSlots();
        } catch (error) {
            console.error('Failed to initialize calendar:', error);
            // Fallback to mock data if Google Calendar fails
            this.availability = this.generateMockAvailability();
            this.renderCalendar();
            this.bindEvents();
            this.updateTimeSlots();
        }
    }
    
    async initializeGoogleCalendar() {
        try {
            // Check if Google Calendar config is available
            if (window.GOOGLE_CALENDAR_CONFIG && 
                window.GOOGLE_CALENDAR_CONFIG.apiKey !== 'YOUR_GOOGLE_API_KEY') {
                
                this.googleCalendarService = new GoogleCalendarService();
                
                // Wait for service to initialize
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (this.googleCalendarService.isAuthenticated) {
                    this.isGoogleCalendarEnabled = true;
                    console.log('Google Calendar integration enabled');
                } else {
                    console.log('Google Calendar service initialized but not authenticated');
                }
            } else {
                console.log('Google Calendar not configured, using mock data');
            }
        } catch (error) {
            console.error('Failed to initialize Google Calendar:', error);
        }
    }
    
    async loadAvailability() {
        if (this.isGoogleCalendarEnabled && this.googleCalendarService) {
            try {
                const startDate = new Date();
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 90); // Next 3 months
                
                this.availability = await this.googleCalendarService.getCalendarAvailability(startDate, endDate);
                console.log('Loaded availability from Google Calendar');
            } catch (error) {
                console.error('Failed to load Google Calendar availability:', error);
                // Fallback to mock data
                this.availability = this.generateMockAvailability();
            }
        } else {
            // Use mock data if Google Calendar is not available
            this.availability = this.generateMockAvailability();
        }
    }
    
    generateMockAvailability() {
        const availability = {};
        const today = new Date();
        
        // Generate availability for next 3 months
        for (let i = 0; i < 90; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateKey = this.formatDateKey(date);
            
            // Skip dates more than 2 weeks in the past
            if (date < today) continue;
            
            // Generate random availability (in real app, this would be from database)
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            if (isWeekend) {
                // Weekends have different hours
                availability[dateKey] = {
                    '10:00-13:00': Math.random() > 0.3, // 70% chance available
                    '14:00-17:00': Math.random() > 0.2, // 80% chance available
                    '18:00-21:00': Math.random() > 0.4  // 60% chance available
                };
            } else {
                // Weekdays
                availability[dateKey] = {
                    '10:00-13:00': Math.random() > 0.2, // 80% chance available
                    '14:00-17:00': Math.random() > 0.1, // 90% chance available
                    '18:00-21:00': Math.random() > 0.3  // 70% chance available
                };
            }
            
            // Mark some dates as fully booked
            if (Math.random() > 0.9) {
                availability[dateKey] = {
                    '10:00-13:00': false,
                    '14:00-17:00': false,
                    '18:00-21:00': false
                };
            }
        }
        
        return availability;
    }
    
    formatDateKey(date) {
        return date.toISOString().split('T')[0];
    }
    
    formatDisplayDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const currentMonthEl = document.getElementById('currentMonth');
        
        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        currentMonthEl.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Generate calendar HTML
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        let calendarHTML = `
            <div class="calendar-weekdays">
                <div class="weekday">Sun</div>
                <div class="weekday">Mon</div>
                <div class="weekday">Tue</div>
                <div class="weekday">Wed</div>
                <div class="weekday">Thu</div>
                <div class="weekday">Fri</div>
                <div class="weekday">Sat</div>
            </div>
            <div class="calendar-days">
        `;
        
        // Generate calendar days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === this.currentMonth;
            const isToday = this.isToday(currentDate);
            const isSelected = this.isSelectedDate(currentDate);
            const isAvailable = this.isDateAvailable(currentDate);
            const isPast = currentDate < new Date();
            
            let dayClass = 'calendar-day';
            if (!isCurrentMonth) dayClass += ' other-month';
            if (isToday) dayClass += ' today';
            if (isSelected) dayClass += ' selected';
            if (!isAvailable || isPast) dayClass += ' unavailable';
            else dayClass += ' available';
            
            const dayNumber = currentDate.getDate();
            const dateKey = this.formatDateKey(currentDate);
            
            calendarHTML += `
                <div class="${dayClass}" data-date="${dateKey}" data-day="${dayNumber}">
                    <span class="day-number">${dayNumber}</span>
                    ${this.getAvailabilityIndicator(dateKey)}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }
    
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    
    isSelectedDate(date) {
        if (!this.selectedDate) return false;
        return date.toDateString() === this.selectedDate.toDateString();
    }
    
    isDateAvailable(date) {
        const dateKey = this.formatDateKey(date);
        const dayAvailability = this.availability[dateKey];
        
        if (!dayAvailability) return false;
        
        // Check if any time slot is available
        return Object.values(dayAvailability).some(slot => slot === true);
    }
    
    getAvailabilityIndicator(dateKey) {
        const dayAvailability = this.availability[dateKey];
        if (!dayAvailability) return '';
        
        const availableSlots = Object.values(dayAvailability).filter(slot => slot === true).length;
        const totalSlots = Object.keys(dayAvailability).length;
        
        if (availableSlots === 0) {
            return '<span class="availability-indicator fully-booked">Fully Booked</span>';
        } else if (availableSlots === totalSlots) {
            return '<span class="availability-indicator fully-available">All Slots Available</span>';
        } else {
            return `<span class="availability-indicator partially-available">${availableSlots} Slots Available</span>`;
        }
    }
    
    updateTimeSlots() {
        const timeSlotsContainer = document.getElementById('timeSlots');
        const selectedInfo = document.getElementById('selectedInfo');
        
        if (!this.selectedDate) {
            timeSlotsContainer.innerHTML = '<p class="no-date-selected">Please select a date from the calendar above.</p>';
            selectedInfo.style.display = 'none';
            return;
        }
        
        const dateKey = this.formatDateKey(this.selectedDate);
        const dayAvailability = this.availability[dateKey];
        
        if (!dayAvailability) {
            timeSlotsContainer.innerHTML = '<p class="no-availability">No availability for this date.</p>';
            selectedInfo.style.display = 'none';
            return;
        }
        
        let timeSlotsHTML = '';
        const timeSlots = [
            { key: '10:00-13:00', display: '10:00 AM - 1:00 PM' },
            { key: '14:00-17:00', display: '2:00 PM - 5:00 PM' },
            { key: '18:00-21:00', display: '6:00 PM - 9:00 PM' }
        ];
        
        timeSlots.forEach(slot => {
            const isAvailable = dayAvailability[slot.key];
            const isSelected = this.selectedTime === slot.key;
            
            let slotClass = 'time-slot';
            if (!isAvailable) slotClass += ' unavailable';
            else if (isSelected) slotClass += ' selected';
            else slotClass += ' available';
            
            timeSlotsHTML += `
                <div class="${slotClass}" data-time="${slot.key}" data-display="${slot.display}">
                    <span class="time-display">${slot.display}</span>
                    <span class="availability-status">
                        ${isAvailable ? 'Available' : 'Booked'}
                    </span>
                </div>
            `;
        });
        
        timeSlotsContainer.innerHTML = timeSlotsHTML;
        
        // Show selected info if both date and time are selected
        if (this.selectedDate && this.selectedTime) {
            this.showSelectedInfo();
        }
    }
    
    showSelectedInfo() {
        const selectedInfo = document.getElementById('selectedInfo');
        const selectedDate = document.getElementById('selectedDate');
        const selectedTime = document.getElementById('selectedTime');
        const submitBtn = document.getElementById('submitBtn');
        
        selectedDate.textContent = this.formatDisplayDate(this.selectedDate);
        
        const timeSlots = {
            '10:00-13:00': '10:00 AM - 1:00 PM',
            '14:00-17:00': '2:00 PM - 5:00 PM',
            '18:00-21:00': '6:00 PM - 9:00 PM'
        };
        
        selectedTime.textContent = timeSlots[this.selectedTime];
        
        // Update form fields
        document.getElementById('resDate').value = this.formatDisplayDate(this.selectedDate);
        document.getElementById('resTime').value = timeSlots[this.selectedTime];
        
        selectedInfo.style.display = 'block';
        submitBtn.disabled = false;
    }
    
    bindEvents() {
        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
        
        // Calendar day selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.calendar-day')) {
                const dayElement = e.target.closest('.calendar-day');
                const dateKey = dayElement.dataset.date;
                
                if (dayElement.classList.contains('available')) {
                    this.selectDate(new Date(dateKey));
                }
            }
        });
        
        // Time slot selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.time-slot')) {
                const slotElement = e.target.closest('.time-slot');
                const timeKey = slotElement.dataset.time;
                
                if (slotElement.classList.contains('available')) {
                    this.selectTime(timeKey);
                }
            }
        });
        
        // Form submission
        document.getElementById('reservationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }
    
    selectDate(date) {
        // Remove previous selection
        const prevSelected = document.querySelector('.calendar-day.selected');
        if (prevSelected) prevSelected.classList.remove('selected');
        
        // Add new selection
        this.selectedDate = date;
        this.selectedTime = null; // Reset time selection
        
        // Update calendar display
        const dateKey = this.formatDateKey(date);
        const dayElement = document.querySelector(`[data-date="${dateKey}"]`);
        if (dayElement) dayElement.classList.add('selected');
        
        // Update time slots
        this.updateTimeSlots();
        
        // Clear form fields
        document.getElementById('resDate').value = '';
        document.getElementById('resTime').value = '';
        document.getElementById('submitBtn').disabled = true;
    }
    
    selectTime(time) {
        // Remove previous selection
        const prevSelected = document.querySelector('.time-slot.selected');
        if (prevSelected) prevSelected.classList.remove('selected');
        
        // Add new selection
        this.selectedTime = time;
        
        // Update time slot display
        const slotElement = document.querySelector(`[data-time="${time}"]`);
        if (slotElement) slotElement.classList.add('selected');
        
        // Show selected info
        this.showSelectedInfo();
    }
    
    async handleFormSubmission() {
        if (!this.selectedDate || !this.selectedTime) {
            alert('Please select both a date and time slot before submitting.');
            return;
        }
        
        try {
            // Collect form data
            const formData = new FormData(document.getElementById('reservationForm'));
            
            // Add selected date and time
            formData.append('selectedDate', this.formatDateKey(this.selectedDate));
            formData.append('selectedTime', this.selectedTime);
            
            // Create Google Calendar event if enabled
            if (this.isGoogleCalendarEnabled && this.googleCalendarService) {
                const reservationData = this.createReservationEventData();
                const event = await this.googleCalendarService.createReservationEvent(reservationData);
                
                // Store event ID for future reference
                formData.append('googleEventId', event.id);
                
                console.log('Reservation event created in Google Calendar:', event);
            }
            
            // Simulate form submission (in real app, this would send to backend)
            console.log('Reservation submitted:', Object.fromEntries(formData));
            
            // Show success message
            alert('Reservation submitted successfully! Check your Google Calendar for the event.');
            
            // Refresh availability to reflect the new booking
            await this.loadAvailability();
            
            // Reset form and calendar
            document.getElementById('reservationForm').reset();
            this.selectedDate = null;
            this.selectedTime = null;
            this.renderCalendar();
            this.updateTimeSlots();
            document.getElementById('submitBtn').disabled = true;
            
        } catch (error) {
            console.error('Failed to submit reservation:', error);
            alert('Failed to submit reservation. Please try again.');
        }
    }
    
    createReservationEventData() {
        const [startTime, endTime] = this.selectedTime.split('-');
        const [startHour] = startTime.split(':');
        const [endHour] = endTime.split(':');
        
        const startDateTime = new Date(this.selectedDate);
        startDateTime.setHours(parseInt(startHour), 0, 0, 0);
        
        const endDateTime = new Date(this.selectedDate);
        endDateTime.setHours(parseInt(endHour), 0, 0, 0);
        
        return {
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            customerName: document.getElementById('resName').value,
            customerEmail: document.getElementById('resEmail').value,
            customerPhone: document.getElementById('resPhone').value,
            numberOfGuests: document.getElementById('resGuests').value,
            reservationType: document.getElementById('resType').value,
            notes: document.getElementById('resNotes').value
        };
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReservationCalendar();
}); 