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

    // Disable keyboard shortcuts for Inspect Element and other dev tools
    document.onkeydown = function(e) {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U, Ctrl+S
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

    // Disable the ability to open the context menu via holding right-click
    window.oncontextmenu = function(event) {
        event.preventDefault();
        return false;
    };

    // Block resizing the window to prevent undocking of DevTools
    window.addEventListener('resize', function() {
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            window.close();
        }
    });

    // Monitor for unusual activity, like opening the DevTools via a non-standard way
    const devtools = function() {
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                throw 'DevTools is opened';
            }
        });

        setInterval(function() {
            console.profile();
            console.profileEnd();
            if (console.clear) {
                console.clear();
            }
        }, 1000);
    };

    try {
        devtools();
    } catch (err) {
        alert('DevTools is opened. Please close it!');
        window.close();
    }
});

// Event listener untuk mendeteksi perubahan visibilitas (keluar dari fokus/tab lain)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        // Ubah layar menjadi hitam saat pengguna meninggalkan halaman
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'black';
    } else {
        // Kembalikan tampilan normal saat pengguna kembali ke halaman
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
});

// Event listener untuk mendeteksi kehilangan fokus di PC dan laptop (misal: Alt+Tab)
window.addEventListener('blur', function() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'black';
});

// Event listener untuk mengembalikan tampilan saat pengguna kembali ke halaman
window.addEventListener('focus', function() {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
});

// Disable screenshot pada mobile dengan mendeteksi gesture multitasking (khusus mobile)
window.addEventListener('resize', function() {
    if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
        // Ketika layar di-resize secara drastis (misal: gesture untuk multitasking)
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'black';
    }
});
