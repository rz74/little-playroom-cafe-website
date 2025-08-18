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
    
             // Email service configuration (using EmailJS for simplicity)
         emailService: {
             serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Will be configured later
             templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Will be configured later
             userId: 'YOUR_EMAILJS_USER_ID', // Will be configured later
             formspreeFormId: 'YOUR_FORMSPREE_FORM_ID' // Will be configured later
         }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
} else {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
} 