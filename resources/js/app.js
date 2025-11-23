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
        carouselStage.style.transformStyle = 'preserve-3d';
        carouselStage.style.transform = `translateZ(-${radius}px) rotateY(0deg)`;

        // Auto-rotation (optional - comment out if you don't want it)
        let autoRotate = setInterval(() => {
            currentRotation -= theta;
            carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;

            // Update active class
            const activeIndex = Math.abs(Math.round(currentRotation / theta)) % itemCount;
            items.forEach((item, i) => {
                if (i === activeIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }, 3000); // Rotate every 3 seconds

        // Manual rotation with mouse drag
        let isDragging = false;
        let startX = 0;
        let startRotation = 0;

        carouselStage.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startRotation = currentRotation;
            carouselStage.style.cursor = 'grabbing';
            clearInterval(autoRotate); // Stop auto-rotation when user interacts
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            carouselStage.style.cursor = 'grab';
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                currentRotation = startRotation + (deltaX * 0.5);
                carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;

                // Update active class based on rotation
                const activeIndex = Math.abs(Math.round(currentRotation / theta)) % itemCount;
                items.forEach((item, i) => {
                    if (i === activeIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });

        // Click to advance
        carouselStage.addEventListener('click', (e) => {
            if (!isDragging) {
                clearInterval(autoRotate);
                currentRotation -= theta;
                carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;

                const activeIndex = Math.abs(Math.round(currentRotation / theta)) % itemCount;
                items.forEach((item, i) => {
                    if (i === activeIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
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
                if (rect.top < -viewportHeight * 0.1) {
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
});
