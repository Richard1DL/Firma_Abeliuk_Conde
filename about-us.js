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

    // --- Llamadas a la función para las secciones de la página "Quiénes Somos" (about-us.html) ---
    handleScrollDownButton('inicio', 'founder-section');
    handleScrollDownButton('founder-section', 'mission-vision-section');
    handleScrollDownButton('mission-vision-section', 'approach-section-about');
    handleScrollDownButton('approach-section-about', 'values-section');
    handleScrollDownButton('values-section', 'cta-section');
});