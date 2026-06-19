// script.js - Aniwear Part 3

document.addEventListener('DOMContentLoaded', () => {

    // 1. Gallery Lightbox (for Services page)
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        display:none; position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(0,0,0,0.9); z-index:1000; justify-content:center;
        align-items:center;
    `;
    document.body.appendChild(lightbox);

    function openLightbox(imgSrc, alt) {
        lightbox.innerHTML = `
            <img src="\( {imgSrc}" alt=" \){alt}" style="max-width:90%; max-height:90%; border:3px solid #4da6ff; border-radius:10px;">
            <span onclick="closeLightbox()" style="position:absolute; top:20px; right:30px; color:white; font-size:40px; cursor:pointer;">&times;</span>
        `;
        lightbox.style.display = 'flex';
    }
    window.closeLightbox = () => lightbox.style.display = 'none';

    // Attach to all product images (add class="gallery-img" to them)
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    // 2. Simple Search/Filter on Services page
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }

    // 3. Interactive Map (Leaflet) - Contact/About page
    // Add this script tag in head for Leaflet: <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    // <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    if (document.getElementById('map')) {
        const map = L.map('map').setView([-26.2041, 28.0473], 12); // Johannesburg
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([-26.2041, 28.0473]).addTo(map)
            .bindPopup('Aniwear - Johannesburg East')
            .openPopup();
    }

    // 4. Form Validation (Enquiry & Contact)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const email = form.querySelector('input[type="email"]');
            if (email && !email.value.includes('@')) {
                e.preventDefault();
                alert('Please enter a valid email address!');
                return;
            }
            // Additional validation...
            console.log('Form submitted (demo)');
            // In production: use fetch() for AJAX submission
        });
    });

    // Bonus: Smooth scroll + simple animations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});