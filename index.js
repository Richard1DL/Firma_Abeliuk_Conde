document.addEventListener('DOMContentLoaded', () => {
    // --- Crear y añadir el elemento de audio dinámicamente ---
    const backgroundMusic = new Audio(); // Crea un nuevo elemento de audio
    backgroundMusic.id = 'background-music';
    backgroundMusic.loop = true; // Para que se repita

    // Ruta de la música
    const musicSrc = 'musica/Golden Swing.mp3';
    
    // Asigna la fuente (directamente al elemento Audio, no necesitas <source> con new Audio())
    backgroundMusic.src = musicSrc;

    // Puedes añadir el atributo type si lo deseas, aunque no es estrictamente necesario para la mayoría de MP3
    // backgroundMusic.type = 'audio/mpeg'; 

    // Añade el elemento de audio al body del documento
    document.body.appendChild(backgroundMusic);

    // --- Crear y añadir el botón de control de música dinámicamente ---
    const musicToggleButton = document.createElement('button');
    musicToggleButton.id = 'music-toggle-btn'; // ID corregido para coincidir con tu HTML original (si lo tenías)
    musicToggleButton.className = 'music-toggle-btn'; // Asegura que las clases CSS se apliquen
    musicToggleButton.title = 'Activar/Desactivar Música';
    
    // Crea el elemento <i> para el ícono y lo añade al botón
    const musicIconElement = document.createElement('i');
    musicIconElement.classList.add('fas', 'fa-volume-mute'); // Establece el ícono inicial de mute
    musicToggleButton.appendChild(musicIconElement);
    
    // Añade el botón al body del documento
    document.body.appendChild(musicToggleButton);

    // --- Lógica del control de música ---

    // 1. Estado inicial basado en localStorage o por defecto
    const isMutedGlobally = localStorage.getItem('backgroundMusicMuted') === 'true';
    backgroundMusic.muted = isMutedGlobally;

    // Sincroniza el ícono del botón según el estado inicial
    if (backgroundMusic.muted) {
        musicIconElement.classList.remove('fa-volume-up');
        musicIconElement.classList.add('fa-volume-mute');
    } else {
        musicIconElement.classList.remove('fa-volume-mute');
        musicIconElement.classList.add('fa-volume-up');
        // Si no estaba muteado, intenta reproducir. Esto puede ser bloqueado por el navegador
        backgroundMusic.play().catch(error => {
            console.warn("Intento de reproducción inicial desmuteada falló:", error);
            // Si falla, volvemos a mutear y a poner el icono de mute por si acaso
            backgroundMusic.muted = true;
            localStorage.setItem('backgroundMusicMuted', 'true');
            musicIconElement.classList.remove('fa-volume-up');
            musicIconElement.classList.add('fa-volume-mute');
        });
    }

    // 2. Manejo del clic en el botón
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            // Si está silenciado, desactiva el silencio
            backgroundMusic.muted = false;
            localStorage.setItem('backgroundMusicMuted', 'false');
            backgroundMusic.play().catch(error => {
                console.warn("La reproducción de música falló al intentar activar el sonido:", error);
                // Si falla al intentar reproducir (ej. por política del navegador), volvemos a mutear
                backgroundMusic.muted = true;
                localStorage.setItem('backgroundMusicMuted', 'true');
                musicIconElement.classList.remove('fa-volume-up');
                musicIconElement.classList.add('fa-volume-mute');
            });
        } else {
            // Si no está silenciado, activa el silencio
            backgroundMusic.muted = true;
            localStorage.setItem('backgroundMusicMuted', 'true');
            backgroundMusic.pause(); // Pausar para liberar recursos y evitar seguir sonando
        }
    });

    // 3. Auto-reproducción tras la primera interacción del usuario y manejo de visibilidad
    document.body.addEventListener('click', () => {
        // Solo intenta reproducir si está pausada y NO muteada por el usuario
        if (backgroundMusic.paused && !backgroundMusic.muted) {
            backgroundMusic.play().catch(error => {
                console.warn("Intento de reproducción después de interacción falló:", error);
            });
        }
    }, { once: true }); // Se activa solo una vez para cumplir con la política de autoplay

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (!backgroundMusic.muted && backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.warn("Reanudación de música al volver a la pestaña falló:", error);
                });
            }
        }
    });

    // Sincronizar el ícono con el estado real del audio (si cambia externamente)
    backgroundMusic.addEventListener('volumechange', () => {
        if (backgroundMusic.muted) {
            musicIconElement.classList.remove('fa-volume-up');
            musicIconElement.classList.add('fa-volume-mute');
        } else {
            musicIconElement.classList.remove('fa-volume-mute');
            musicIconElement.classList.add('fa-volume-up');
        }
    });

    backgroundMusic.addEventListener('play', () => {
        if (!backgroundMusic.muted) { // Solo si no está muteado
            musicIconElement.classList.remove('fa-volume-mute');
            musicIconElement.classList.add('fa-volume-up');
        }
    });

    backgroundMusic.addEventListener('pause', () => {
        musicIconElement.classList.remove('fa-volume-up');
        musicIconElement.classList.add('fa-volume-mute');
    });

    backgroundMusic.addEventListener('ended', () => {
        musicIconElement.classList.remove('fa-volume-up');
        musicIconElement.classList.add('fa-volume-mute');
        backgroundMusic.muted = true; // Asegurarse de que quede muteado al finalizar
        localStorage.setItem('backgroundMusicMuted', 'true');
    });
});