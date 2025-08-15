// Footer Component Loader
// This script loads the footer component and embeds it into the page

class FooterLoader {
    constructor() {
        this.footerPlaceholder = '<!-- Footer -->';
        this.footerComponentPath = 'footer-component.html';
    }

    async loadFooter() {
        try {
            // Fetch the footer component
            const response = await fetch(this.footerComponentPath);
            if (!response.ok) {
                throw new Error(`Failed to load footer component: ${response.status}`);
            }
            
            const footerHTML = await response.text();
            
            // Find the footer placeholder comment and replace it
            this.replaceFooterPlaceholder(footerHTML);
            console.log('Footer component loaded successfully');
        } catch (error) {
            console.error('Error loading footer component:', error);
            // Fallback: load a basic footer if the component fails to load
            this.loadFallbackFooter();
        }
    }

    replaceFooterPlaceholder(footerHTML) {
        // Walk through all child nodes of the body
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_COMMENT,
            {
                acceptNode: function(node) {
                    return node.textContent.trim() === 'Footer' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        let commentNode;
        while (commentNode = walker.nextNode()) {
            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = footerHTML;
            const footerElement = temp.firstElementChild;
            
            // Replace the comment with the footer
            commentNode.parentNode.replaceChild(footerElement, commentNode);
            return; // Only replace the first occurrence
        }

        // Fallback: if no comment found, try to find the placeholder text
        const bodyText = document.body.innerHTML;
        if (bodyText.includes(this.footerPlaceholder)) {
            document.body.innerHTML = bodyText.replace(this.footerPlaceholder, footerHTML);
        } else {
            console.warn('Footer placeholder not found in the page');
        }
    }

    loadFallbackFooter() {
        const fallbackFooter = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <div class="footer-logo">
                                <img src="images/logo.svg" alt="Little Playroom Café Logo" class="footer-logo-img">
                                <h3>Little Playroom Café</h3>
                            </div>
                            <p>Not Your Ordinary Playground</p>
                            <div class="social-links">
                                <a href="https://www.facebook.com/share/176CcYP9hd/?mibextid=wwXIfr"><i class="fab fa-facebook"></i></a>
                                <a href="https://www.instagram.com/littleplayroom_cafe/profilecard/?igsh=MXhhZnFldG4zZ2du"><i class="fab fa-instagram"></i></a>
                                <a href="https://www.tiktok.com/@littleplayroomcafe?_t=ZP-8ydQzYplgul&_r=1"><i class="fab fa-tiktok"></i></a>
                            </div>
                        </div>
                        <div class="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="about.html">About</a></li>
                                <li><a href="menu.html">Menu</a></li>
                                <li><a href="party.html">Birthday Party</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Contact Info</h4>
                            <p><i class="fas fa-map-marker-alt"></i> 7956 Tree Lane, Madison, WI 53717</p>
                            <p><i class="fas fa-phone"></i> (608) 345-9528</p>
                            <p><i class="fas fa-envelope"></i> playroommadison@gmail.com</p>
                        </div>
                        <div class="footer-section">
                            <h4>Hours</h4>
                            <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                            <p>Saturday - Sunday: 10:00 AM - 9:00 PM</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 Little Playroom Café. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

        this.replaceFooterPlaceholder(fallbackFooter);
        console.log('Fallback footer loaded');
    }
}

// Initialize footer loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const footerLoader = new FooterLoader();
    footerLoader.loadFooter();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterLoader;
} 