document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-button');

    // Comprueba si los elementos de audio y botón existen en el DOM
    if (backgroundMusic && musicToggleButton) {
        // --- 1. Estado inicial basado en localStorage o por defecto ---
        // Recuperar la preferencia del usuario de localStorage
        // Si no existe, por defecto asumimos que está muteado al cargar la página
        const isMutedGlobally = localStorage.getItem('backgroundMusicMuted') === 'true';
        backgroundMusic.muted = isMutedGlobally;

        // Actualizar el ícono del botón según el estado inicial
        if (backgroundMusic.muted) {
            musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            // Si no estaba muteado en localStorage, intenta reproducir
            // Esto solo se hará si el navegador lo permite (puede requerir interacción)
            backgroundMusic.play().catch(error => {
                console.warn("Intento de reproducción inicial desmuteada falló:", error);
                // Si la reproducción falla (ej. por autoplay policy), mantenemos el estado visual
                // pero podrías considerar mutearlo de nuevo o indicar el fallo al usuario.
                // Por ahora, solo se registra el error.
            });
        }

        // --- 2. Manejo del clic en el botón ---
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.muted) {
                // Si está silenciado, desactiva el silencio
                backgroundMusic.muted = false;
                localStorage.setItem('backgroundMusicMuted', 'false'); // Guardar preferencia
                backgroundMusic.play().catch(error => {
                    console.warn("La reproducción de música falló al intentar activar el sonido:", error);
                });
                musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                // Si no está silenciado, activa el silencio
                backgroundMusic.muted = true;
                localStorage.setItem('backgroundMusicMuted', 'true'); // Guardar preferencia
                backgroundMusic.pause(); // Pausar para liberar recursos y evitar seguir sonando
                musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });

        // --- 3. Auto-reproducción tras la primera interacción del usuario ---
        // Este listener intentará reproducir si la música está pausada y NO muteada por el usuario.
        // Se disparará solo una vez para cubrir las políticas de autoplay.
        document.body.addEventListener('click', () => {
            if (backgroundMusic.paused && !backgroundMusic.muted) {
                backgroundMusic.play().catch(error => {
                    console.warn("Intento de reproducción después de interacción falló:", error);
                });
            }
        }, { once: true });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // La pestaña ha vuelto a estar visible
                if (!backgroundMusic.muted && backgroundMusic.paused) {
                    // Si no está muteada por el usuario y está pausada, intentar reanudar
                    backgroundMusic.play().catch(error => {
                        console.warn("Reanudación de música al volver a la pestaña falló:", error);
                    });
                }
            } else {
            }
        });

    } else {
        console.error("No se encontraron los elementos 'background-music' o 'music-toggle-button' en el DOM.");
    }
});