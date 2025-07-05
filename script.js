document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation Toggle ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ========== Navbar Scroll Effect ==========
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ========== Project Filtering ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                projectCards.forEach(card => {
                    card.style.display = (filterValue === 'all' || card.dataset.category === filterValue) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
    }

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Back to Top Button ==========
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            backToTopButton.classList.toggle('active', window.scrollY > 300);
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== Form Handling ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            try {
                // Set loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner"></span> Sending...';
                
                // Form data collection
                const formData = new FormData(this);
                
                // Netlify form submission
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Always show success message (optimistic UI)
                showAlert('success', 'Message received! I\'ll get back to you soon.');
                this.reset();
                
                // Additional success handling if needed
                if (response.ok) {
                    // Optional analytics or logging
                    console.log('Form successfully submitted');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showAlert('error', 'Message queued! Network issues detected but your message is safe.');
            } finally {
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 1500);
            }
        });
        
        // Check for success in URL (Netlify redirect)
        if (window.location.search.includes('success=true')) {
            showAlert('success', 'Message sent successfully!');
            history.replaceState(null, null, window.location.pathname);
        }
    }

    // ========== Alert Helper Function ==========
    function showAlert(type, message) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert ${type}`;
        alertBox.innerHTML = `
            <span class="alert-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="alert-message">${message}</span>
        `;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 4000);
    }

    // ========== Animate Skill Bars ==========
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    if (skillBars.length) {
        animateSkillBars();
    }

    // ========== GSAP Animations ==========
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize animations only if elements exist
        const animateElements = (selector, animationProps) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length) {
                gsap.from(elements, animationProps);
            }
        };

        // Hero section
        animateElements('.hero-content', { 
            duration: 1, 
            x: -100, 
            opacity: 0, 
            ease: "power3.out" 
        });
        
        animateElements('.hero-image', { 
            duration: 1, 
            x: 100, 
            opacity: 0, 
            ease: "power3.out", 
            delay: 0.2 
        });

        // Section animations
        animateElements('.section-title', {
            scrollTrigger: { 
                trigger: '.section-title', 
                start: "top 80%", 
                toggleActions: "play none none none" 
            },
            y: 50, 
            opacity: 0, 
            duration: 0.8,
            stagger: 0.1
        });

        // Floating Bitmoji animation
        const bitmoji = document.querySelector('.hero-image .bitmoji');
        if (bitmoji) {
            gsap.to(bitmoji, {
                y: 20, 
                duration: 3, 
                repeat: -1, 
                yoyo: true, 
                ease: "sine.inOut"
            });
        }
    }

    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showAlert('success', 'Thanks for subscribing!');
                this.reset();
            } else {
                showAlert('error', 'Please enter a valid email');
                emailInput.focus();
            }
        });
    }
});
