document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-button');

    // Comprueba si los elementos de audio y botón existen en el DOM
    if (backgroundMusic && musicToggleButton) {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';

        // Añade un event listener para el clic en el botón
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.muted) {
                // Si está silenciado, desactiva el silencio
                backgroundMusic.muted = false;
                backgroundMusic.play().catch(error => {
                    console.warn("La reproducción de música falló al intentar activar el sonido:", error);
                });
                // Cambia el ícono a "sonido activado"
                musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                backgroundMusic.muted = true;
                backgroundMusic.pause(); // Opcional: puedes solo mutear sin pausar si prefieres
                musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });

        document.body.addEventListener('click', () => {
            if (backgroundMusic.paused && !backgroundMusic.muted) {
                backgroundMusic.play().catch(error => {
                    console.warn("Intento de reproducción después de interacción falló:", error);
                });
            }
        }, { once: true }); // El evento se disparará solo una vez para evitar múltiples intentos.
    } else {
        console.error("No se encontraron los elementos 'background-music' o 'music-toggle-button' en el DOM.");
    }
});