// Fondo dinámico con partículas
const background = document.getElementById('dynamic-background');

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    background.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000); // Elimina la partícula después de 8 segundos
}

setInterval(createParticle, 300); // Crea una nueva partícula cada 300ms

// Efecto de movimiento de fondo
background.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    background.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Validación del formulario de contacto
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Por favor, completa todos los campos.');
        } else if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
        } else {
            alert('Mensaje enviado correctamente.');
            contactForm.reset();
        }
    });
}

// Función para validar el correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}