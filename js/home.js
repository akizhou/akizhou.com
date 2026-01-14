/**
 * Aki Zhou Portfolio - Main JavaScript
 */

// Constants
const ANIMATION_FPS = 10;
const ANIMATION_INTERVAL = 1000 / ANIMATION_FPS; // 100ms
const NUM_FRAMES = 35;
const ASPECT_RATIO = 0.32;
const RESIZE_DEBOUNCE = 1500;

// DOM Elements (cached)
const signElement = document.getElementById('sign');
const yearElement = document.getElementById('year');
const loaderElement = document.getElementById('loader');
const contentElement = document.getElementById('content');

// State
let animationId = null;
let resizeTimeout = null;

/**
 * Animate the signature sprite
 */
function animateSprite() {
    // Prevent overlapping animations
    if (animationId) {
        clearInterval(animationId);
    }

    // Remove listeners during animation
    signElement.removeEventListener('click', animateSprite);
    signElement.removeEventListener('keydown', handleKeydown);

    // Calculate dimensions based on element width
    const width = signElement.offsetWidth;
    const frameHeight = width * ASPECT_RATIO;

    let frame = 2; // Start from frame 2 (frame 1 is default CSS position)
    let position = frameHeight;

    animationId = setInterval(() => {
        signElement.style.backgroundPositionY = `-${position}px`;

        if (frame < NUM_FRAMES) {
            frame += 1;
            position += frameHeight;
        } else {
            // Animation complete
            clearInterval(animationId);
            animationId = null;
            signElement.addEventListener('click', animateSprite);
            signElement.addEventListener('keydown', handleKeydown);
        }
    }, ANIMATION_INTERVAL);
}

/**
 * Handle keyboard interaction for accessibility
 */
function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        animateSprite();
    }
}

/**
 * Handle window resize with debouncing
 */
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(animateSprite, RESIZE_DEBOUNCE);
}

/**
 * Initialize the page
 */
function init() {
    // Set copyright year
    yearElement.textContent = new Date().getFullYear();

    // Hide loader, show content
    loaderElement.classList.add('hidden');
    contentElement.classList.remove('hidden');

    // Set up event listeners
    signElement.addEventListener('click', animateSprite);
    signElement.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);

    // Run initial animation
    animateSprite();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
