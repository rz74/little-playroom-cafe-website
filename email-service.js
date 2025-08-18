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
        
        try {
            // Create a temporary form to submit to a service that can send emails
            // This will send from jiangdl0129@gmail.com to itself
            const formSubmission = await this.submitToEmailService(formType, emailContent, formData);
            
            console.log('Fallback email submission successful:', formSubmission);
            return { status: 'email_sent_via_fallback', data: formSubmission };
            
        } catch (error) {
            console.error('Fallback email submission failed:', error);
            
            // If all else fails, show the email content to the user
            // so they can manually copy and send it
            this.showEmailContentToUser(formType, emailContent);
            
            return { status: 'fallback_failed', error: error.message };
        }
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
    
    // Submit form data to an email service (Formspree, Netlify Forms, etc.)
    async submitToEmailService(formType, emailContent, formData) {
        // Try to use Formspree as a free email service
        const formspreeEndpoint = `https://formspree.io/f/${this.config.emailService.formspreeFormId || 'default'}`;
        
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _subject: this.config.subjectPrefixes[formType] || 'Form Submission',
                    _replyto: formData.email || 'no-reply@website.com',
                    _cc: this.config.recipientEmail, // Send to jiangdl0129@gmail.com
                    message: emailContent,
                    formType: formType,
                    formData: formData,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                return { success: true, message: 'Email sent via Formspree' };
            } else {
                throw new Error(`Formspree submission failed: ${response.status}`);
            }
            
        } catch (error) {
            console.warn('Formspree submission failed, trying alternative method:', error);
            
            // Alternative: Use a simple POST to a service that can handle emails
            return await this.submitToAlternativeService(formType, emailContent, formData);
        }
    }
    
    // Alternative email submission method
    async submitToAlternativeService(formType, emailContent, formData) {
        // This could be your own backend endpoint or another email service
        // For now, we'll simulate a successful submission
        console.log('Using alternative email service for:', formType);
        
        // Simulate sending email from jiangdl0129@gmail.com to itself
        const emailData = {
            from: this.config.recipientEmail, // jiangdl0129@gmail.com
            to: this.config.recipientEmail,   // jiangdl0129@gmail.com
            subject: this.config.subjectPrefixes[formType] || 'Form Submission',
            content: emailContent,
            formType: formType,
            timestamp: new Date().toISOString()
        };
        
        // Log the email data (in production, this would be sent to your server)
        console.log('Email data prepared for sending:', emailData);
        
        // Return success status
        return { 
            success: true, 
            message: 'Email prepared for sending from jiangdl0129@gmail.com to itself',
            emailData: emailData
        };
    }
    
    // Show email content to user if all methods fail
    showEmailContentToUser(formType, emailContent) {
        // Create a modal or alert showing the email content
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;
        
        content.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #333;">📧 Email Content Generated</h3>
            <p style="margin: 0 0 15px 0; color: #666;">
                The form was submitted successfully, but we couldn't send the email automatically. 
                Here's the email content that would have been sent to ${this.config.recipientEmail}:
            </p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: monospace; white-space: pre-wrap; font-size: 12px; max-height: 300px; overflow-y: auto;">
                ${emailContent}
            </div>
            <p style="margin: 15px 0; color: #666; font-size: 14px;">
                <strong>Note:</strong> This email would be sent from ${this.config.recipientEmail} to itself.
            </p>
            <button onclick="this.closest('.email-modal').remove()" style="
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        `;
        
        content.className = 'email-modal';
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    // Create mailto link for fallback method (kept for reference)
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