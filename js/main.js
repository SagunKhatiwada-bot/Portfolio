// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll to top button styles
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
    }
    
    .scroll-top-btn.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        background-color: #3a5bd9;
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        item.classList.toggle('active');
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (in a real application, you would send data to a server)
        showFormStatus('Sending message...', 'info');
        
        // Simulate server response after 2 seconds
        setTimeout(() => {
            showFormStatus('Your message has been sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status';
    
    if (type === 'success') {
        formStatus.classList.add('success');
    } else if (type === 'error') {
        formStatus.classList.add('error');
    } else {
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#f8f9fa';
        formStatus.style.color = '#6c757d';
        formStatus.style.border = '1px solid #e2e8f0';
    }
}

// Resume Download Button
const downloadResumeBtn = document.getElementById('download-resume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a dummy PDF link (in a real application, link to an actual PDF file)
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume PDF URL
        link.download = 'resume.pdf';
        link.click();
        
        // Show a message
        alert('Resume download started!');
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill, .service-card, .timeline-item, .certification-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .project-card, .skill, .service-card, .timeline-item, .certification-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(animationStyle);

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-content h1');

if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Project filter functionality (for a potential projects page)
const projectFilters = document.querySelectorAll('.project-filter');
const projectItems = document.querySelectorAll('.project-item');

if (projectFilters.length > 0 && projectItems.length > 0) {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            projectFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to current filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Theme switcher
const createThemeSwitcher = () => {
    const themeSwitch = document.createElement('div');
    themeSwitch.classList.add('theme-switch');
    themeSwitch.innerHTML = `
        <i class="fas fa-sun light-icon"></i>
        <i class="fas fa-moon dark-icon"></i>
    `;
    document.body.appendChild(themeSwitch);
    
    // Add theme switcher styles
    const themeSwitcherStyle = document.createElement('style');
    themeSwitcherStyle.textContent = `
        .theme-switch {
            position: fixed;
            top: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            z-index: 99;
            transition: all 0.3s ease;
        }
        
        .theme-switch:hover {
            transform: translateY(-3px);
        }
        
        .theme-switch .dark-icon {
            display: none;
        }
        
        body.dark-theme {
            background-color: #121212;
            color: #f8f9fa;
        }
        
        body.dark-theme .theme-switch .light-icon {
            display: none;
        }
        
        body.dark-theme .theme-switch .dark-icon {
            display: block;
        }
        
        body.dark-theme header,
        body.dark-theme .skill,
        body.dark-theme .project-card,
        body.dark-theme .service-card,
        body.dark-theme .contact-form,
        body.dark-theme .contact-info,
        body.dark-theme .certification-item {
            background-color: #1e1e1e;
            color: #f8f9fa;
        }
        
        body.dark-theme .hero,
        body.dark-theme .skills,
        body.dark-theme .about-hero,
        body.dark-theme .resume-hero,
        body.dark-theme .contact-hero {
            background-color: #121212;
        }
        
        body.dark-theme .nav-links a,
        body.dark-theme .logo h1,
        body.dark-theme .section-title,
        body.dark-theme .project-info h3,
        body.dark-theme .skill h3,
        body.dark-theme .service-card h3,
        body.dark-theme .about-text h2,
        body.dark-theme .resume-section-title,
        body.dark-theme .timeline-content h3,
        body.dark-theme .skill-category h3,
        body.dark-theme .contact-info h2,
        body.dark-theme .contact-form h2,
        body.dark-theme .info-details h3 {
            color: #f8f9fa;
        }
        
        body.dark-theme .hamburger .line {
            background-color: #f8f9fa;
        }
        
        body.dark-theme .form-group input,
        body.dark-theme .form-group textarea {
            background-color: #2d2d2d;
            border-color: #444;
            color: #f8f9fa;
        }
        
        body.dark-theme .skill-tag,
        body.dark-theme .project-tags span,
        body.dark-theme .service-icon,
        body.dark-theme .certification-icon,
        body.dark-theme .info-icon,
        body.dark-theme .social-links .social-icon {
            background-color: #2d2d2d;
            color: #f8f9fa;
        }
    `;
    document.head.appendChild(themeSwitcherStyle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme on click
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
};

// Initialize theme switcher
createThemeSwitcher();
