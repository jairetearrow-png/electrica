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
        
        mobileMenu.classList.toggle('active', isMenuOpen);
        mobileMenuButton.setAttribute('aria-expanded', isMenuOpen.toString());

        if (isMenuOpen) {
            mobileMenuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenuIcon.setAttribute('data-lucide', 'menu');
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

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

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                highlightActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 5. ENVÍO REAL DEL FORMULARIO CONECTADO A FORMSPREE
    const budgetForm = document.querySelector('.budget-form');

    if (budgetForm) {
        budgetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = budgetForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            const formData = new FormData(budgetForm);

            try {
                const response = await fetch('https://formspree.io/f/mzezyzkb', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    budgetForm.reset();
                } else {
                    alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión. Comprueba tu red e inténtalo de nuevo.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});