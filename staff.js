document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el botón de desplazamiento (scroll-down) ---
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

            const scrollIcon = document.createElement('i');
            scrollIcon.className = 'fas fa-arrow-down';
            
            const scrollText = document.createTextNode('Siguiente');

            scrollDownBtn.appendChild(scrollIcon);
            scrollDownBtn.appendChild(scrollText);

            currentSection.style.position = 'relative';
            currentSection.appendChild(scrollDownBtn);

            scrollDownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    // --- Lógica para la funcionalidad condicional de los correos electrónicos ---
    function handleEmailLinks() {
        // Selecciona todos los enlaces que contienen la dirección de correo
        const emailLinks = document.querySelectorAll('.member-social a[href^="mailto:"]');
        
        // Define el ancho de la pantalla para computadoras
        const desktopWidth = 992;

        if (window.innerWidth > desktopWidth) {
            // Si es un computador, remueve el atributo 'href' para que no sean clicables
            emailLinks.forEach(link => {
                link.removeAttribute('href');
            });
        } else {
            // Si es un celular, se asegura de que el href está presente.
            // Esto es útil si el usuario gira el dispositivo.
            emailLinks.forEach(link => {
                const originalHref = link.getAttribute('data-original-href');
                if (originalHref) {
                    link.setAttribute('href', originalHref);
                }
            });
        }
    }

    // --- Llamadas a la función para las secciones de la página "Quiénes Somos" (about-us.html) ---
    handleScrollDownButton('hero-staff', 'team-section');
    
    // Ejecuta la función de los correos al cargar la página
    handleEmailLinks();

    // Vuelve a ejecutar la función si la ventana cambia de tamaño (por si giran el celular)
    window.addEventListener('resize', handleEmailLinks);
});

