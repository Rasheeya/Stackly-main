/**
 * Stackly Main Javascript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
        });
    }

    // 2. Init AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 3. Sticky Header
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky-top');
            } else {
                navbar.classList.remove('sticky-top');
            }
        });
    }

    // 4. Init Swiper for Hero
    if (document.querySelector('.hero-slider')) {
        new Swiper('.hero-slider', {
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 5. Init Swiper for Testimonials
    if (document.querySelector('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 6. Init Swiper for Menu Gallery
    if (document.querySelector('.menu-gallery-slider')) {
        new Swiper('.menu-gallery-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 7. Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                themeToggleBtn.innerHTML = '<i class="ph ph-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="ph ph-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Check local storage 
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-bs-theme', storedTheme);
            themeToggleBtn.innerHTML = storedTheme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
        }
    }

    // 8. Scroll to Top
    const stt = document.getElementById('scroll-to-top');
    if (stt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) stt.style.display = 'block';
            else stt.style.display = 'none';
        });
        stt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // 9. Menu Search & Tabs Filtering
    const menuSearch = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.menu-item-card');

    if (menuSearch) {
        menuSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            menuItems.forEach(item => {
                const title = item.getAttribute('data-title').toLowerCase();
                if (title.includes(query)) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    }

    // 10. Anchor Scrolling landing fix
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100; // Account for sticky header
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
