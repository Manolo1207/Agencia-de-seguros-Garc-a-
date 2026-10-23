const siteContent = {
    brand: {
        name: 'GARCÍA',
        subtitle: 'SEGUROS'
    },
    hero: {
        title: '¿QUÉ<br>OFRECEMOS?',
        badge: 'Seguros:',
        feature: 'AUTO - VIDA - GASTOS MÉDICOS<br>AHORRO Y RETIRO - PYMES',
        tags: [
            'COBERTURAS FLEXIBLES',
            'PLANES ACCESIBLES',
            'ASESORÍA PERSONALIZADA'
        ],
        phone: '2321567519',
        phoneHref: 'tel:+522321567519'
    },
    services: [
        {
            id: 'auto',
            icon: '🚗',
            label: 'Auto',
            title: 'Seguro para tu movilidad',
            description: 'Protección para tu vehículo, conductor, pasajeros y bienes con coberturas adaptadas a tu estilo de vida.',
            items: ['Daños materiales', 'Responsabilidad civil', 'Asistencia vial']
        },
        {
            id: 'hogar',
            icon: '🏠',
            label: 'Hogar',
            title: 'Seguro para tu hogar',
            description: 'Protección integral para tu vivienda, tu familia y tus bienes frente a cualquier imprevisto.',
            items: ['Responsabilidad civil familiar', 'Responsabilidad civil laboral', 'Accidentes personales en mi casa', 'Asistencias en mi casa', 'Robo con violencia', 'Electrodomésticos', 'Contenidos', 'Bienes en aparatos refrigeradores', 'Edificio', 'Remoción de escombros', 'Gastos extraordinarios', 'Cristales']
        },
        {
            id: 'empresarial',
            icon: '💼',
            label: 'Empresarial',
            title: 'Seguros para negocios',
            description: 'Soluciones para PyMES y empresas que necesitan continuidad, control y respaldo financiero y operativo.',
            items: ['Responsabilidad empresarial', 'Patrimonial y maquinaria', 'Protección para empleados']
        },
        {
            id: 'vida',
            icon: '❤️',
            label: 'Vida',
            title: 'Protección para tu familia',
            description: 'Te acompañamos a proteger a tus seres queridos con un respaldo sólido para el presente y el futuro.',
            items: ['Seguro de vida', 'Protección para dependientes', 'Planes a tu medida']
        },
        {
            id: 'salud',
            icon: '🏥',
            label: 'Salud',
            title: 'Cobertura médica y bienestar',
            description: 'Opciones de salud pensadas para cuidar a tu familia con acceso a atención de calidad y tranquilidad.',
            items: ['Consulta y hospitalización', 'Atención preventiva', 'Beneficios familiares']
        },
        {
            id: 'viajes',
            icon: '✈️',
            label: 'Viajes',
            title: 'Seguridad en cada destino',
            description: 'Disfruta tus viajes con respaldo en emergencias, asistencia médica y cobertura para imprevistos.',
            items: ['Asistencia médica internacional', 'Cancelación y retrasos', 'Protección de equipaje']
        }
    ]
};

function renderHero() {
    const brandName = document.getElementById('hero-brand-name');
    const brandSub = document.getElementById('hero-brand-sub');
    const heroTitle = document.getElementById('hero-title');
    const heroBadge = document.getElementById('hero-badge');
    const heroFeature = document.getElementById('hero-feature');
    const heroTags = document.getElementById('hero-tags');
    const heroPhoneLink = document.getElementById('hero-phone-link');

    if (brandName) brandName.textContent = siteContent.brand.name;
    if (brandSub) brandSub.textContent = siteContent.brand.subtitle;
    if (heroTitle) heroTitle.innerHTML = siteContent.hero.title;
    if (heroBadge) heroBadge.textContent = siteContent.hero.badge;
    if (heroFeature) heroFeature.innerHTML = siteContent.hero.feature;
    if (heroTags) {
        heroTags.innerHTML = siteContent.hero.tags.map(tag => `<div class="tag-pill">${tag}</div>`).join('');
    }
    if (heroPhoneLink) {
        heroPhoneLink.textContent = siteContent.hero.phone;
        heroPhoneLink.href = siteContent.hero.phoneHref;
    }
}

function renderServices() {
    const servicesGrid = document.getElementById('services-grid');

    if (servicesGrid) {
        servicesGrid.innerHTML = siteContent.services.map(service => `
            <a class="service-card" href="#seguro-${service.id}" data-service-id="${service.id}">
                <div class="icon-box">${service.icon}</div>
                <h3>${service.label}</h3>
                <p>${service.description}</p>
            </a>
        `).join('');

        servicesGrid.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', (event) => {
                event.preventDefault();
                const serviceId = card.dataset.serviceId;
                window.location.hash = `seguro-${serviceId}`;
                showServiceDetail(serviceId);
            });
        });
    }
}

function showServiceDetail(serviceId) {
    const overview = document.getElementById('services-overview');
    const detailPage = document.getElementById('service-detail-page');
    const detailContent = document.getElementById('service-detail-content');
    const service = siteContent.services.find(item => item.id === serviceId);

    if (!service || !detailPage || !detailContent) return;

    detailContent.innerHTML = `
        <article class="detail-page-card">
            <span class="detail-tag">${service.label}</span>
            <h3>${service.title}</h3>
            <p class="detail-page-summary">${service.description}</p>
            <ul class="detail-page-list">
                ${service.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div class="detail-page-actions">
                <a class="btn btn-primary quote-trigger" href="#contacto" data-service-label="${service.label}">Solicitar cotización</a>
                <button class="btn btn-secondary service-back" type="button">Volver</button>
            </div>
        </article>
    `;

    document.body.classList.add('service-page-open');
    detailPage.hidden = false;
    if (overview) overview.hidden = true;
    window.scrollTo({ top: document.getElementById('servicios').offsetTop - 30, behavior: 'smooth' });

    const backButtons = detailPage.querySelectorAll('.service-back');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.hash = 'servicios';
            showOverview();
        });
    });
}

function showOverview() {
    const overview = document.getElementById('services-overview');
    const detailPage = document.getElementById('service-detail-page');

    document.body.classList.remove('service-page-open');
    if (overview) overview.hidden = false;
    if (detailPage) detailPage.hidden = true;
}

function handleServiceHash() {
    const hash = window.location.hash.replace('#', '');

    if (hash.startsWith('seguro-')) {
        const serviceId = hash.replace('seguro-', '');
        showServiceDetail(serviceId);
        return;
    }

    showOverview();
}

document.getElementById('year').textContent = new Date().getFullYear();
renderHero();
renderServices();
handleServiceHash();
window.addEventListener('hashchange', handleServiceHash);

const form = document.querySelector('.contact-form');
const whatsappNumber = '5212321567519';

function populateQuoteService(serviceLabel) {
    if (!form) return;
    const serviceInput = form.querySelector('select[name="service"]');
    if (!serviceInput) return;
    if (serviceLabel) {
        Array.from(serviceInput.options).forEach(option => {
            if (option.value.toLowerCase() === serviceLabel.toLowerCase()) {
                serviceInput.value = option.value;
            }
        });
    }
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button');
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const service = form.querySelector('select[name="service"]').value.trim();
        const details = form.querySelector('textarea[name="details"]').value.trim();

        const message = [
            'Hola, quiero solicitar una cotización.',
            '',
            `Nombre: ${name || 'No indicado'}`,
            `Correo: ${email || 'No indicado'}`,
            `Teléfono: ${phone || 'No indicado'}`,
            `Seguro de interés: ${service || 'No indicado'}`,
            `Detalles: ${details || 'Sin detalles adicionales'}`
        ].join('\n');

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener');

        const originalText = button.textContent;
        button.textContent = 'Se abrió WhatsApp';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
        }, 2200);
    });
}

document.addEventListener('click', (event) => {
    const link = event.target.closest('.quote-trigger');
    if (!link) return;

    event.preventDefault();

    const serviceLabel = link.dataset.serviceLabel || '';
    document.body.classList.remove('service-page-open');
    showOverview();

    if (serviceLabel) {
        setTimeout(() => populateQuoteService(serviceLabel), 80);
    }

    setTimeout(() => {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.location.hash = 'contacto';
    }, 160);
});
