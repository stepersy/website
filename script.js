document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootElement = document.documentElement;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference if no saved theme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply the initial theme
    if (savedTheme) {
        rootElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else if (systemPrefersDark) {
        rootElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a small rotation animation to the icon during toggle
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = 'none';
        }, 300);

        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // --- Typing Animation Logic ---
    const greetingElement = document.getElementById('greeting');
    const textToType = 'Hello, World! Welcome. ';
    const typingSpeed = 100; // milliseconds per character
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            greetingElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // After typing finishes, maybe add a slight pause then change text or format
            // Here we just leave it and let the CSS cursor blink
        }
    }

    // Start typing animation with a small delay
    setTimeout(typeWriter, 500);

    // --- Intersection Observer for Scroll Animations ---
    // (Optional enhancement to trigger animations only when element is in view)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pause all slide-up animations initially and let observer trigger them
    document.querySelectorAll('.slide-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});
