// 1. Scroll suave para los enlaces del menú
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la sección
        const targetSection = document.getElementById(targetId); // Encuentra la sección
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Desplazamiento suave
                block: 'start'      // Alinea la sección en la parte superior
            });
        }
    });
});

// 2. Animaciones al hacer scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Agrega la clase 'visible' cuando la sección está en la vista
        }
    });
}, {
    threshold: 0.1 // Activa la animación cuando el 10% de la sección es visible
});

sections.forEach(section => {
    observer.observe(section); // Observa cada sección
});

// 3. Validación básica del formulario de contacto (opcional)
const contactForm = document.getElementById('contact-form'); // Asegúrate de agregar un ID al formulario

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Por favor, completa todos los campos.'); // Validación básica
        } else if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.'); // Validación de correo
        } else {
            alert('Formulario enviado correctamente.'); // Simulación de envío
            contactForm.reset(); // Limpia el formulario
        }
    });
}

// Función para validar el correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}