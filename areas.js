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

    // NOTA: Toda la funcionalidad relacionada con el control de la música ha sido eliminada
    // de este archivo, ya que se gestiona en otro script como se indicó.
});