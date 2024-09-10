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
            window.close();
        }
    });

    // Prevent user from taking screenshots (mitigation, not 100% foolproof)
    function hideSensitiveContent() {
        document.body.style.filter = "blur(10px)"; // Blur content
        alert('Screenshot attempt detected! The window will now close.');
        setTimeout(() => window.close(), 1000); // Close the window after a delay
    }

    // Listen for fullscreen changes as an indicator of possible screenshot attempt
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            hideSensitiveContent();
        }
    });

    // Listen for when the user switches tabs or windows
    window.addEventListener('blur', function() {
        // Blur the content or hide it when the user leaves the tab
        document.body.style.opacity = 0;
    });

    // Restore the page content when the user comes back to the tab
    window.addEventListener('focus', function() {
        document.body.style.opacity = 1;
    });

    // Detect DevTools opening with more advanced method
    const detectDevTools = function() {
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                alert('DevTools is opened. Please close it.');
                window.close();
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
        alert('DevTools detected. Closing window.');
        window.close();
    }

    // Detect window resizing as potential sign of dev tools being opened
    setInterval(() => {
        if (window.outerWidth !== screen.width || window.outerHeight !== screen.height) {
            hideSensitiveContent();
        }
    }, 1000);
});
