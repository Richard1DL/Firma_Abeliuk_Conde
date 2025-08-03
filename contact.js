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
});