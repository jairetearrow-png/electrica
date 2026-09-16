document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIÓN DE ELEMENTOS
    const siteHeader = document.getElementById('site-header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 2. MENÚ MÓVIL (ABRIR / CERRAR)
    let isMenuOpen = false;

    const toggleMobileMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Alternar clase activa para mostrar/ocultar menú
        mobileMenu.classList.toggle('active', isMenuOpen);
        mobileMenuButton.setAttribute('aria-expanded', isMenuOpen.toString());

        // Cambiar icono del botón (Hamburguesa <-> X)
        if (isMenuOpen) {
            mobileMenuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenuIcon.setAttribute('data-lucide', 'menu');
        }
        
        // Re-renderizar icono de Lucide
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Cerrar el menú móvil al hacer clic en cualquier enlace
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // 3. CAMBIO DE ESTILO EN HEADER AL HACER SCROLL
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);

    // 4. DESTACAR ENLACE ACTIVO SEGÚN LA SECCIÓN EN PANTALLA
    const highlightActiveNav = () => {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // 5. VALIDACIÓN BÁSICA Y ENVÍO DEL FORMULARIO DE CONTACTO
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Aquí se conectará la lógica de envío (Backend o servicios como Formspree / EmailJS)
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo a la brevedad.');
            contactForm.reset();
        });
    }
});
