import './bootstrap';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio JS Loaded 🚀');

    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            console.log('Nav Toggle Clicked');
            const adminLinkContainer = document.getElementById('adminLinkContainer');
            if (adminLinkContainer) {
                adminLinkContainer.classList.toggle('active');
                navToggle.innerHTML = adminLinkContainer.classList.contains('active')
                    ? '<i class="bi bi-x-lg"></i>'
                    : '<i class="bi bi-list"></i>';
            }
        });
    } else {
        console.error('Nav toggle not found!');
    }

    // --- 3D SCROLL SEQUENCER ---
    const sceneIntro = document.getElementById('sceneIntro');
    const introText = document.querySelector('.intro-text');
    const sceneProfile = document.getElementById('sceneProfile');
    const profileCard = document.getElementById('profileCard');
    const sceneProjects = document.getElementById('sceneProjects');

    // --- 3D CAROUSEL SETUP ---
    const carouselStage = document.getElementById('carouselStage');
    const items = document.querySelectorAll('.carousel-item-3d');
    const itemCount = items.length;

    console.log(`Found ${itemCount} carousel items`);

    if (carouselStage && itemCount > 0) {
        const theta = 360 / itemCount;
        // Smaller radius for tighter circle
        let radius = Math.round((450 / 2) / Math.tan(Math.PI / itemCount));

        // Tighter spacing
        if (itemCount === 2) {
            radius = 380; // Closer for 2 items
        } else if (itemCount === 3) {
            radius = 350; // Tighter for 3 items
        } else if (itemCount === 4) {
            radius = 420; // Closer for 4 items
        } else if (radius < 250) {
            radius = 250; // Minimum for 5+ items
        }

        console.log(`Carousel setup: ${itemCount} items, theta=${theta}°, radius=${radius}px`);

        // Position each item in 3D space
        items.forEach((item, i) => {
            const angle = theta * i;
            // Add rotateX for cylinder curve effect
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) rotateX(-10deg)`;
            console.log(`Item ${i}: rotateY(${angle}deg) translateZ(${radius}px) rotateX(-10deg)`);

            // Mark first item as active
            if (i === 0) {
                item.classList.add('active');
            }
        });

        // Initial rotation
        let currentRotation = 0;
        let targetRotation = 0;
        let isDragging = false;
        let startX = 0;
        let startRotation = 0;
        let rotationSpeed = 0.2; // Speed of auto-rotation

        carouselStage.style.transformStyle = 'preserve-3d';
        carouselStage.style.transform = `translateZ(-${radius}px) rotateY(0deg)`;

        // Smooth Auto-Rotation Loop
        function animateCarousel() {
            if (!isDragging) {
                currentRotation -= rotationSpeed;
            }

            carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;

            // Update active class based on rotation
            // We use a wider threshold for "active" since it's continuous
            const normalizedRotation = Math.abs(currentRotation) % 360;
            const sectorSize = 360 / itemCount;
            const activeIndex = Math.round(normalizedRotation / sectorSize) % itemCount;

            items.forEach((item, i) => {
                // Logic to handle the wrap-around correctly
                // This is a simplified check, might need refinement for perfect "active" state
                // but visually the rotation is key.
                // Let's use a distance-based approach for "active" class

                // Calculate item's current angle in world space
                let itemAngle = (theta * i) + currentRotation;
                // Normalize to 0-360
                itemAngle = itemAngle % 360;
                if (itemAngle < 0) itemAngle += 360;

                // Item is active if it's close to 0 degrees (front)
                // 0 degrees is "front" in this setup?
                // Actually, items are placed at theta * i.
                // Stage rotates by currentRotation.
                // So item is at (theta * i) + currentRotation.
                // We want the one closest to 0 (or 360) to be active.

                if (itemAngle > 340 || itemAngle < 20) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            requestAnimationFrame(animateCarousel);
        }

        // Start the loop
        animateCarousel();

        // Manual rotation with mouse drag
        carouselStage.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startRotation = currentRotation;
            carouselStage.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            carouselStage.style.cursor = 'grab';
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                // Sensitivity factor
                currentRotation = startRotation + (deltaX * 0.5);
            }
        });

        // Touch support for mobile
        carouselStage.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startRotation = currentRotation;
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const deltaX = e.touches[0].clientX - startX;
                currentRotation = startRotation + (deltaX * 0.5);
            }
        });
    } else {
        console.warn('Carousel not initialized: stage or items missing');
    }

    // Scroll Handler
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // SCENE 1: INTRO ANIMATION
        if (sceneIntro && introText) {
            // Calculate progress based on how far we've scrolled past the top
            const progress = Math.min(scrollY / (viewportHeight * 0.8), 1);

            introText.style.opacity = 1 - progress;
            introText.style.transform = `scale(${1 + progress * 0.5}) translateY(${progress * 100}px)`; // Move down slightly
            introText.style.filter = `blur(${progress * 20}px)`;
        }

        // SCENE 2: PROFILE ANIMATION
        if (sceneProfile && profileCard) {
            const rect = sceneProfile.getBoundingClientRect();

            // ENTRANCE: When top comes into view (from bottom)
            // Trigger slightly earlier (0.8 instead of 0.85) to ensure it's ready
            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
                // EXIT TRIGGER: Delay exit until we've scrolled PAST the top
                // User wanted it to disappear "later", so we wait until the top is actually above the viewport
                // e.g., -10% of viewport height.
                // EXIT TRIGGER: Only exit if completely scrolled past (bottom < 0)
                // This keeps it visible much longer as requested
                if (rect.bottom < 0) {
                    if (profileCard.classList.contains('visible')) {
                        profileCard.classList.remove('visible');
                    }
                }
                // ENTRANCE TRIGGER: If we are in the main view area
                else if (!profileCard.classList.contains('visible')) {
                    profileCard.classList.add('visible');
                    // Reset inline styles
                    profileCard.style.opacity = '';
                    profileCard.style.transform = '';
                }
            } else {
                // Reset if completely out of view (bottom < 0 or top > 0.8)
                profileCard.classList.remove('visible');
            }

            // Tilt effect (only if visible to save performance)
            if (profileCard.classList.contains('visible')) {
                const tiltY = Math.sin(scrollY / 300) * 2;
                profileCard.style.transform = `translateY(0) scale(1) rotateY(${tiltY}deg)`;
            }
        }

        // SCENE 3: CAROUSEL ANIMATION
        if (sceneProjects) {
            const carouselContainer = sceneProjects.querySelector('.carousel-container');
            if (carouselContainer) {
                const rect = sceneProjects.getBoundingClientRect();

                // ENTRANCE: Trigger when top is 80% down the viewport (earlier than before)
                if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
                    // EXIT TRIGGER: Same delay for consistency
                    if (rect.top < -viewportHeight * 0.1) {
                        if (carouselContainer.classList.contains('visible')) {
                            carouselContainer.classList.remove('visible');
                        }
                    }
                    else if (!carouselContainer.classList.contains('visible')) {
                        carouselContainer.classList.add('visible');
                    }
                } else {
                    carouselContainer.classList.remove('visible');
                }

                // EXIT PARALLAX
                if (carouselContainer.classList.contains('visible')) {
                    if (rect.top < 0) {
                        const scrolledPast = Math.abs(rect.top);
                        const opacity = Math.max(0, 1 - (scrolledPast / 600));
                        const parallaxY = scrolledPast * 0.3;

                        carouselContainer.style.opacity = opacity;
                        carouselContainer.style.transform = `scale(${0.9 + (opacity * 0.1)}) translateY(-${parallaxY}px)`;
                    } else {
                        carouselContainer.style.opacity = 1;
                        carouselContainer.style.transform = `scale(1) translateY(0)`;
                    }
                }
            }
        }
    });

    // YouTube hover play functionality
    document.querySelectorAll('.carousel-item-3d').forEach(card => {
        const mediaContainer = card.querySelector('.media-container');
        const youtubeIframe = card.querySelector('.youtube-iframe');

        if (mediaContainer && youtubeIframe) {
            let hoverTimeout;

            card.addEventListener('mouseenter', () => {
                // Delay slightly to avoid accidental triggers
                hoverTimeout = setTimeout(() => {
                    const dataSrc = youtubeIframe.getAttribute('data-src');
                    if (dataSrc && !youtubeIframe.src) {
                        youtubeIframe.src = dataSrc;
                    }
                    mediaContainer.classList.add('playing');
                }, 500);
            });

            card.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
                // Stop video by removing src
                if (youtubeIframe.src) {
                    youtubeIframe.src = '';
                }
                mediaContainer.classList.remove('playing');
            });
        }
    });

    // Page Transitions
    document.body.classList.add('loaded');

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only intercept internal links that are not anchors or new tabs
            if (href && href.startsWith(window.location.origin) && !href.includes('#') && this.target !== '_blank') {
                e.preventDefault();
                document.body.classList.remove('loaded');
                document.body.classList.add('fading-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Wait for fade out animation
            }
        });
    });

    // --- VISUAL POLISH & SMACZKI ---

    // 1. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.body.classList.add('custom-cursor-active');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-toggle, .carousel-item-3d');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 2. Scroll Progress
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // 3. Typewriter Effect
    if (introText) {
        const text = introText.innerText;
        introText.innerText = '';
        introText.classList.add('typing-cursor');

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                introText.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 100 + 50); // Random delay 50-150ms
            } else {
                introText.classList.remove('typing-cursor');
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // 4. Magnetic Buttons (The "Cool Thing")
    const magneticButtons = document.querySelectorAll('.btn, .nav-toggle, .lang-link, .tech-item');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                btn.style.transition = ''; // Remove transition so mousemove is instant
            }, 300);
        });
    });

    // 5 COOL FEATURES JS

    // 1. Particle Background
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            // Method to draw individual particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            // Check particle position, check mouse position, move the particle, draw the particle
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = '#00f3ff';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(0, 243, 255,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            initParticles();
        });

        initParticles();
        animateParticles();
    }

    // 2. Scroll Reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Glitch Text Randomizer (Optional Polish)
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            const original = glitchText.getAttribute('data-text');
            // Randomly trigger a stronger glitch class or effect here if desired
            // For now, CSS animation handles the main effect
        }, 3000);
    }

    // 4. Contact Button Logic (Show Email)
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'konalinio@gmail.com';

            // Try to copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Success feedback
                const originalHtml = contactBtn.innerHTML;
                contactBtn.innerHTML = `<i class="bi bi-check2 me-2"></i> ${email}`;
                contactBtn.classList.remove('btn-outline-light');
                contactBtn.classList.add('btn-light', 'text-dark');

                setTimeout(() => {
                    contactBtn.innerHTML = originalHtml;
                    contactBtn.classList.remove('btn-light', 'text-dark');
                    contactBtn.classList.add('btn-outline-light');
                }, 3000);
            }).catch(err => {
                // Fallback if clipboard fails (just show email)
                contactBtn.innerHTML = `<i class="bi bi-envelope-fill me-2"></i> ${email}`;
            });
        });
    }
});
