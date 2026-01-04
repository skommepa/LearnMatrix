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

// MatrixData Utility for tracking user activity and progress
const MatrixData = {
    // Activities: Array of { type, title, meta, timestamp }
    // type: 'quiz', 'resource'
    logActivity: function (type, title, meta) {
        let data = JSON.parse(localStorage.getItem('matrixData') || '{"activities": [], "progress": {}, "stats": {"hours": 0, "quizzes": 0, "avgScore": 0, "totalScore": 0}}');

        const activity = {
            type: type,
            title: title,
            meta: meta,
            timestamp: new Date().toISOString()
        };

        data.activities.unshift(activity); // Add to beginning
        if (data.activities.length > 20) data.activities.pop(); // Keep last 20

        if (type === 'quiz') {
            data.stats.quizzes++;
            // Meta for quiz is expected to be like "AP Micro • Score: 9/10"
            const scoreMatch = meta.match(/Score: (\d+)\/(\d+)/);
            if (scoreMatch) {
                const score = parseInt(scoreMatch[1]);
                const total = parseInt(scoreMatch[2]);
                const percent = (score / total) * 100;
                data.stats.totalScore += percent;
                data.stats.avgScore = Math.round(data.stats.totalScore / data.stats.quizzes);
            }
        } else if (type === 'resource') {
            // Estimate 5 mins per resource view for "Hours Studied"
            data.stats.hours = parseFloat((data.stats.hours + (5 / 60)).toFixed(1));
        }

        localStorage.setItem('matrixData', JSON.stringify(data));
        console.log(`Activity logged: ${title}`);
    },

    updateCourseProgress: function (course, percentage) {
        let data = JSON.parse(localStorage.getItem('matrixData') || '{"activities": [], "progress": {}, "stats": {"hours": 0, "quizzes": 0, "avgScore": 0, "totalScore": 0}}');

        // Update progress only if it's higher than existing
        if (!data.progress[course] || percentage > data.progress[course]) {
            data.progress[course] = percentage;
        }

        localStorage.setItem('matrixData', JSON.stringify(data));
    },

    getActivities: function () {
        let data = JSON.parse(localStorage.getItem('matrixData') || '{"activities": []}');
        return data.activities;
    },

    getProgress: function () {
        let data = JSON.parse(localStorage.getItem('matrixData') || '{"progress": {}}');
        return data.progress;
    },

    getStats: function () {
        let data = JSON.parse(localStorage.getItem('matrixData') || '{"stats": {"hours": 0, "quizzes": 0, "avgScore": 0, "totalScore": 0}}');
        return data.stats;
    }
};

