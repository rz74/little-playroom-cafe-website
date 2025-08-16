// Email Service for Form Submissions
// Handles sending email notifications for all forms

class EmailService {
    constructor() {
        this.config = window.EMAIL_CONFIG;
        this.isInitialized = false;
        this.init();
    }
    
    async init() {
        try {
            // Load EmailJS if not already loaded
            if (!window.emailjs) {
                await this.loadEmailJS();
            }
            
            // Initialize EmailJS
            if (window.emailjs) {
                window.emailjs.init(this.config.emailService.userId);
                this.isInitialized = true;
                console.log('EmailJS initialized successfully');
            } else {
                console.warn('EmailJS not available, using fallback method');
            }
        } catch (error) {
            console.error('Failed to initialize email service:', error);
        }
    }
    
    async loadEmailJS() {
        return new Promise((resolve, reject) => {
            if (window.emailjs) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Send email notification for any form type
    async sendFormNotification(formType, formData, additionalData = {}) {
        try {
            if (this.isInitialized && window.emailjs) {
                return await this.sendViaEmailJS(formType, formData, additionalData);
            } else {
                return await this.sendViaFallback(formType, formData, additionalData);
            }
        } catch (error) {
            console.error('Failed to send email notification:', error);
            throw error;
        }
    }
    
    // Send via EmailJS (primary method)
    async sendViaEmailJS(formType, formData, additionalData) {
        const templateParams = this.buildTemplateParams(formType, formData, additionalData);
        
        return new Promise((resolve, reject) => {
            window.emailjs.send(
                this.config.emailService.serviceId,
                this.config.emailService.templateId,
                templateParams
            ).then(
                (response) => {
                    console.log('Email sent successfully:', response);
                    resolve(response);
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    reject(error);
                }
            );
        });
    }
    
    // Fallback method using a simple form submission
    async sendViaFallback(formType, formData, additionalData) {
        const emailContent = this.buildEmailContent(formType, formData, additionalData);
        
        // Create a temporary form to send email via mailto
        const mailtoLink = this.createMailtoLink(formType, emailContent);
        
        // Open email client
        window.open(mailtoLink, '_blank');
        
        return { status: 'opened_email_client' };
    }
    
    // Build template parameters for EmailJS
    buildTemplateParams(formType, formData, additionalData) {
        const subject = this.config.subjectPrefixes[formType] || 'Form Submission';
        const content = this.buildEmailContent(formType, formData, additionalData);
        
        return {
            to_email: this.config.recipientEmail,
            from_name: formData.name || 'Website Visitor',
            from_email: formData.email || 'no-reply@website.com',
            subject: subject,
            message: content,
            form_type: formType,
            business_name: this.config.businessInfo.name,
            business_address: this.config.businessInfo.address,
            business_phone: this.config.businessInfo.phone
        };
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
    
    // Create mailto link for fallback method
    createMailtoLink(formType, content) {
        const subject = encodeURIComponent(this.config.subjectPrefixes[formType] || 'Form Submission');
        const body = encodeURIComponent(content);
        
        return `mailto:${this.config.recipientEmail}?subject=${subject}&body=${body}`;
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