// Email Configuration for Form Submissions
// Centralized configuration for easy email management

const EMAIL_CONFIG = {
    // Recipient email address - CHANGE THIS TO YOUR OFFICIAL EMAIL LATER
    recipientEmail: 'jiangdl0129@gmail.com',
    
    // Email subject prefixes for different forms
    subjectPrefixes: {
        party: '🎉 Party Registration - Little Playroom Cafe',
        reservation: '📅 Reservation Request - Little Playroom Cafe',
        contact: '📧 Contact Form - Little Playroom Cafe',
        waiver: '📋 Waiver Submission - Little Playroom Cafe',
        partnership: '🤝 Partnership Inquiry - Little Playroom Cafe'
    },
    
    // Business information for email signatures
    businessInfo: {
        name: 'Little Playroom Cafe',
        address: '7956 Tree Lane, Madison WI 53717',
        phone: '608-345-9528',
        website: 'your-website.com' // Update this with your actual domain
    },
    
    // SMTP configuration for direct email sending
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'jiangdl0129@gmail.com', // Your Gmail address
            pass: 'YOUR_APP_PASSWORD' // Gmail App Password (not your regular password)
        }
    },
    
    // Sender email (can be the same as recipient)
    senderEmail: 'jiangdl0129@gmail.com'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
} else {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
} 