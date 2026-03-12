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

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
let mobileNav = null;

mobileMenuBtn.addEventListener('click', () => {
    if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <a href="#occasione">L'Auto</a>
            <a href="#perche-noi">Perche Noi</a>
            <a href="#servizi">Servizi</a>
            <a href="#contatti">Contatti</a>
            <a href="https://wa.me/393284120553?text=Ciao!%20Sono%20interessato%20all%27Alfa%20Romeo%20Stelvio%20vista%20sul%20vostro%20sito." class="btn btn-whatsapp" target="_blank" rel="noopener">
                Scrivici su WhatsApp
            </a>
        `;
        document.body.appendChild(mobileNav);

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    mobileNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
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

document.querySelectorAll('.trust-card, .spec-card, .finance-card, .service-card, .review-card, .highlight-box, .dealer-card, .dealer-map, .contact-form-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
}, { passive: true });

// ===== CONTACT FORM - WhatsApp Redirect =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefono = document.getElementById('telefono').value;
        const richiesta = document.getElementById('richiesta');
        const richiestaText = richiesta.options[richiesta.selectedIndex].text;
        const messaggio = document.getElementById('messaggio').value;

        let text = `Ciao! Mi chiamo ${nome}.\n`;
        text += `Telefono: ${telefono}\n`;
        text += `Vorrei: ${richiestaText}\n`;
        if (messaggio) {
            text += `Messaggio: ${messaggio}\n`;
        }
        text += `\n(Inviato dalla landing page Alfa Romeo Stelvio)`;

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/393284120553?text=${encoded}`, '_blank');
    });
}
