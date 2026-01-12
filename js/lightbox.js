document.querySelectorAll('.logistics-img img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-img');

        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
        e.currentTarget.style.display = 'none';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('lightbox').style.display = 'none';
    }
});
