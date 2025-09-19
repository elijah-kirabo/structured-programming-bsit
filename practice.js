/* practice.js */

// This script toggles the background color of the page when a button is clicked.
// Make sure your practice.html includes: <script src="practice.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('toggleBtn');
    btn.addEventListener('click', function() {
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
    });
});