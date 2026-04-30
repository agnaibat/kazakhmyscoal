// HISTORY TIMELINE ANIMATION
const items = document.querySelectorAll('.history-item');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    },
    { threshold: 0.2 }
);

items.forEach(item => observer.observe(item));

// ================= LIGHTBOX =================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.js-lightbox').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// CLOSE BUTTON
lightboxClose.addEventListener('click', closeLightbox);

// CLICK ON BACKDROP
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// ESC KEY
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('[data-count]');
    let started = false;

    const animateCounters = () => {
        if (started) return;
        started = true;

        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.count);
            const isFloat = target % 1 !== 0;
            let current = 0;
            const duration = 1500;
            const stepTime = 16;
            const increment = target / (duration / stepTime);

            const update = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = isFloat
                        ? current.toFixed(1)
                        : Math.floor(current);
                    requestAnimationFrame(update);
                }
            };
            update();
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.4 });

    const statsBlock = document.querySelector('.about-company__stats');
    if (statsBlock) observer.observe(statsBlock);
});
