// Лёгкая авто-анимация появления
const metrics = document.querySelectorAll('.metric');

metrics.forEach((item, i) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(12px)';

    setTimeout(() => {
        item.style.transition = 'all 0.6s ease';
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
    }, 300 + i * 150);
});
