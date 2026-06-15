document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply basic initial styles dynamically to avoid layout jumps if JS is disabled
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('.section-title, .exp-column');

    [...projectCards, ...sections].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Helper class for revealed state
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navbar background blur effect on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Hero video: autoplay once, then show replay button
    const heroVideo = document.getElementById('heroVideo');
    const replayBtn = document.getElementById('replayBtn');

    if (heroVideo && replayBtn) {
        // When video finishes, show the replay button
        heroVideo.addEventListener('ended', () => {
            replayBtn.style.display = 'block';
        });

        // When replay button is clicked, restart the video
        replayBtn.addEventListener('click', () => {
            replayBtn.style.display = 'none';
            heroVideo.currentTime = 0;
            heroVideo.play();
        });
    }

    // Initialize project sliders (carousels)
    const sliders = document.querySelectorAll('.project-slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.slides-track');
        const slides = Array.from(track.children);
        const nextButton = slider.querySelector('.next-arrow');
        const prevButton = slider.querySelector('.prev-arrow');
        const dotsContainer = slider.querySelector('.slider-dots');
        const dots = Array.from(dotsContainer.children);

        let currentIndex = 0;

        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        };

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIndex = (currentIndex + 1) % slides.length;
            updateSlider(nextIndex);
        });

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider(prevIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlider(index);
            });
        });
    });
});

