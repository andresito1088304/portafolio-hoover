document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navegación activa basada en scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animación de aparición en scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Manejo del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validación básica
    if (!name || !email || !message) {
        showMessage('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    // Simular envío del formulario
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    // Estado de carga
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;
    
    // Simular tiempo de envío
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        button.style.background = '#10b981';
        
        // Mostrar mensaje de éxito
        showMessage('¡Gracias por tu mensaje! Te contactaré pronto.', 'success');
        
        // Resetear formulario después de 2 segundos
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Función para mostrar mensajes
function showMessage(text, type) {
    // Crear elemento de mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${text}</span>
    `;
    
    // Estilos del mensaje
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        background: type === 'success' ? '#10b981' : '#ef4444',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });