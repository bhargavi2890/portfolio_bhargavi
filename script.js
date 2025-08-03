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
            filterButtons.forEach(btn => btn.classList.remove('active'));
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========== Netlify Form Handling ==========
    const contactForm = document.querySelector('form[data-netlify="true"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        });
        
        // Check for success in URL
        if (window.location.search.includes('success=true')) {
            showAlert('success', 'Message sent successfully!');
            history.replaceState(null, null, window.location.pathname);
        }
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
    animateSkillBars();
    // Add this to the GSAP Animations section
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { 
            trigger: item, 
            start: "top 80%", 
            toggleActions: "play none none none" 
        },
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        delay: i * 0.1
    });
});
    // ========== GSAP Animations ==========
    if (typeof gsap !== 'undefined') {
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
        
        gsap.from('form[data-netlify="true"]', {
            scrollTrigger: { trigger: 'form[data-netlify="true"]', start: "top 80%", toggleActions: "play none none none" },
            x: 50, opacity: 0, duration: 0.8, delay: 0.2
        });
        
        // Floating Bitmoji
        gsap.to('.hero-image .bitmoji', {
            y: 20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
    }
    
    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('success', `Thank you for subscribing!`);
                this.reset();
            } else {
                showAlert('error', 'Please enter a valid email address');
            }
        });
    }
});
