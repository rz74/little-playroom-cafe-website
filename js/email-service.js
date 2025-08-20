// Email Service for Form Submissions
// Handles sending email notifications via serverless functions

class EmailService {
    constructor() {
        this.config = window.EMAIL_CONFIG;
        this.isInitialized = true;
        console.log('Email service initialized for static website');
    }
    
    // Send email notification for any form type
    async sendFormNotification(formType, formData, additionalData = {}) {
        try {
            return await this.sendViaServerless(formType, formData, additionalData);
        } catch (error) {
            console.error('Failed to send email notification:', error);
            // Fallback to showing email content to user
            const emailContent = this.buildEmailContent(formType, formData, additionalData);
            this.showEmailContentToUser(formType, emailContent);
            return { success: false, message: 'Email service unavailable, showing content to user' };
        }
    }
    
    // Send via serverless function (works with static websites)
    async sendViaServerless(formType, formData, additionalData) {
        const emailContent = this.buildEmailContent(formType, formData, additionalData);
        const subject = this.config.subjectPrefixes[formType] || 'Form Submission';
        
        try {
            // Try multiple serverless email services
            
            // Option 1: Netlify Functions (if on Netlify)
            if (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('your-domain.com')) {
                return await this.sendViaNetlifyFunction(formType, formData, emailContent, subject);
            }
            
            // Option 2: Vercel Functions (if on Vercel)
            if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('your-domain.com')) {
                return await this.sendViaVercelFunction(formType, formData, emailContent, subject);
            }
            
            // Option 3: Web3Forms (free service for static sites)
            return await this.sendViaWeb3Forms(formType, formData, emailContent, subject);
            
        } catch (error) {
            console.error('Serverless email error:', error);
            throw error;
        }
    }
    
    // Send via Netlify Functions
    async sendViaNetlifyFunction(formType, formData, emailContent, subject) {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: this.config.recipientEmail,
                from: formData.email || 'no-reply@website.com',
                subject: subject,
                content: emailContent,
                formType: formType,
                formData: formData
            })
        });
        
        if (response.ok) {
            console.log('Email sent successfully via Netlify Functions');
            return { success: true, message: 'Email sent via Netlify Functions' };
        } else {
            throw new Error(`Netlify function failed: ${response.status}`);
        }
    }
    
    // Send via Vercel Functions
    async sendViaVercelFunction(formType, formData, emailContent, subject) {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: this.config.recipientEmail,
                from: formData.email || 'no-reply@website.com',
                subject: subject,
                content: emailContent,
                formType: formType,
                formData: formData
            })
        });
        
        if (response.ok) {
            console.log('Email sent successfully via Vercel Functions');
            return { success: true, message: 'Email sent via Vercel Functions' };
        } else {
            throw new Error(`Vercel function failed: ${response.status}`);
        }
    }
    
    // Send via Web3Forms (free service for static sites)
    async sendViaWeb3Forms(formType, formData, emailContent, subject) {
        const formDataToSend = new FormData();
        formDataToSend.append('access_key', this.config.web3forms.accessKey);
        formDataToSend.append('subject', subject);
        formDataToSend.append('from_name', formData.name || 'Website Visitor');
        formDataToSend.append('from_email', formData.email || 'no-reply@website.com');
        formDataToSend.append('message', emailContent);
        formDataToSend.append('form_type', formType);
        formDataToSend.append('timestamp', new Date().toISOString());
        
        // Add all form data for reference
        Object.keys(formData).forEach(key => {
            formDataToSend.append(`formData_${key}`, formData[key] || '');
        });
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formDataToSend
        });
        
        if (response.ok) {
            console.log('Email sent successfully via Web3Forms');
            return { success: true, message: 'Email sent via Web3Forms' };
        } else {
            throw new Error(`Web3Forms failed: ${response.status}`);
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

📋 COMPLETE WAIVER CONTENT AGREED TO:

LITTLE PLAYROOM CAFE LLC
LITTLE PLAYROOM CAFE
7956 Tree Lane, Madison WI 53717

LIABILITY WAIVER AND HOLD HARMLESS AGREEMENT

As parent or legal guardian of the child whose name is set forth below (who is referred to herein as the "Participant") and in consideration of the Participant being permitted to participate in the Activities (as defined below) conducted by Little Playroom Cafe LLC ("Little Playroom Cafe"), the Participant and I agree as follows:

1. Activities - The Participant will participate in various activities offered by Little Playroom Cafe (the "Activities"), including but not limited to, the following: use of the toys and equipment in the Little Playroom Cafe.

2. Assumption Of Risk - I understand that the Activities entail the risk of severe bodily injury to the Participant. Injuries that could result will vary, but may include (a) minor injuries such as scratches, bruises and sprains; (b) major injuries such as eye injury or loss of sight, joint or back injuries and concussions; and (c) catastrophic injuries, including paralysis and even death. Notwithstanding these risks and other hazards that may be foreseeable but not specifically identified herein, I, for myself and the Participant and our respective heirs, personal representatives and assigns, understand, acknowledge, and expressly and voluntarily assume all risks and full responsibility for any injury arising out of or related to the Activities.

3. Release, Discharge and Agreement Not To Sue - I, for myself and the Participant and our respective heirs, personal representatives and assigns, do hereby release, discharge and agree not to sue Little Playroom Cafe and its managers, members, employees and/or other agents, for any injury to or death of the Participant arising, directly or indirectly, from participation in the Activities. This release, discharge and covenant not to sue shall relate to any and all claims or legal rights now existing or arising in the future, including claims and legal rights arising out of any negligence of Little Playroom Cafe and/or its managers, members, employees and/or other agents and any other breach of a legal duty arising out of common law, statute, contract or otherwise.

4. Indemnification And Hold Harmless – I agree to indemnify Little Playroom Cafe and hold Little Playroom Cafe harmless from, without limitation, any and all claims, actions, suits, procedures, costs, expenses, damages and liabilities, including attorney's fees and costs, incurred due to claims brought by any third party as a result of or arising out of the Participant's involvement in the Activities and to reimburse Little Playroom Cafe for any such costs, expenses and fees as they are incurred.

5. Security Cameras - I understand that security cameras installed within and around the facility are for the safety of all participants and may be referenced should any incident or injury occur.

6. COVID-19 Warning - An inherited risk of exposure to Covid-19 exists in any public place where people are present. COVID-19 is an extremely contagious disease that can lead to severe illness and death. According to the Center of Disease Control and Prevention, senior citizens and guests with underlying medical conditions are at higher risk for contracting the disease. Participation includes possible exposure to an illness from infectious disease including but not limited to Covid-19. By visiting Little Playroom Cafe, you assume all risks related to Covid-19 and other infectious disease.

7. Personal property - I acknowledge that all personal items, left, or forgotten at Little Playroom Cafe facility, is left at my own risk and the company is not responsible for any stolen, damaged, or forgotten items.

8. "As Is Condition" - I acknowledge that the Little Playroom Cafe makes no representation as to the condition of the play structure or any toys, and/or equipment used within the facility. I acknowledge that I, and any participant(s) in my care, will use the facility and any equipment in its "As Is Condition" and assume all known and unknown risks associated to the Participant(s) in any activities at the facility, including but not limited to: falls, slips, impact with toys, equipment or other children.

9. Parent Or Legal Guardian Certification And Consent - I hereby certify that I am the parent or legal guardian of the Participant whose name appears below, and I have authority to waive rights on behalf of the minor Participant. I have read and I understand all of the provisions of this document and the risks of the Activities. I understand that the Activities could cause injury and even death. I acknowledge that I have read and understand the terms of this document and I am freely and voluntarily signing this document.

10. Severability - This document is intended to be as broad and inclusive as is permitted by the laws of the State of Wisconsin and if any provision (or a part of any provision) contained herein is deemed to be invalid, the balance of the provisions shall continue in full legal force and effect, notwithstanding such invalidity.

I HAVE READ THIS AGREEMENT THOROUGHLY. I UNDERSTAND THAT BY SIGNING THIS AGREEMENT, I AM WAIVING CERTAIN LEGAL RIGHTS, WHICH I, THE PARTICIPANT(S), AND OUR HEIRS, ASSIGNEES, EXECUTORS, ADMINISTRATORS, AND PERSONAL REPRESENTATIVES, HAVE AGAINST THE RELEASEES, INCLUDING THE RIGHT TO SUE. I HAVE BEEN AFFORDED THE OPPORTUNITY TO REFUSE THE PARTICIPANT(S) PARTICIPATION IN THE ACTIVITIES, BUT I HAVE FREELY AND VOLUNTARILY ELECTED TO SIGN THIS AGREEMENT.

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