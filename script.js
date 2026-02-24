document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Basic Search Implementation
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const term = searchInput.value.trim();

    if (term) {
        // Use window.find() for simple browser-native find-in-page behavior
        const found = window.find(term);

        if (!found) {
            alert('Text not found!');
        }
    }
}

const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

const searchInputElem = document.getElementById('search-input');
if (searchInputElem) {
    searchInputElem.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Capture and Forward fbclid
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');

    if (fbclid) {
        const links = document.querySelectorAll('a[href*="totalt-clinic.com"]');
        links.forEach(link => {
            try {
                const url = new URL(link.href);
                url.searchParams.set('fbclid', fbclid);
                link.href = url.toString();
            } catch (e) {
                console.error('Error modifying URL:', link.href, e);
            }
        });
    }
});

// Popup Logic
document.addEventListener('DOMContentLoaded', function () {
    // START POPUP CONFIGURATION
    const ENABLE_POPUP = false; // Set this to true to turn the popup back on
    // END POPUP CONFIGURATION

    if (!ENABLE_POPUP) return; // Exit immediately if popup is disabled

    const popup = document.getElementById('pdf-popup');
    const closeBtn = document.getElementById('close-popup');
    const targetSection = document.getElementById('product-1'); // Total T Gummy section

    let timerID = null;
    let hasShownPopup = false;
    let isVisible = false;

    // Check if the element exists
    if (!targetSection || !popup) return;

    function checkVisibility() {
        if (hasShownPopup) return;

        const rect = targetSection.getBoundingClientRect();
        // Check if any part of the element is in the viewport
        const currentlyVisible = (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );

        if (currentlyVisible && !isVisible) {
            // Started being visible
            isVisible = true;
            timerID = setTimeout(() => {
                popup.style.display = 'flex';
                hasShownPopup = true; // prevent showing it again
            }, 5000);
        } else if (!currentlyVisible && isVisible) {
            // Stopped being visible
            isVisible = false;
            if (timerID) {
                clearTimeout(timerID);
                timerID = null;
            }
        }
    }

    // Check on scroll, resize, and initial load
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();

    // Close popup logic
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        hasShownPopup = true; // Ensure it doesn't pop up again
    });

    // Close if clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            hasShownPopup = true; // Ensure it doesn't pop up again
        }
    });
});
