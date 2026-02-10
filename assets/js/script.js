// script.js - Modern Portfolio with Dark Mode & Fixed Skill Bars

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Dark Mode Functionality
    function initDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;
        
        // Check for saved theme or prefer-color-scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            html.setAttribute('data-theme', 'dark');
            themeIcon.className = 'bi bi-moon';
        } else {
            html.setAttribute('data-theme', 'light');
            themeIcon.className = 'bi bi-sun';
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                html.setAttribute('data-theme', 'dark');
                themeIcon.className = 'bi bi-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                html.setAttribute('data-theme', 'light');
                themeIcon.className = 'bi bi-sun';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Fixed Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        const skillBarsContainer = document.querySelector('.skill-bars');
        
        if (!skillBarsContainer || skillBars.length === 0) return;
        
        let hasAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    skillBars.forEach((bar, index) => {
                        const progressBar = bar.querySelector('.progress-bar');
                        if (progressBar) {
                            const width = progressBar.getAttribute('data-width') || 
                                         progressBar.style.width || 
                                         '0%';
                            
                            // Store target width if not already stored
                            if (!progressBar.getAttribute('data-width')) {
                                progressBar.setAttribute('data-width', width);
                            }
                            
                            // Reset to 0 and force reflow
                            progressBar.style.width = '0';
                            progressBar.offsetHeight;
                            
                            // Animate after delay
                            setTimeout(() => {
                                progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                                progressBar.style.width = width;
                                
                                // Mark as animated to prevent re-animation
                                progressBar.classList.add('animated');
                            }, index * 150);
                        }
                    });
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(skillBarsContainer);
        
        // If skill bars are already in view on load, animate them
        const rect = skillBarsContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            const event = new IntersectionObserverEntry({
                target: skillBarsContainer,
                isIntersecting: true,
                intersectionRatio: 1
            });
            observer.observe(skillBarsContainer);
            // Trigger manually
            setTimeout(() => {
                const entries = [{
                    target: skillBarsContainer,
                    isIntersecting: true,
                    intersectionRatio: 1
                }];
                observer.callback(entries, observer);
            }, 500);
        }
    }

    // Initialize all components
    function initializeAll() {
        initDarkMode();
        initSkillBars();
        initMobileMenu();
        initTypedText();
        initBackToTop();
        initSmoothScroll();
        initContactForm();
        initNavLinkActive();
        initKeepAlive();
        initProjectCardHover();
    }

    // Mobile Navigation Toggle
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.innerHTML = navLinks.classList.contains('active') ? 
                    '<i class="bi bi-x"></i>' : 
                    '<i class="bi bi-list"></i>';
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                });
            });
        }
    }

    // Typed.js initialization
    function initTypedText() {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            const typed = new Typed('.typed-text', {
                strings: ['MERN Developer', 'Discord Bot Developer', 'FiveM Developer', 'Backend Specialist'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });

            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Contact Form Submission
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Show loading state
                const loading = contactForm.querySelector('.loading');
                const errorMessage = contactForm.querySelector('.error-message');
                const successMessage = contactForm.querySelector('.sent-message');
                
                loading.style.display = 'block';
                errorMessage.style.display = 'none';
                successMessage.style.display = 'none';
                
                // Gather form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.querySelector('textarea[name="message"]').value,
                    timestamp: new Date().toISOString()
                };
                
                try {
                    // Send to your API endpoint
                    const response = await fetch('https://api.pixelnomad.pro/api/v1/dev/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const data = await response.json();
                    
                    loading.style.display = 'none';
                    
                    if (response.ok) {
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    } else {
                        throw new Error(data.message || 'Failed to send message. Please try again.');
                    }
                } catch (error) {
                    loading.style.display = 'none';
                    errorMessage.textContent = error.message;
                    errorMessage.style.display = 'block';
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 5000);
                }
            });
        }
    }

    // Add active class to nav links based on scroll position
    function initNavLinkActive() {
        const sections = document.querySelectorAll('section[id]');
        
        const activateNavLink = () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    if (navLink) navLink.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', activateNavLink);
        activateNavLink(); // Initial call
    }

    // Keep-alive ping to your API
    function initKeepAlive() {
fetch('https://api.pixelnomad.pro/api/v1/dev/ping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ping: true })
            }).catch(() => {
                // Silently fail - this is just a keep-alive
            });
        setInterval(() => {
            fetch('https://api.pixelnomad.pro/api/v1/dev/ping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ping: true })
            }).catch(() => {
                // Silently fail - this is just a keep-alive
            });
        }, 300000); // Every 5 minutes
    }

    // Add hover effect to project cards
    function initProjectCardHover() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize everything
    initializeAll();
    
    // Debug: Check if skill bars are working
    console.log('Portfolio initialized successfully');
    console.log('Skill bars found:', document.querySelectorAll('.skill-bar').length);
});//
