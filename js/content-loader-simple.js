// Simple Content Loader for Little Playroom Cafe
// This script automatically loads content from content/website-content.txt
// and populates the HTML elements dynamically

class SimpleContentLoader {
    constructor() {
        this.content = null;
        this.currentPage = this.getCurrentPage();
        console.log('SimpleContentLoader initialized for page:', this.currentPage);
    }

    // Get current page name from URL
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
            
            // Parse the content manually for now
            this.content = this.parseContentSimple(text);
            console.log('Parsed content:', this.content);
            
            this.populatePage();
        } catch (error) {
            console.error('Failed to load content:', error);
        }
    }

    // Simple content parser
    parseContentSimple(text) {
        const content = {};
        
        // Extract main title from the content file
        const mainTitleMatch = text.match(/- Main title: "([^"]+)"/);
        if (mainTitleMatch) {
            content.main_title = mainTitleMatch[1];
            console.log('Found main title:', content.main_title);
        }
        
        // Extract welcome text
        const welcomeMatch = text.match(/- Welcome text: "([^"]+)"/);
        if (welcomeMatch) {
            content.welcome_text = welcomeMatch[1];
            console.log('Found welcome text:', content.welcome_text);
        }
        
        // Extract subtitle
        const subtitleMatch = text.match(/- Subtitle: "([^"]+)"/);
        if (subtitleMatch) {
            content.subtitle = subtitleMatch[1];
            console.log('Found subtitle:', content.subtitle);
        }
        
        // Extract description
        const descMatch = text.match(/- Description: "([^"]+)"/);
        if (descMatch) {
            content.description = descMatch[1];
            console.log('Found description:', content.description);
        }
        
        // Extract CTA button
        const ctaMatch = text.match(/- CTA button: "([^"]+)"/);
        if (ctaMatch) {
            content.cta_button = ctaMatch[1];
            console.log('Found CTA button:', content.cta_button);
        }
        
        // Extract tagline title
        const taglineMatch = text.match(/- Title: "([^"]+)"/);
        if (taglineMatch) {
            content.tagline_title = taglineMatch[1];
            console.log('Found tagline title:', content.tagline_title);
        }
        
        // Extract tagline description
        const taglineDescMatch = text.match(/- Description: "([^"]+)"/);
        if (taglineDescMatch) {
            content.tagline_description = taglineDescMatch[1];
            console.log('Found tagline description:', content.tagline_description);
        }
        
        return content;
    }

    // Populate the current page with loaded content
    populatePage() {
        if (!this.content) {
            console.warn('No content to populate');
            return;
        }

        console.log('Populating page with content:', this.content);
        
        // Update all elements with data-content attributes
        this.updateAllElements();
    }

    // Update all elements with data-content attributes
    updateAllElements() {
        // Find all elements with data-content attributes
        const elements = document.querySelectorAll('[data-content]');
        console.log(`Found ${elements.length} elements with data-content attributes`);
        
        elements.forEach(element => {
            const contentKey = element.getAttribute('data-content');
            const contentValue = this.content[contentKey];
            
            if (contentValue) {
                console.log(`Updating ${contentKey} with: ${contentValue}`);
                element.textContent = contentValue;
            } else {
                console.log(`No content found for key: ${contentKey}`);
            }
        });
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing SimpleContentLoader...');
    const contentLoader = new SimpleContentLoader();
    contentLoader.loadContent();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleContentLoader;
}
