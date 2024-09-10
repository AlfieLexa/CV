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

    // Prevent screen capturing using the HTML5 Fullscreen API (mitigates some screen capture tools)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            alert('Screen capture attempt detected! The window will now close.');
            window.close();
        }
    });

    // Prevent certain screen capturing methods (mostly mitigates but doesn't prevent entirely)
    setInterval(() => {
        if (window.outerWidth !== screen.width || window.outerHeight !== screen.height) {
            alert('Suspicious activity detected! Closing window to prevent screenshot.');
            window.close();
        }
    }, 1000);

    // Warn user if DevTools is opened
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

    // Attempt to disable screen recording by breaking visibility on sensitive areas
    const hideSensitiveContent = () => {
        document.body.style.opacity = 0;
        alert('Attempt to take a screenshot detected. Content is hidden.');
    };

    window.addEventListener('blur', hideSensitiveContent);  // Triggers when the window loses focus
    window.addEventListener('focus', () => {
        document.body.style.opacity = 1;  // Restore visibility when the window regains focus
    });
});
