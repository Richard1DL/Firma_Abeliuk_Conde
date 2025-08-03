document.addEventListener('DOMContentLoaded', () => {
    // === Funcionalidad "Ver más/Ver menos" para las tarjetas de áreas de práctica ===

    // Seleccionamos todos los botones "Ver más"
    const toggleButtons = document.querySelectorAll('.toggle-info-btn');

    // Iteramos sobre cada botón encontrado
    toggleButtons.forEach(button => {
        // Añadimos un escuchador de eventos 'click' a cada botón
        button.addEventListener('click', () => {
            // Cuando se hace clic en un botón, encontramos el elemento padre más cercano
            // con la clase '.area-item-detailed'. Esto nos asegura que estamos
            // trabajando con la tarjeta específica a la que pertenece el botón clicado.
            const parentAreaItem = button.closest('.area-item-detailed');

            // Verificamos que hemos encontrado la tarjeta padre
            if (parentAreaItem) {
                // Dentro de esa tarjeta padre específica, encontramos el elemento
                // '.area-additional-info' que contiene la información oculta.
                const additionalInfo = parentAreaItem.querySelector('.area-additional-info');

                // Verificamos que hemos encontrado la información adicional
                if (additionalInfo) {
                    // Alternamos la clase 'visible' en ese elemento de información adicional.
                    // Esta clase, junto con el CSS, controlará la visibilidad y la transición.
                    additionalInfo.classList.toggle('visible');

                    // Cambiamos el texto del botón de "Ver más" a "Ver menos" y viceversa,
                    // según si la información adicional está visible o no.
                    if (additionalInfo.classList.contains('visible')) {
                        button.textContent = 'Ver menos';
                    } else {
                        button.textContent = 'Ver más';
                    }
                }
            }
        });
    });

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

    // --- Llamadas a la función para las secciones de la página "Quiénes Somos" (about-us.html) ---
    handleScrollDownButton('hero-areas', 'practice-areas-detail');
});