document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicializa EmailJS con tu Public Key
    emailjs.init({
        publicKey: "h0tCmqsgrs8kWAQqM", // <-- REEMPLAZA CON TU PUBLIC KEY REAL
    });

    // 2. Obtiene el formulario por su ID
    const form = document.getElementById('contact-form');
    // 3. Obtiene el botón por su clase
    const btn = document.querySelector('.submit-btn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        btn.value = 'Enviando...';
        btn.disabled = true; // Deshabilita el botón para evitar envíos múltiples

        // 4. Reemplaza con tu Service ID y Template ID
        const serviceID = 'service_m8dx8g4';    // <-- REEMPLAZA
        const templateID = 'template_tu41sok';  // <-- REEMPLAZA

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('¡El mensaje ha sido enviado con éxito!');
                btn.value = 'Enviar Mensaje';
                btn.disabled = false;
                form.reset(); // Limpia los campos del formulario
            }, (err) => {
                alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
                console.error('Error al enviar el formulario:', err);
                btn.value = 'Enviar Mensaje';
                btn.disabled = false;
            });
    });

    // --- Lógica para el botón de desplazamiento (scroll-down) - A-C-T-U-A-L-I-Z-A-D-O ---
    function handleScrollDownButton(currentSectionId, nextSectionId) {
        const currentSection = document.getElementById(currentSectionId);
        const nextSection = document.getElementById(nextSectionId);

        if (currentSection && nextSection) {
            // Elimina cualquier botón de desplazamiento existente en esta sección
            const existingBtn = currentSection.querySelector('.scroll-down-btn');
            if (existingBtn) {
                existingBtn.remove();
            }

            const scrollDownBtn = document.createElement('a');
            scrollDownBtn.href = `#${nextSectionId}`;
            scrollDownBtn.className = 'scroll-down-btn';

            // 1. Crear el ícono de la flecha
            const scrollIcon = document.createElement('i');
            scrollIcon.className = 'fas fa-arrow-down';
            
            // 2. Crear el nodo de texto
            const scrollText = document.createTextNode('Siguiente');

            // 3. Añadir el ícono y el texto al botón
            scrollDownBtn.appendChild(scrollIcon);
            scrollDownBtn.appendChild(scrollText);

            currentSection.style.position = 'relative'; 
            currentSection.appendChild(scrollDownBtn);

            // Manejar el evento de clic para el desplazamiento suave
            scrollDownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    // Llama a la función para cada sección
    handleScrollDownButton('hero-contact', 'form-section');
});