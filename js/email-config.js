// Email Configuration for Form Submissions
// Centralized configuration for easy email management

const EMAIL_CONFIG = {
    // Recipient email address - CHANGE THIS TO YOUR OFFICIAL EMAIL LATER
    recipientEmail: 'playroommadison@gmail.com',
    
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
        phone: '',
        website: 'your-website.com' // Update this with your actual domain
    },
    
         // Web3Forms configuration (free service for static websites)
     web3forms: {
         accessKey: 'c188169b-b3e3-4bad-94a5-ce530e72e4ce'
     },
     
     // SMTP configuration for serverless functions
     smtp: {
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
             user: 'playroommadison@gmail.com',
             pass: 'Felix0626@'// Password
         }
     }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
} else {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
} 