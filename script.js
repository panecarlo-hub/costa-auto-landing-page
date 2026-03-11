// ===== IMAGE GALLERY =====
const images = [
    { src: 'images/stelvio-front.jpeg', alt: 'Alfa Romeo Stelvio - Vista Frontale' },
    { src: 'images/stelvio-side-front.jpeg', alt: 'Alfa Romeo Stelvio - Vista Laterale Anteriore' },
    { src: 'images/stelvio-side.jpeg', alt: 'Alfa Romeo Stelvio - Vista Laterale' },
    { src: 'images/stelvio-rear.jpeg', alt: 'Alfa Romeo Stelvio - Vista Posteriore' },
    { src: 'images/stelvio-interior.jpeg', alt: 'Alfa Romeo Stelvio - Interni' }
];

let currentIndex = 0;
const mainImage = document.getElementById('mainImage');
const counter = document.getElementById('galleryCounter');
const thumbs = document.querySelectorAll('.thumb');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateGallery(index) {
    currentIndex = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.src = images[index].src;
        mainImage.alt = images[index].alt;
        mainImage.style.opacity = '1';
    }, 200);
    counter.textContent = `${index + 1} / ${images.length}`;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
}

prevBtn.addEventListener('click', () => {
    updateGallery(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    updateGallery(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
});

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        updateGallery(parseInt(thumb.dataset.index));
    });
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
const galleryMain = document.querySelector('.gallery-main');

galleryMain.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryMain.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextBtn.click();
        } else {
            prevBtn.click();
        }
    }
}, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.spec-card, .finance-card, .highlight-box, .dealer-info, .dealer-map').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
