// Optional: Add any interactive features or animations
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const parallax = document.querySelector('.hero-section');
        const scrollY = window.scrollY;
        parallax.style.backgroundPositionY = scrollY * 0.5 + 'px';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let alertShown = false; // Flag to check if alert was already shown

    // Function to handle sensitive content hiding and tab closing
    function hideSensitiveContent() {
        if (!alertShown) {
            document.body.style.filter = "blur(10px)"; // Blur the content
            alert('Screenshot attempt or suspicious activity detected! The window will now close.');
            alertShown = true; // Set the flag to prevent further alerts
            setTimeout(() => window.close(), 1000); // Close the window after a delay
        }
    }

    // Disable right-click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable common developer tools shortcuts (F12, Ctrl+Shift+I, etc.)
    document.onkeydown = function(e) {
        if (
            e.keyCode == 123 ||  // F12
            (e.ctrlKey && e.shiftKey && e.keyCode == 73) ||  // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode == 74) ||  // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode == 85) ||  // Ctrl+U
            (e.ctrlKey && e.keyCode == 83) ||  // Ctrl+S
            (e.ctrlKey && e.shiftKey && e.keyCode == 67)  // Ctrl+Shift+C
        ) {
            e.preventDefault();
            return false;
        }
    };

    // Block window resize to prevent undocking DevTools
    window.addEventListener('resize', function() {
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            hideSensitiveContent();
        }
    });

    // Detect fullscreen changes as a possible screenshot attempt
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            hideSensitiveContent();
        }
    });

    // Detect if user switches tabs or windows
    window.addEventListener('blur', function() {
        document.body.style.opacity = 0; // Hide content
    });

    window.addEventListener('focus', function() {
        document.body.style.opacity = 1; // Show content again
    });

    // Detect DevTools opening with more advanced method
    const detectDevTools = function() {
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                hideSensitiveContent(); // Hide content and close if DevTools is opened
            }
        });

        setInterval(function() {
            console.profile();
            console.profileEnd();
        }, 1000);
    };

    try {
        detectDevTools();
    } catch (err) {
        hideSensitiveContent();
    }

    // Monitor window resizing for signs of dev tools being opened
    setInterval(() => {
        if (window.outerWidth !== screen.width || window.outerHeight !== screen.height) {
            hideSensitiveContent();
        }
    }, 1000);
});
