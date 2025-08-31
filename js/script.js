// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Smooth reveal for quote text
    const quote = document.querySelector('.quote');
    if (quote) {
        const text = quote.textContent;
        quote.textContent = '';
        let currentCharIndex = 0;
        
        function revealNextChar() {
            if (currentCharIndex < text.length) {
                quote.textContent += text[currentCharIndex];
                currentCharIndex++;
                setTimeout(revealNextChar, 50);
            }
        }
        
        // Start the reveal animation after a short delay
        setTimeout(revealNextChar, 500);
    }

    // Handle profile image loading
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        // Add a fallback in case the image doesn't load
        profileImage.onerror = function() {
            this.src = 'https://via.placeholder.com/350x350.png?text=Muhammad+Noman';
            console.log('Profile image failed to load, using placeholder');
        };
        
        // Force reload the image to ensure it's displayed
        const currentSrc = profileImage.src;
        profileImage.src = '';
        setTimeout(() => {
            profileImage.src = currentSrc + '?t=' + new Date().getTime();
        }, 100);
    }

    // Typing effect
    const typingText = document.getElementById('typing-text');
    const textToType = "Muhammad Noman";
    let i = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 150;
    let pauseEnd = 2000;

    function typeWriter() {
        // Current text
        if (isDeleting) {
            text = textToType.substring(0, text.length - 1);
        } else {
            text = textToType.substring(0, text.length + 1);
        }

        typingText.textContent = text;

        // Typing speed
        let speed = isDeleting ? typingSpeed / 2 : typingSpeed;

        // If full text is typed
        if (!isDeleting && text === textToType) {
            speed = pauseEnd; // Pause at end
            isDeleting = true;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            speed = 500; // Pause before starting again
        }

        setTimeout(typeWriter, speed);
    }

    // Start the typing effect
    setTimeout(typeWriter, 1000);

    // Theme toggle functionality with enhanced animation
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Check for saved theme preference, default to dark theme if none saved
    const currentTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = currentTheme; // Set the theme class
    updateThemeIcon(currentTheme === 'dark-theme');
    
    // Add theme transition effect
    body.style.transition = 'all 0.3s ease';
    
    // Initialize with our new beautiful theme
    console.log('Theme loaded:', currentTheme);

    // Toggle theme with enhanced animation
    themeToggle.addEventListener('click', function() {
        themeToggle.style.transform = 'scale(1.1) rotate(180deg)';
        setTimeout(() => {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
                updateThemeIcon(false);
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                updateThemeIcon(true);
            }
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(180deg)';
            }, 200);
        }, 300);
    });

    // Update theme icon with smooth transition
    function updateThemeIcon(isDark) {
        themeIcon.style.transform = 'scale(0)';
        setTimeout(() => {
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            themeIcon.style.transform = 'scale(1)';
        }, 150);
    }

    // Navbar scroll effect with enhanced transition
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Hide scroll down arrow on scroll
    const scrollDown = document.querySelector('.scroll-down');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollDown.classList.add('hidden');
        } else {
            scrollDown.classList.remove('hidden');
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skills progress bar animation
    const skillsSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    function animateSkills() {
        if (isInViewport(skillsSection) && !animated) {
            progressBars.forEach(progress => {
                const value = progress.getAttribute('data-progress');
                progress.style.width = value + '%';
            });
            animated = true;
        }
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Initial check and add scroll event for skills animation
    animateSkills();
    window.addEventListener('scroll', animateSkills);

    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit form using fetch
            fetch('https://formspree.io/f/xldjwnrl', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Show success message
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset(); // Clear the form
                } else {
                    // Show error message
                    alert('Oops! There was a problem sending your message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem sending your message. Please try again.');
            });
        });
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Progress bar animation
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        const percentElements = document.querySelectorAll('.percent');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const progressBar = entry.target;
                const index = Array.from(progressBars).indexOf(progressBar);
                const percentElement = percentElements[index];
                const targetProgress = parseInt(progressBar.getAttribute('data-progress'));
                
                if (entry.isIntersecting) {
                    // Reset and animate when coming into view
                    progressBar.style.width = '0%';
                    if (percentElement) {
                        percentElement.textContent = '0%';
                    }
                    
                    let currentProgress = 0;
                    const duration = 1500;
                    const interval = 16;
                    const steps = duration / interval;
                    const increment = targetProgress / steps;
                    
                    const animation = setInterval(() => {
                        currentProgress += increment;
                        if (currentProgress >= targetProgress) {
                            currentProgress = targetProgress;
                            clearInterval(animation);
                        }
                        
                        progressBar.style.width = `${currentProgress}%`;
                        if (percentElement) {
                            percentElement.textContent = `${Math.round(currentProgress)}%`;
                        }
                    }, interval);
                } else {
                    // Reset when out of view
                    progressBar.style.width = '0%';
                    if (percentElement) {
                        percentElement.textContent = '0%';
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px'
        });

        // Observe each progress bar
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Handle about image loading
    function handleAboutImage() {
        const aboutImg = document.querySelector('.about-img img');
        if (aboutImg) {
            // Preload the image
            const img = new Image();
            img.src = aboutImg.src;
            
            img.onload = function() {
                aboutImg.parentElement.classList.remove('loading');
            };
            
            img.onerror = function() {
                aboutImg.src = 'https://via.placeholder.com/600x800?text=Muhammad+Noman';
                aboutImg.parentElement.classList.remove('loading');
                console.log('About image failed to load, using placeholder');
            };
        }
    }

    // Handle about image animation
    function initAboutAnimation() {
        const aboutImg = document.querySelector('.about-img');
        const particles = document.querySelector('.particles');
        
        // Create additional particles dynamically
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particles.appendChild(particle);
        }

        // Add mousemove effect
        aboutImg.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = aboutImg.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            aboutImg.style.transform = `
                perspective(1000px)
                rotateY(${(x - 0.5) * 10}deg)
                rotateX(${(y - 0.5) * -10}deg)
                translateZ(10px)
            `;
            
            // Update particles position
            const particles = aboutImg.querySelectorAll('.particle');
            particles.forEach(particle => {
                const speed = particle.style.animationDuration || '6s';
                const xMove = (x - 0.5) * 30;
                const yMove = (y - 0.5) * 30;
                particle.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });

        // Reset transform on mouse leave
        aboutImg.addEventListener('mouseleave', () => {
            aboutImg.style.transform = 'none';
            const particles = aboutImg.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.transform = 'none';
            });
        });
    }

    // Glass Card Effect with Enhanced Pendulum Animation
    function initGlassCardEffect() {
        const glassCard = document.querySelector('.glass-card');
        const profileThread = document.querySelector('.profile-thread');
        const threadLine = document.querySelector('.thread-line');
        const glassCardBtn = document.querySelector('.glass-card-btn');
        
        if (!glassCard || !profileThread || !threadLine) return;

        // Add initial subtle animation to thread
        let swingAngle = 0;
        let swingDirection = 0.05;
        
        function animateThread() {
            swingAngle += swingDirection;
            
            // Reverse direction when reaching limits
            if (swingAngle > 2 || swingAngle < -2) {
                swingDirection *= -1;
            }
            
            // Apply subtle rotation to thread
            profileThread.style.transform = `rotate(${swingAngle}deg)`;
            
            requestAnimationFrame(animateThread);
        }
        
        // Start thread animation
        animateThread();

        glassCard.addEventListener('mousemove', (e) => {
            const rect = glassCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const maxRotate = 8; // max rotation in degrees
            
            // Apply 3D rotation to the card
            glassCard.style.transform = `perspective(1000px) rotateY(${percentX * maxRotate}deg) rotateX(${-percentY * maxRotate}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Enhance pendulum effect based on mouse position
            // Add extra rotation to the natural swinging animation
            const extraRotation = percentX * 3;
            profileThread.style.transform = `rotate(${extraRotation}deg)`;
            
            // Move particles based on mouse position with enhanced effect
            const particles = document.querySelectorAll('.glass-particle');
            particles.forEach((particle, index) => {
                const speed = 0.05 + (index * 0.015);
                const moveX = percentX * 30 * speed;
                const moveY = percentY * 30 * speed;
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            // Add subtle movement to the button
            if (glassCardBtn) {
                glassCardBtn.style.transform = `translateY(${percentY * 5}px)`;
            }
        });
        
        glassCard.addEventListener('mouseleave', () => {
            // Reset card transform with smooth transition
            glassCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
            
            // Reset profile thread to natural animation
            profileThread.style.transform = '';
            
            // Reset particles with smooth transition
            const particles = document.querySelectorAll('.glass-particle');
            particles.forEach(particle => {
                particle.style.transform = 'translate(0, 0)';
            });
            
            // Reset button position
            if (glassCardBtn) {
                glassCardBtn.style.transform = '';
            }
        });
    }

    // Initialize when DOM is loaded
    initProgressBars();
    handleAboutImage();
    initAboutAnimation();
    initGlassCardEffect();
}); 