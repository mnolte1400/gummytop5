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

document.getElementById('search-btn').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

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
