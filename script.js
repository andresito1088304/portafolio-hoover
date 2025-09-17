// Configuración global
const config = {
    typingSpeed: 100,
    typingDelay: 2000,
    scrollOffset: 100
};

// Textos para el efecto de escritura
const typingTexts = [
    "Desarrollador Full Stack",
    "Creador de Experiencias Web",
    "Especialista en JavaScript",
    "Apasionado por la Innovación"
];

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    initTypingEffect();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initContactForm();
    initNavbarEffects();
    initParallaxEffects();
}

// Efecto de escritura en el hero
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? config.typingSpeed / 2 : config.typingSpeed;

        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = config.typingDelay;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Navegación suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - config.scrollOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.nav-toggle').classList.remove('active');
                }
            }
        });
    });
}

// Navegación activa basada