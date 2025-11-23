import './bootstrap';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio JS Loaded 🚀');

    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');

    if (navToggle && navOverlay) {
        const navLinks = navOverlay.querySelectorAll('a');

        navToggle.addEventListener('click', () => {
            console.log('Nav Toggle Clicked');
            navOverlay.classList.toggle('active');
            navToggle.innerHTML = navOverlay.classList.contains('active')
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                navToggle.innerHTML = '<i class="bi bi-list"></i>';
            });
        });
    } else {
        console.error('Nav elements not found!');
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
        // Calculate radius, but ensure minimum of 300px for visibility
        let radius = Math.round((400 / 2) / Math.tan(Math.PI / itemCount));

        // For 2 items, the formula gives 0, so force a reasonable radius
        if (itemCount === 2) {
            radius = 350; // Fixed radius for 2 items
        } else if (radius < 200) {
            radius = 200; // Minimum radius for other cases
        }

        console.log(`Carousel setup: ${itemCount} items, theta=${theta}°, radius=${radius}px`);

        // Position each item in 3D space
        items.forEach((item, i) => {
            const angle = theta * i;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            console.log(`Item ${i}: rotateY(${angle}deg) translateZ(${radius}px)`);

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
            const isInView = rect.top < viewportHeight * 0.8 && rect.bottom > 0;

            if (isInView) {
                profileCard.classList.add('visible');

                // Subtle tilt on scroll (less aggressive than before)
                const tiltY = Math.sin(scrollY / 300) * 2;
                profileCard.style.transform = `translateY(0) scale(1) rotateY(${tiltY}deg)`;
            } else {
                // Optional: Remove class to replay animation when scrolling back up
                // profileCard.classList.remove('visible'); 
            }
        }

        // SCENE 3: CAROUSEL ANIMATION
        // (Carousel rotates on interaction, no scroll animation needed other than visibility)
    });
});
