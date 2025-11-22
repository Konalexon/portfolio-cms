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

    // Carousel Logic
    const carouselStage = document.getElementById('carouselStage');
    const items = document.querySelectorAll('.carousel-item-3d');
    const itemCount = items.length;
    const theta = 360 / itemCount;
    let currImage = 0;
    let currentRotation = 0; // Store rotation state

    // Setup Carousel Positions
    if (carouselStage && itemCount > 0) {
        const radius = Math.round((400 / 2) / Math.tan(Math.PI / itemCount));
        items.forEach((item, i) => {
            item.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
        });
        carouselStage.style.transform = `translateZ(-${radius}px) rotateY(0deg)`;
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

    // Carousel Rotation (Click/Touch)
    if (carouselStage) {
        let startX = 0;
        let isDragging = false;
        let startRotation = 0;

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
                currentRotation = startRotation + (deltaX * 0.5);
                const radius = Math.round((400 / 2) / Math.tan(Math.PI / itemCount));
                carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;
            }
        });

        // Simple click to rotate (next item)
        carouselStage.addEventListener('click', (e) => {
            if (!isDragging) { // Only if not dragging
                currImage++;
                currentRotation = currImage * -theta;
                const radius = Math.round((400 / 2) / Math.tan(Math.PI / itemCount));
                carouselStage.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;
            }
        });
    }
});
