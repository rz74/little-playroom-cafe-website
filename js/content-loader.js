// Content Loader for Little Playroom Cafe
// This script automatically loads content from content/website-content.txt
// and populates the HTML elements dynamically

class ContentLoader {
    constructor() {
        this.content = null;
        this.currentPage = this.getCurrentPage();
        console.log('ContentLoader initialized for page:', this.currentPage);
    }

    // Get current page name from URL or data attribute
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('about.html')) return 'about';
        if (path.includes('menu.html')) return 'menu';
        if (path.includes('party.html')) return 'party';
        if (path.includes('contact.html')) return 'contact';
        if (path.includes('rules.html')) return 'rules';
        if (path.includes('partnership.html')) return 'partnership';
        if (path.includes('waiver.html')) return 'waiver';
        if (path.includes('gallery.html')) return 'gallery';
        return 'home'; // Default to home page
    }

    // Load content from the text file
    async loadContent() {
        try {
            console.log('Loading content from /content/website-content.txt...');
            const response = await fetch('/content/website-content.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log('Content loaded successfully, length:', text.length);
            this.content = this.parseContent(text);
            console.log('Parsed content:', this.content);
            this.populatePage();
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback: use hardcoded content if file loading fails
            this.useFallbackContent();
        }
    }

    // Parse the content text file into structured data
    parseContent(text) {
        const sections = {};
        let currentSection = '';
        let currentSubsection = '';
        
        const lines = text.split('\n');
        console.log('Parsing', lines.length, 'lines of content');
        
        for (let line of lines) {
            line = line.trim();
            
            if (line.startsWith('========================================================================')) {
                continue;
            }
            
            if (line.includes('PAGE (') && line.includes('.html)')) {
                currentSection = line.match(/PAGE \(([^)]+)\)/)[1].replace('.html', '');
                sections[currentSection] = {};
                console.log('Found page section:', currentSection);
                continue;
            }
            
            if (line.endsWith('SECTION:') || line.endsWith('CONTENT:') || line.endsWith('MENU:') || 
                line.endsWith('RULES:') || line.endsWith('SERVICES:') || line.endsWith('ITEMS:') ||
                line.endsWith('FORM:') || line.endsWith('INFO:') || line.endsWith('DISCLAIMER:') ||
                line.endsWith('FIELDS:') || line.endsWith('CHECKBOXES:') || line.endsWith('SIGNATURE:') ||
                line.endsWith('NOTE:') || line.endsWith('CTA:') || line.endsWith('BENEFITS:') ||
                line.endsWith('REQUIREMENTS:') || line.endsWith('CAPACITY:') || line.endsWith('INCLUDED:') ||
                line.endsWith('PRICING:') || line.endsWith('FEATURES:') || line.endsWith('SLOTS:') ||
                line.endsWith('DETAILS:') || line.endsWith('ADD-ONS:') || line.endsWith('PAYMENTS:') ||
                line.endsWith('DECORATION:') || line.endsWith('BOOKING:') || line.endsWith('OPTIONS:') ||
                line.endsWith('LINKS:') || line.endsWith('DESCRIPTIONS:') || line.endsWith('INFORMATION:') ||
                line.endsWith('HOURS:') || line.endsWith('OVERLAY:') || line.endsWith('BUTTONS:')) {
                currentSubsection = line.replace(':', '').toLowerCase().replace(/\s+/g, '_');
                if (!sections[currentSection]) sections[currentSection] = {};
                if (!sections[currentSection][currentSubsection]) sections[currentSection][currentSubsection] = {};
                console.log('Found subsection:', currentSubsection, 'in section:', currentSection);
                continue;
            }
            
            if (line.startsWith('- ') && currentSection && currentSubsection) {
                const content = line.substring(2);
                if (content.includes(':')) {
                    const [key, value] = content.split(':', 2);
                    const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_');
                    const cleanValue = value.trim();
                    
                    if (!sections[currentSection][currentSubsection][cleanKey]) {
                        sections[currentSection][currentSubsection][cleanKey] = cleanValue;
                    } else if (Array.isArray(sections[currentSection][currentSubsection][cleanKey])) {
                        sections[currentSection][currentSubsection][cleanKey].push(cleanValue);
                    } else {
                        sections[currentSection][currentSubsection][cleanKey] = [sections[currentSection][currentSubsection][cleanKey], cleanValue];
                    }
                    console.log('Added content:', cleanKey, '=', cleanValue);
                } else {
                    // Handle list items without keys
                    if (!sections[currentSection][currentSubsection].list) {
                        sections[currentSection][currentSubsection].list = [];
                    }
                    sections[currentSection][currentSubsection].list.push(content);
                }
            }
        }
        
        return sections;
    }

    // Populate the current page with loaded content
    populatePage() {
        if (!this.content || !this.content[this.currentPage]) {
            console.warn(`No content found for page: ${this.currentPage}`);
            return;
        }

        const pageContent = this.content[this.currentPage];
        console.log('Populating page with content:', pageContent);
        
        // Populate based on page type
        switch (this.currentPage) {
            case 'home':
                this.populateHomePage(pageContent);
                break;
            case 'about':
                this.populateAboutPage(pageContent);
                break;
            case 'menu':
                this.populateMenuPage(pageContent);
                break;
            case 'party':
                this.populatePartyPage(pageContent);
                break;
            case 'contact':
                this.populateContactPage(pageContent);
                break;
            case 'rules':
                this.populateRulesPage(pageContent);
                break;
            case 'partnership':
                this.populatePartnershipPage(pageContent);
                break;
            case 'waiver':
                this.populateWaiverPage(pageContent);
                break;
            case 'gallery':
                this.populateGalleryPage(pageContent);
                break;
        }

        // Always populate common elements
        this.populateCommonElements();
    }

    // Populate home page content
    populateHomePage(content) {
        console.log('Populating home page with content:', content);
        
        // Hero section
        this.updateElement('[data-content="welcome_text"]', content.hero_section?.welcome_text);
        this.updateElement('[data-content="main_title"]', content.hero_section?.main_title);
        this.updateElement('[data-content="subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="description"]', content.hero_section?.description);
        this.updateElement('[data-content="cta_button"]', content.hero_section?.cta_button);

        // Quick navigation
        this.updateElement('[data-content="about_text"]', content.quick_navigation?.about);
        this.updateElement('[data-content="menu_text"]', content.quick_navigation?.menu);
        this.updateElement('[data-content="party_text"]', content.quick_navigation?.birthday_party);
        this.updateElement('[data-content="contact_text"]', content.quick_navigation?.contact);

        // Tagline section
        this.updateElement('[data-content="tagline_title"]', content.tagline_section?.title);
        this.updateElement('[data-content="tagline_description"]', content.tagline_section?.description);

        // About preview
        this.updateElement('[data-content="about_title"]', content.about_preview?.title);
        this.updateElement('[data-content="about_description_1"]', content.about_preview?.description_1);
        this.updateElement('[data-content="about_description_2"]', content.about_preview?.description_2);
        this.updateElement('[data-content="about_cta"]', content.about_preview?.cta_button);

        // Gallery preview
        this.updateElement('[data-content="gallery_title"]', content.gallery_preview?.title);
        this.updateElement('[data-content="playground_overlay"]', content.gallery_preview?.playground_overlay);
        this.updateElement('[data-content="learning_zone_overlay"]', content.gallery_preview?.learning_zone_overlay);
        this.updateElement('[data-content="cafe_overlay"]', content.gallery_preview?.cafe_overlay);
        this.updateElement('[data-content="gallery_cta"]', content.gallery_preview?.cta_button);
    }

    // Populate about page content
    populateAboutPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="main_title"]', content.about_content?.main_title);
        this.updateElement('[data-content="description_1"]', content.about_content?.description_1);
        this.updateElement('[data-content="description_2"]', content.about_content?.description_2);
        this.updateElement('[data-content="description_3"]', content.about_content?.description_3);
        this.updateElement('[data-content="description_4"]', content.about_content?.description_4);
        this.updateElement('[data-content="mission_title"]', content.mission_section?.title);
        this.updateElement('[data-content="mission_description"]', content.mission_section?.description);
        this.updateElement('[data-content="special_title"]', content.what_makes_us_special?.title);
        this.updateElement('[data-content="special_description_1"]', content.what_makes_us_special?.description_1);
        this.updateElement('[data-content="special_description_2"]', content.what_makes_us_special?.description_2);
        this.updateElement('[data-content="values_title"]', content.values?.title);
        this.updateElement('[data-content="closing_paragraph"]', content.closing?.final_paragraph);
    }

    // Populate menu page content
    populateMenuPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="coffee_menu_title"]', content.coffee_menu?.title);
        this.updateElement('[data-content="kids_snack_menu_title"]', content.kids_snack_menu?.title);
        this.updateElement('[data-content="kids_snack_subtitle"]', content.kids_snack_menu?.subtitle);
        this.updateElement('[data-content="menu_info_title"]', content.menu_information?.title);
    }

    // Populate party page content
    populatePartyPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="party_cta_title"]', content.party_cta?.title);
        this.updateElement('[data-content="party_cta_description"]', content.party_cta?.description);
        this.updateElement('[data-content="party_cta_button"]', content.party_cta?.button);
        this.updateElement('[data-content="party_package_title"]', content.party_package?.title);
        this.updateElement('[data-content="party_package_description"]', content.party_package?.description);
        this.updateElement('[data-content="package_pricing_title"]', content.package_pricing?.title);
        this.updateElement('[data-content="base_package"]', content.package_pricing?.base_package);
        this.updateElement('[data-content="additional_guests"]', content.package_pricing?.additional_guests);
        this.updateElement('[data-content="pricing_note"]', content.package_pricing?.note);
        this.updateElement('[data-content="public_notice"]', content.package_pricing?.important);
    }

    // Populate contact page content
    populateContactPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="contact_form_title"]', content.contact_form?.title);
        this.updateElement('[data-content="contact_info_title"]', content.contact_info?.title);
        this.updateElement('[data-content="address"]', content.contact_info?.address);
        this.updateElement('[data-content="email"]', content.contact_info?.email);
        this.updateElement('[data-content="hours"]', content.contact_info?.hours);
        this.updateElement('[data-content="social_media_title"]', content.social_media?.title);
        this.updateElement('[data-content="map_title"]', content.map_section?.title);
    }

    // Populate rules page content
    populateRulesPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="hero_description"]', content.hero_section?.description);
        this.updateElement('[data-content="safety_rules_title"]', content.safety_rules?.title);
        this.updateElement('[data-content="food_beverage_title"]', content.food_beverage?.title);
        this.updateElement('[data-content="party_rules_title"]', content.party_rules?.title);
        this.updateElement('[data-content="general_conduct_title"]', content.general_conduct?.title);
        this.updateElement('[data-content="health_safety_title"]', content.health_safety?.title);
        this.updateElement('[data-content="waiver_reminder_title"]', content.waiver_reminder?.title);
        this.updateElement('[data-content="waiver_reminder_description"]', content.waiver_reminder?.description);
        this.updateElement('[data-content="waiver_reminder_button"]', content.waiver_reminder?.button);
        this.updateElement('[data-content="contact_questions_title"]', content.contact_for_questions?.title);
        this.updateElement('[data-content="contact_questions_description"]', content.contact_for_questions?.description);
        this.updateElement('[data-content="contact_questions_button"]', content.contact_for_questions?.button);
    }

    // Populate partnership page content
    populatePartnershipPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="hero_description"]', content.hero_section?.description);
        this.updateElement('[data-content="partnership_content_title"]', content.partnership_content?.title);
        this.updateElement('[data-content="partnership_content_description"]', content.partnership_content?.description);
        this.updateElement('[data-content="we_can_provide_title"]', content.we_can_provide?.title);
        this.updateElement('[data-content="we_welcome_partners_title"]', content.we_welcome_partners_who?.title);
        this.updateElement('[data-content="partnership_form_title"]', content.partnership_form?.title);
        this.updateElement('[data-content="partnership_form_description"]', content.partnership_form?.description);
    }

    // Populate waiver page content
    populateWaiverPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_description"]', content.hero_section?.description);
        this.updateElement('[data-content="waiver_content_title"]', content.waiver_content?.title);
        this.updateElement('[data-content="company"]', content.waiver_content?.company);
        this.updateElement('[data-content="document_type"]', content.waiver_content?.document_type);
        this.updateElement('[data-content="waiver_note_1"]', content.waiver_note?.note_1);
        this.updateElement('[data-content="waiver_note_2"]', content.waiver_note?.note_2);
    }

    // Populate gallery page content
    populateGalleryPage(content) {
        this.updateElement('[data-content="hero_title"]', content.hero_section?.title);
        this.updateElement('[data-content="hero_subtitle"]', content.hero_section?.subtitle);
        this.updateElement('[data-content="hero_description"]', content.hero_section?.description);
        this.updateElement('[data-content="gallery_cta_title"]', content.gallery_cta?.title);
        this.updateElement('[data-content="gallery_cta_description"]', content.gallery_cta?.description);
        this.updateElement('[data-content="gallery_cta_contact"]', content.gallery_cta?.buttons);
        this.updateElement('[data-content="gallery_cta_party"]', content.gallery_cta?.buttons);
    }

    // Populate common elements across all pages
    populateCommonElements() {
        if (!this.content.general_website_content) return;
        
        const general = this.content.general_website_content;
        
        // Navigation menu
        this.updateElement('[data-content="company_name"]', general.company_information?.company_name);
        
        // Company info in footer
        this.updateElement('[data-content="company_address"]', general.company_information?.address);
        this.updateElement('[data-content="company_email"]', general.company_information?.email);
        this.updateElement('[data-content="company_hours"]', general.company_information?.hours);
        
        // Social media links
        this.updateElement('[data-content="facebook_link"]', general.social_media_links?.facebook);
        this.updateElement('[data-content="instagram_link"]', general.social_media_links?.instagram);
        this.updateElement('[data-content="tiktok_link"]', general.social_media_links?.tiktok);
        
        // Meta descriptions
        if (this.currentPage === 'home') {
            this.updateMetaDescription(general.meta_descriptions?.home);
        } else if (this.currentPage === 'about') {
            this.updateMetaDescription(general.meta_descriptions?.about);
        } else if (this.currentPage === 'menu') {
            this.updateMetaDescription(general.meta_descriptions?.menu);
        } else if (this.currentPage === 'party') {
            this.updateMetaDescription(general.meta_descriptions?.party);
        } else if (this.currentPage === 'contact') {
            this.updateMetaDescription(general.meta_descriptions?.contact);
        } else if (this.currentPage === 'waiver') {
            this.updateMetaDescription(general.meta_descriptions?.waiver);
        }
    }

    // Update element content using data-content attributes
    updateElement(selector, content) {
        if (!content) {
            console.log('No content provided for selector:', selector);
            return;
        }
        
        const elements = document.querySelectorAll(selector);
        console.log(`Found ${elements.length} elements for selector: ${selector} with content: ${content}`);
        
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = content;
            } else if (element.tagName === 'A') {
                element.textContent = content;
            } else {
                element.textContent = content;
            }
            console.log(`Updated element: ${selector} with content: ${content}`);
        });
    }

    // Update meta description
    updateMetaDescription(description) {
        if (!description) return;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }
    }

    // Fallback content if file loading fails
    useFallbackContent() {
        console.log('Using fallback content');
        // You can add hardcoded fallback content here if needed
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing ContentLoader...');
    const contentLoader = new ContentLoader();
    contentLoader.loadContent();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
}
