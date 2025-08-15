// Mobile Navigation Toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking the close button (using event delegation)
    navMenu.addEventListener('click', (e) => {
        // Check if click is on the close button area (top-right corner)
        const rect = navMenu.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Close button area (top-right 60px x 60px)
        if (clickX > rect.width - 60 && clickY < 60) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Smooth scrolling for anchor links only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function for homepage
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
        navbar.style.transform = 'translateX(-50%) scale(0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateX(-50%) scale(1)';
    }
});

// Fancy Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create Intersection Observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function observeElements() {
    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        scrollObserver.observe(section);
    });

    // Animate cards and items
    const cards = document.querySelectorAll('.quick-nav-item, .feature-item, .benefit-item, .qualification-item, .contact-item, .menu-category, .party-features .feature-item, .pricing-item, .slot-item');
    cards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Animate text elements
    const textElements = document.querySelectorAll('h1, h2, h3, p, .about-text, .party-content, .contact-form, .waiver-form');
    textElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.05}s`;
        scrollObserver.observe(element);
    });

    // Animate images
    const images = document.querySelectorAll('img, .hero-image, .about-image, .gallery-item');
    images.forEach((image, index) => {
        image.classList.add('scroll-animate');
        image.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(image);
    });

    // Animate buttons
    const buttons = document.querySelectorAll('.cta-button, .read-more-btn, .book-now-btn, .submit-btn, .menu-btn');
    buttons.forEach((button, index) => {
        button.classList.add('scroll-animate');
        button.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(button);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});

// // Parallax effect for hero sections
// function parallaxEffect() {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero, .about-hero, .menu-hero, .party-hero, .contact-hero, .waiver-hero');
    
//     parallaxElements.forEach(element => {
//         const speed = 0.1;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// }

// Add parallax effect to scroll
window.addEventListener('scroll', debounce(parallaxEffect, 10));

// Staggered animation for lists
function animateListItems() {
    const lists = document.querySelectorAll('ul li, .menu-categories li, .party-features li');
    lists.forEach((item, index) => {
        item.classList.add('scroll-animate');
        item.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(item);
    });
}

// Call staggered animation
document.addEventListener('DOMContentLoaded', () => {
    animateListItems();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        const captcha = this.querySelector('input[type="number"]').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (captcha !== '21') {
            showNotification('Please enter the correct answer to the math problem.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Button click handlers
document.querySelectorAll('.cta-button, .gift-card-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const buttonText = this.textContent;
        
        if (buttonText.includes('gift card')) {
            showNotification('Gift card purchase form will open shortly.', 'info');
            // In a real implementation, this would open a gift card purchase form
            setTimeout(() => {
                window.open('#', '_blank');
            }, 1000);
        }
    });
});

// Enhanced Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
function observeElements() {
    const elementsToObserve = [
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('.quick-nav-item'),
        ...document.querySelectorAll('.feature-item'),
        ...document.querySelectorAll('.hero-image'),
        ...document.querySelectorAll('.cta-button'),
        ...document.querySelectorAll('.gallery-item'),
        ...document.querySelectorAll('.decor-package'),
        ...document.querySelectorAll('.rules-category'),
        ...document.querySelectorAll('.health-item'),
        ...document.querySelectorAll('.addon-item'),
        ...document.querySelectorAll('.contact-form'),
        ...document.querySelectorAll('.waiver-form'),
        ...document.querySelectorAll('.menu-category'),
        ...document.querySelectorAll('.party-features .feature-item'),
        ...document.querySelectorAll('.slots-grid .slot'),
        ...document.querySelectorAll('.pricing-details .detail'),
        ...document.querySelectorAll('.contact-info-partnership .contact-item'),
        ...document.querySelectorAll('h1, h2, h3'),
        ...document.querySelectorAll('p'),
        ...document.querySelectorAll('img'),
        ...document.querySelectorAll('button'),
        ...document.querySelectorAll('ul li'),
        ...document.querySelectorAll('.form-group'),
        ...document.querySelectorAll('.menu-tab'),
        ...document.querySelectorAll('.menu-item')
    ];

    elementsToObserve.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Animate list items with staggered delay
function animateListItems() {
    const lists = document.querySelectorAll('ul li');
    lists.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Gallery functionality
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let filteredItems = Array.from(galleryItems);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update filtered items array
            filteredItems = Array.from(galleryItems).filter(item => {
                const category = item.getAttribute('data-category');
                return filter === 'all' || category === filter;
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay ? overlay.querySelector('h3').textContent : '';
            const description = overlay ? overlay.querySelector('p').textContent : '';
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = title;
            currentImageIndex = filteredItems.indexOf(item);
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navigation in lightbox
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
        const item = filteredItems[currentImageIndex];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h3').textContent : '';
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
        const item = filteredItems[currentImageIndex];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h3').textContent : '';
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
                break;
            case 'ArrowLeft':
                prevBtn.click();
                break;
            case 'ArrowRight':
                nextBtn.click();
                break;
        }
    });
}

// Party decoration booking functionality
function initDecorBooking() {
    const decorForm = document.getElementById('decorBookingForm');
    const bookButtons = document.querySelectorAll('.book-decor-btn');
    
    if (decorForm) {
        decorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you! Your decoration booking request has been submitted. We will contact you within 24 hours to confirm your reservation.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Book button functionality
    bookButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const package = this.getAttribute('data-package');
            const packageSelect = document.getElementById('decorPackage');
            
            if (packageSelect) {
                packageSelect.value = package;
                packageSelect.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Partnership form functionality
function initPartnershipForm() {
    const partnershipForm = document.getElementById('partnershipForm');
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your partnership inquiry! We will review your information and contact you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Reservation calendar functionality
function initReservationCalendar() {
    const calendar = document.getElementById('calendar');
    const reservationForm = document.getElementById('reservationForm');
    const dateInput = document.getElementById('resDate');
    
    if (!calendar) return;
    
    let currentDate = new Date();
    let selectedDate = null;
    
    // Sample booked dates (in a real app, this would come from a database)
    const bookedDates = [
        '2024-02-15',
        '2024-02-20',
        '2024-02-25',
        '2024-03-01',
        '2024-03-05'
    ];
    
    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const calendarHTML = `
            <div class="calendar-header">
                <button class="calendar-nav" onclick="changeMonth(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="calendar-title">${monthNames[month]} ${year}</div>
                <button class="calendar-nav" onclick="changeMonth(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day">Sun</div>
                <div class="calendar-day">Mon</div>
                <div class="calendar-day">Tue</div>
                <div class="calendar-day">Wed</div>
                <div class="calendar-day">Thu</div>
                <div class="calendar-day">Fri</div>
                <div class="calendar-day">Sat</div>
        `;
        
        const today = new Date();
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 14); // 2 weeks from today
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            if (date.getMonth() === month) {
                const dateString = date.toISOString().split('T')[0];
                const isToday = date.toDateString() === today.toDateString();
                const isBooked = bookedDates.includes(dateString);
                const isPast = date < today;
                const isTooSoon = date < minDate;
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                
                let className = 'calendar-date';
                let clickHandler = '';
                
                if (isToday) {
                    className += ' today';
                }
                if (isSelected) {
                    className += ' selected';
                }
                if (isBooked) {
                    className += ' booked';
                } else if (isPast || isTooSoon) {
                    className += ' unavailable';
                } else {
                    className += ' available';
                    clickHandler = `onclick="selectDate('${dateString}')"`;
                }
                
                calendarHTML += `<div class="${className}" ${clickHandler}>${date.getDate()}</div>`;
            } else {
                calendarHTML += '<div class="calendar-date"></div>';
            }
        }
        
        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }
    
    // Global functions for calendar navigation
    window.changeMonth = function(delta) {
        currentDate.setMonth(currentDate.getMonth() + delta);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    };
    
    window.selectDate = function(dateString) {
        selectedDate = new Date(dateString);
        
        // Update form date input
        if (dateInput) {
            dateInput.value = dateString;
        }
        
        // Regenerate calendar to show selection
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        
        // Show notification
        showNotification(`Date selected: ${selectedDate.toLocaleDateString()}. Please complete the form below.`, 'info');
    };
    
    // Initialize calendar
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    
    // Form submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate date (must be at least 2 weeks from today)
            const selectedDate = new Date(data.date);
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 14);
            
            if (selectedDate < minDate) {
                showNotification('Reservations must be made at least 2 weeks in advance.', 'error');
                return;
            }
            
            // Check if date is already booked
            if (bookedDates.includes(data.date)) {
                showNotification('This date is already booked. Please select another date.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you! Your reservation request has been submitted. The owner will contact you within 24 hours during business hours to confirm your booking.', 'success');
            
            // Reset form
            this.reset();
            selectedDate = null;
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
    }
    
    // Set minimum date for date input
    if (dateInput) {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 14);
        dateInput.min = minDate.toISOString().split('T')[0];
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize scroll animations
    observeElements();
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Initialize list animations
    animateListItems();
    
    // Initialize gallery (if on gallery page)
    if (document.querySelector('.gallery-grid')) {
        initGallery();
    }
    
    // Initialize decoration booking (if on decor page)
    if (document.querySelector('.decor-booking')) {
        initDecorBooking();
    }
    
    // Initialize partnership form (if on partnership page)
    if (document.querySelector('.partnership-form')) {
        initPartnershipForm();
    }
    
    // Initialize reservation calendar (if on reservation page)
    if (document.querySelector('.calendar')) {
        initReservationCalendar();
    }
    
    // Add fadeIn animation for gallery
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .gallery-item {
            opacity: 0;
            animation: fadeIn 0.6s ease forwards;
        }
        
        .gallery-item:nth-child(1) { animation-delay: 0.1s; }
        .gallery-item:nth-child(2) { animation-delay: 0.2s; }
        .gallery-item:nth-child(3) { animation-delay: 0.3s; }
        .gallery-item:nth-child(4) { animation-delay: 0.4s; }
        .gallery-item:nth-child(5) { animation-delay: 0.5s; }
        .gallery-item:nth-child(6) { animation-delay: 0.6s; }
        .gallery-item:nth-child(7) { animation-delay: 0.7s; }
        .gallery-item:nth-child(8) { animation-delay: 0.8s; }
        .gallery-item:nth-child(9) { animation-delay: 0.9s; }
        .gallery-item:nth-child(10) { animation-delay: 1.0s; }
        .gallery-item:nth-child(11) { animation-delay: 1.1s; }
        .gallery-item:nth-child(12) { animation-delay: 1.2s; }
    `;
    document.head.appendChild(style);
});

// Add loading animation to images (if any are added later)
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image loading
preloadImages();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.concept-item, .feature-card, .testimonial-card, .hours-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click to copy functionality for contact information
document.querySelectorAll('.contact-item h4').forEach(contactInfo => {
    contactInfo.style.cursor = 'pointer';
    contactInfo.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`${text} copied to clipboard!`, 'success');
        }).catch(() => {
            showNotification('Could not copy to clipboard', 'error');
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for special interactions
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for special interactions
            console.log('Swipe down detected');
        }
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);