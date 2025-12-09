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
