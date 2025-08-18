// Email Service for Form Submissions
// Handles sending email notifications directly via SMTP

class EmailService {
    constructor() {
        this.config = window.EMAIL_CONFIG;
        this.isInitialized = false;
        this.init();
    }
    
    async init() {
        try {
            // Initialize direct email service
            this.isInitialized = true;
            console.log('Direct email service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize email service:', error);
        }
    }
    
    // Send email notification for any form type
    async sendFormNotification(formType, formData, additionalData = {}) {
        try {
            if (this.isInitialized) {
                return await this.sendViaDirectSMTP(formType, formData, additionalData);
            } else {
                throw new Error('Email service not initialized');
            }
        } catch (error) {
            console.error('Failed to send email notification:', error);
            throw error;
        }
    }
    
    // Send via direct SMTP connection
    async sendViaDirectSMTP(formType, formData, additionalData) {
        const emailContent = this.buildEmailContent(formType, formData, additionalData);
        const subject = this.config.subjectPrefixes[formType] || 'Form Submission';
        
        try {
            // Create the email data
            const emailData = {
                to: this.config.recipientEmail,
                from: this.config.senderEmail || this.config.recipientEmail,
                subject: subject,
                text: emailContent,
                html: this.convertToHTML(emailContent)
            };
            
            // Send via your backend endpoint
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Email sent successfully via direct SMTP:', result);
            return result;
            
        } catch (error) {
            console.error('Direct SMTP error:', error);
            throw error;
        }
    }
    

    
    // Convert plain text to HTML format
    convertToHTML(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    // Build email content based on form type
    buildEmailContent(formType, formData, additionalData) {
        let content = '';
        
        switch (formType) {
            case 'party':
                content = this.buildPartyEmailContent(formData, additionalData);
                break;
            case 'reservation':
                content = this.buildReservationEmailContent(formData, additionalData);
                break;
            case 'contact':
                content = this.buildContactEmailContent(formData, additionalData);
                break;
            case 'waiver':
                content = this.buildWaiverEmailContent(formData, additionalData);
                break;
            case 'partnership':
                content = this.buildPartnershipEmailContent(formData, additionalData);
                break;
            default:
                content = this.buildGenericEmailContent(formData, additionalData);
        }
        
        return content;
    }
    
    // Build party registration email content
    buildPartyEmailContent(formData, additionalData) {
        return `
🎉 NEW PARTY REGISTRATION RECEIVED!

📅 Party Details:
- Date: ${formData.partyDate || 'Not specified'}
- Time: ${formData.partyTime || 'Not specified'}
- Party Type: ${formData.partyType || 'Not specified'}
- Number of Guests: ${formData.numberOfGuests || 'Not specified'}

👤 Customer Information:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

🎨 Decoration Package: ${formData.decorationPackage || 'Not selected'}
💰 Add-on Services: ${formData.addOnServices || 'None selected'}

📝 Special Requests:
${formData.specialRequests || 'No special requests'}

📧 Additional Notes:
${formData.notes || 'No additional notes'}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    
    // Build reservation email content
    buildReservationEmailContent(formData, additionalData) {
        return `
📅 NEW RESERVATION REQUEST RECEIVED!

📅 Reservation Details:
- Date: ${formData.selectedDate || formData.date || 'Not specified'}
- Time: ${formData.selectedTime || formData.time || 'Not specified'}
- Reservation Type: ${formData.type || 'Not specified'}
- Number of Guests: ${formData.guests || 'Not specified'}

👤 Customer Information:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

📝 Special Requests:
${formData.notes || 'No special requests'}

🔗 Google Calendar Event ID: ${formData.googleEventId || 'Not created'}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    
    // Build contact form email content
    buildContactEmailContent(formData, additionalData) {
        return `
📧 NEW CONTACT FORM SUBMISSION RECEIVED!

👤 Contact Information:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

📝 Message:
${formData.message || 'No message provided'}

📋 Subject: ${formData.subject || 'General Inquiry'}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    
    // Build waiver email content
    buildWaiverEmailContent(formData, additionalData) {
        return `
📋 NEW WAIVER SUBMISSION RECEIVED!

👤 Participant Information:
- Participant Name: ${formData.participantName || 'Not provided'}
- Age: ${formData.participantAge || 'Not provided'}
- Parent/Guardian: ${formData.parentGuardian || 'Not provided'}

📞 Contact Information:
- Phone: ${formData.phone || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Emergency Contact: ${formData.emergencyContact || 'Not provided'}

✅ Agreement Status: WAIVER AGREED TO

📅 Submission Date: ${new Date().toLocaleDateString()}
⏰ Submission Time: ${new Date().toLocaleTimeString()}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    
    // Build partnership email content
    buildPartnershipEmailContent(formData, additionalData) {
        return `
🤝 NEW PARTNERSHIP INQUIRY RECEIVED!

👤 Contact Information:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}
- Company: ${formData.company || 'Not provided'}

💼 Partnership Details:
- Partnership Type: ${formData.partnershipType || 'Not specified'}
- Business Description: ${formData.businessDescription || 'Not provided'}

📝 Proposal:
${formData.proposal || 'No proposal provided'}

📅 Preferred Contact Time: ${formData.preferredContactTime || 'Not specified'}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    
    // Build generic email content
    buildGenericEmailContent(formData, additionalData) {
        return `
📝 NEW FORM SUBMISSION RECEIVED!

👤 Contact Information:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

📋 Form Data:
${JSON.stringify(formData, null, 2)}

---
Sent from Little Playroom Cafe Website
${this.config.businessInfo.address}
${this.config.businessInfo.phone}
        `.trim();
    }
    

    
    // Update recipient email (for easy configuration changes)
    updateRecipientEmail(newEmail) {
        this.config.recipientEmail = newEmail;
        console.log('Recipient email updated to:', newEmail);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
} else {
    window.EmailService = EmailService;
} 