document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation Toggle ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ========== Navbar Scroll Effect ==========
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== Project Filtering ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
    
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Back to Top Button ==========
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        backToTopButton.classList.toggle('active', window.scrollY > 300);
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== Contact Form Submission ==========
    // Form submission - UPDATED VERSION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Set loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Client-side validation
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields');
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // TEST CONNECTION FIRST - NEW
            try {
                const testResponse = await fetch('http://localhost:3001/health', {
                    mode: 'cors',
                    credentials: 'include'
                });
                
                if (!testResponse.ok) {
                    throw new Error('Backend not responding');
                }
            } catch (testError) {
                console.error('Connection test failed:', testError);
                throw new Error('Cannot connect to server. Please try again later.');
            }
            
            // MAIN FORM SUBMISSION - UPDATED
            const response = await fetch('http://localhost:3001/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                mode: 'cors',
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to send message');
            }
            
            const data = await response.json();
            alert('Message sent successfully!');
            contactForm.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
    
    // ========== Alert Helper Function ==========
    function showAlert(type, message) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert ${type}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 3000);
    }
    
    // ========== Animate Skill Bars ==========
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = width, 100);
        });
    }
    
    // ========== GSAP Animations ==========
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section
    gsap.from('.hero-content', { duration: 1, x: -100, opacity: 0, ease: "power3.out" });
    gsap.from('.hero-image', { duration: 1, x: 100, opacity: 0, ease: "power3.out", delay: 0.2 });
    
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: { trigger: title, start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 0.8
        });
    });
    
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 0.8, delay: i * 0.1
        });
    });
    
    // Skills section
    gsap.from('.skills-technical', {
        scrollTrigger: { trigger: '.skills-technical', start: "top 80%", toggleActions: "play none none none" },
        x: -50, opacity: 0, duration: 0.8
    });
    
    gsap.from('.skills-other', {
        scrollTrigger: { trigger: '.skills-other', start: "top 80%", toggleActions: "play none none none" },
        x: 50, opacity: 0, duration: 0.8, delay: 0.2
    });
    
    // Coding profiles
    gsap.utils.toArray('.profile-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            y: 50, opacity: 0, duration: 0.8, delay: i * 0.1
        });
    });
    
    // Contact section
    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact-info', start: "top 80%", toggleActions: "play none none none" },
        x: -50, opacity: 0, duration: 0.8
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: { trigger: '.contact-form', start: "top 80%", toggleActions: "play none none none" },
        x: 50, opacity: 0, duration: 0.8, delay: 0.2
    });
    
    // Floating Bitmoji
    gsap.to('.hero-image .bitmoji', {
        y: 20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
    });
    
    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('success', `Thank you for subscribing with ${email}!`);
                this.reset();
            } else {
                showAlert('error', 'Please enter a valid email address');
            }
        });
    }
});