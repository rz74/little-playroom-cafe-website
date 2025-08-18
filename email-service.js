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
    
    // Send via Formspree (works with static websites)
    async sendViaDirectSMTP(formType, formData, additionalData) {
        const emailContent = this.buildEmailContent(formType, formData, additionalData);
        const subject = this.config.subjectPrefixes[formType] || 'Form Submission';
        
        try {
            // Use Formspree as the email service (free and works with static sites)
            const formspreeEndpoint = 'https://formspree.io/f/xgvzbbkl'; // You'll need to replace this with your actual Formspree form ID
            
            const formDataToSend = new FormData();
            formDataToSend.append('_subject', subject);
            formDataToSend.append('_replyto', formData.email || 'no-reply@website.com');
            formDataToSend.append('_cc', this.config.recipientEmail); // Send to playroommadison@gmail.com
            formDataToSend.append('message', emailContent);
            formDataToSend.append('formType', formType);
            formDataToSend.append('timestamp', new Date().toISOString());
            
            // Add all form data for reference
            Object.keys(formData).forEach(key => {
                formDataToSend.append(`formData_${key}`, formData[key] || '');
            });
            
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formDataToSend
            });
            
            if (response.ok) {
                console.log('Email sent successfully via Formspree');
                return { success: true, message: 'Email sent via Formspree' };
            } else {
                throw new Error(`Formspree submission failed: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Formspree error:', error);
            
            // Fallback: Show email content to user
            this.showEmailContentToUser(formType, emailContent);
            
            return { success: false, message: 'Email service unavailable, showing content to user' };
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
 
        `.trim();
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