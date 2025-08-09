document.addEventListener('DOMContentLoaded', () => {

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
    handleScrollDownButton('inicio', 'quienes-somos');
    handleScrollDownButton('quienes-somos', 'nuestro-enfoque');
    handleScrollDownButton('nuestro-enfoque', 'areas-de-practica-destacadas');
    handleScrollDownButton('areas-de-practica-destacadas', 'cta-section');
});