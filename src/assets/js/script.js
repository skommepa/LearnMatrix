document.addEventListener('DOMContentLoaded', () => {
    console.log('LearnMatrix App Loaded');

    // Dynamic Mobile Menu Toggle
    const header = document.querySelector('header');
    const navUl = document.querySelector('nav ul');

    if (header && navUl) {
        // Create toggle button
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';

        // Insert before nav
        header.insertBefore(toggleBtn, document.querySelector('nav'));

        // Event Listener
        toggleBtn.addEventListener('click', () => {
            navUl.classList.toggle('nav-active');

            // Optional: Animate hamburger to X
            const spans = toggleBtn.querySelectorAll('span');
            if (navUl.classList.contains('nav-active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Highlight active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });

    // Check login status (mock)
    const loginBtn = document.getElementById('loginBtn');
    if (localStorage.getItem('userLoggedIn')) {
        if (loginBtn) {
            loginBtn.textContent = 'Logout';
            loginBtn.href = '#';
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userLoggedIn');
                window.location.reload();
            });
        }
    }
});
