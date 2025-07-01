// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeFAQ();
    initializeBackToTop();
    
    // Add smooth scrolling for anchor links
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
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    // Check if elements exist before adding event listeners
    if (hamburger && navMenu) {
        // Mobile menu toggle
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate floating elements in hero section
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // Add random floating animation delays
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${6 + index}s`;
    });

    // Animate partner logos
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // Clone the track for seamless loop
        const clone = partnersTrack.cloneNode(true);
        partnersTrack.parentNode.appendChild(clone);
    }
}

// Counter animation for stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Application functions
function applyForInternship(type) {
    // Construct Google Form URL with pre-filled internship type
    const formUrl = `https://forms.google.com/your-form-id?usp=pp_url&entry.123456789=${encodeURIComponent(type)}`;
    
    // Show loading animation
    showLoadingAnimation('Redirecting to application form...');
    
    // Redirect after short delay for better UX
    setTimeout(() => {
        window.open(formUrl, '_blank');
        hideLoadingAnimation();
    }, 1000);
}

function applyForDuration(duration) {
    // Construct Google Form URL with pre-filled duration
    const formUrl = `https://forms.google.com/your-form-id?usp=pp_url&entry.987654321=${encodeURIComponent(duration)}`;
    
    // Show loading animation
    showLoadingAnimation('Redirecting to application form...');
    
    // Redirect after short delay for better UX
    setTimeout(() => {
        window.open(formUrl, '_blank');
        hideLoadingAnimation();
    }, 1000);
}

function viewOfferLetter() {
    // Create modal for offer letter preview
    createModal('Offer Letter Preview', `
        <div class="document-preview">
            <div class="document-header">
                <img src="assets/logo.svg" alt="Skillinfy Logo" style="height: 40px;">
                <h2>INTERNSHIP OFFER LETTER</h2>
            </div>
            <div class="document-content">
                <p><strong>Dear [Student Name],</strong></p>
                <p>Congratulations! We are pleased to offer you an internship position at Skillinfy in the [Department] department.</p>
                <div class="offer-details">
                    <h3>Internship Details:</h3>
                    <ul>
                        <li><strong>Position:</strong> [Internship Role]</li>
                        <li><strong>Duration:</strong> [X] weeks</li>
                        <li><strong>Start Date:</strong> [Date]</li>
                        <li><strong>Stipend:</strong> [Amount] (if applicable)</li>
                        <li><strong>Location:</strong> Remote/On-site</li>
                    </ul>
                </div>
                <p>This offer is contingent upon successful completion of our screening process and submission of required documents.</p>
                <p>We look forward to having you join our team and contribute to exciting projects while gaining valuable industry experience.</p>
                <div class="signature-section">
                    <p><strong>Best regards,</strong></p>
                    <p>Skillinfy Recruitment Team</p>
                </div>
            </div>
        </div>
    `);
}

function viewSampleCertificate() {
    // Create modal for certificate preview
    createModal('Sample Certificate', `
        <div class="certificate-preview">
            <div class="certificate-border">
                <div class="certificate-header">
                    <img src="assets/logo.svg" alt="Skillinfy Logo" style="height: 50px;">
                    <h1>CERTIFICATE OF COMPLETION</h1>
                </div>
                <div class="certificate-content">
                    <p class="certificate-text">This is to certify that</p>
                    <h2 class="student-name">[STUDENT NAME]</h2>
                    <p class="certificate-text">has successfully completed the</p>
                    <h3 class="program-name">[INTERNSHIP PROGRAM NAME]</h3>
                    <p class="certificate-text">conducted by Skillinfy</p>
                    <div class="certificate-details">
                        <p>Duration: [X] weeks</p>
                        <p>Completion Date: [Date]</p>
                        <p>Grade: [Grade/Assessment]</p>
                    </div>
                </div>
                <div class="certificate-footer">
                    <div class="signature-left">
                        <div class="signature-line"></div>
                        <p>Program Director</p>
                    </div>
                    <div class="certificate-seal">
                        <div class="seal-circle">
                            <p>SKILLINFY</p>
                            <p>CERTIFIED</p>
                        </div>
                    </div>
                    <div class="signature-right">
                        <div class="signature-line"></div>
                        <p>Academic Head</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

// Modal creation function
function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-container" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="closeModal()">Close</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add CSS for modal
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    animation: fadeInModal 0.3s ease forwards;
                }
                
                .modal-container {
                    background: white;
                    border-radius: 20px;
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-xl);
                    transform: translateY(50px);
                    animation: slideInModal 0.3s ease forwards;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .modal-header h2 {
                    margin: 0;
                    color: var(--text-primary);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                }
                
                .modal-close:hover {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                }
                
                .modal-content {
                    padding: 2rem;
                }
                
                .modal-footer {
                    padding: 1rem 2rem 2rem;
                    text-align: right;
                }
                
                .document-preview, .certificate-preview {
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .document-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid var(--primary-color);
                }
                
                .document-header h2 {
                    color: var(--primary-color);
                    margin-top: 1rem;
                }
                
                .document-content {
                    line-height: 1.8;
                    color: var(--text-secondary);
                }
                
                .offer-details {
                    background: var(--bg-secondary);
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin: 1.5rem 0;
                }
                
                .offer-details h3 {
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }
                
                .offer-details ul {
                    list-style: none;
                    padding: 0;
                }
                
                .offer-details li {
                    margin-bottom: 0.5rem;
                }
                
                .signature-section {
                    margin-top: 2rem;
                    text-align: left;
                }
                
                .certificate-border {
                    border: 8px solid var(--primary-color);
                    padding: 2rem;
                    border-radius: 15px;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                }
                
                .certificate-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .certificate-header h1 {
                    color: var(--primary-color);
                    font-size: 2rem;
                    margin-top: 1rem;
                    letter-spacing: 2px;
                }
                
                .certificate-content {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .certificate-text {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    margin: 0.5rem 0;
                }
                
                .student-name {
                    font-size: 2.5rem;
                    color: var(--primary-color);
                    margin: 1rem 0;
                    font-weight: 700;
                }
                
                .program-name {
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    margin: 1rem 0;
                }
                
                .certificate-details {
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 10px;
                }
                
                .certificate-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    margin-top: 2rem;
                }
                
                .signature-line {
                    width: 120px;
                    height: 2px;
                    background: var(--text-secondary);
                    margin-bottom: 0.5rem;
                }
                
                .seal-circle {
                    width: 80px;
                    height: 80px;
                    border: 3px solid var(--primary-color);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--primary-color);
                }
                
                @keyframes fadeInModal {
                    to { opacity: 1; }
                }
                
                @keyframes slideInModal {
                    to { transform: translateY(0); }
                }
                
                @media (max-width: 768px) {
                    .modal-container {
                        margin: 1rem;
                        max-width: calc(100vw - 2rem);
                    }
                    
                    .modal-header, .modal-content, .modal-footer {
                        padding: 1rem;
                    }
                    
                    .certificate-border {
                        padding: 1rem;
                    }
                    
                    .student-name {
                        font-size: 2rem;
                    }
                    
                    .certificate-footer {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeInModal 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Loading animation functions
function showLoadingAnimation(message = 'Loading...') {
    const loadingHTML = `
        <div class="loading-overlay">
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-message">${message}</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
    
    // Add loading styles if not already present
    if (!document.querySelector('#loading-styles')) {
        const loadingStyles = `
            <style id="loading-styles">
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10001;
                }
                
                .loading-container {
                    text-align: center;
                }
                
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid var(--border-color);
                    border-top: 4px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                .loading-message {
                    color: var(--text-primary);
                    font-weight: 500;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', loadingStyles);
    }
}

function hideLoadingAnimation() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form validation helper (for future use)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

// Analytics tracking (placeholder for future integration)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with analytics services like Google Analytics
    console.log('Analytics Event:', eventName, eventData);
    
    // Example: gtag('event', eventName, eventData);
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to logging service
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
