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

    // Detect interactions that might indicate a screenshot attempt
    function detectScreenshotAttempt() {
        // Detect fullscreen change, since screenshots often involve fullscreen
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement && !alertShown) {
                hideSensitiveContent();
            }
        });

        // Detect window resizing, another common behavior during screenshotting
        window.addEventListener('resize', function() {
            if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
                hideSensitiveContent();
            }
        });

        // Detect when the user switches to a different tab or minimizes the window
        window.addEventListener('blur', function() {
            document.body.style.opacity = 0; // Hide content
        });

        window.addEventListener('focus', function() {
            document.body.style.opacity = 1; // Restore content
        });

        // Monitor for DevTools usage, which can indicate an attempt to inspect the page
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

        // Monitor for window resizing for signs of DevTools or screenshot attempts
        setInterval(() => {
            if (window.outerWidth !== screen.width || window.outerHeight !== screen.height) {
                hideSensitiveContent();
            }
        }, 1000);
    }

    // Call the function only when there is an actual interaction related to screenshots
    window.addEventListener('keydown', detectScreenshotAttempt); // Trigger detection on keypress (e.g., for screenshot shortcuts)
    window.addEventListener('mousemove', detectScreenshotAttempt); // Trigger detection when there's interaction
    window.addEventListener('mousedown', detectScreenshotAttempt); // Trigger detection on mouse click
    window.addEventListener('touchstart', detectScreenshotAttempt); // Trigger on touch devices
});
