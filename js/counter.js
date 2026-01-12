document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.stat strong');
    let started = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.count;
            const suffix = counter.dataset.suffix || '';
            let current = 0;
            const increment = target / 80;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + suffix;
                }
            };

            update();
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const stats = document.querySelector('.page-header__stats');
    if (stats) observer.observe(stats);
});
