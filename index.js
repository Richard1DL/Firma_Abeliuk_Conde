// Función que selecciona el día actual y carga la frase correspondiente desde el backend
function obtenerFraseDelDia() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Solo tomamos los días de la semana que corresponden a Lunes-Viernes
    const diaActual = dias[diaSemana]; // Ajustamos para que 1 = Lunes, 2 = Martes, etc.

    // Cargar la frase correspondiente del servidor
    fetch(`https://pruebafrases-ah68.onrender.com/frases/${diaSemana}`)
        .then(response => response.text())
        .then(frase => {
            // Mostrar la frase en los contenedores correspondientes
            const fraseElementos = [
                document.querySelector('.frase_pc'),
                document.querySelector('.frase_tablets'),
                document.querySelector('.frase_moviles')
            ];

            // Asignamos la frase al contenido de los contenedores
            fraseElementos.forEach(elemento => {
                elemento.textContent = `"${frase}"`;
            });

            // Ajustamos el tamaño de la fuente solo si la frase es muy larga
            ajustarTamanoFuente(frase);
        })
        .catch(error => {
            console.error('Error al cargar la frase del backend:', error);
            // Mostrar un mensaje por si no se puede cargar la frase
            const fraseElementos = [
                document.querySelector('.frase_pc'),
                document.querySelector('.frase_tablets'),
                document.querySelector('.frase_moviles')
            ];

            fraseElementos.forEach(elemento => {
                elemento.textContent = "No se pudo cargar la frase.";
            });
        });
}

// Función para ajustar el tamaño de la fuente según la longitud de la frase
function ajustarTamanoFuente(frase) {
    // Obtenemos los elementos de las frases
    const fraseElementos = [
        document.querySelector('.frase_pc'),
        document.querySelector('.frase_tablets'),
        document.querySelector('.frase_moviles')
    ];

    // Tamaño máximo de la fuente para frases cortas
    const tamanoMaximo = 5; // Unidades en vw para frases cortas
    const tamanoMinimo = 3; // Unidades en vw para frases largas
    const longitudMaxima = 50; // Umbral para considerar que una frase es "larga"

    // Calculamos el tamaño de la fuente basado en la longitud de la frase
    let tamañoFuente;

    // Si la frase es corta, aplicamos un tamaño más grande
    if (frase.length <= longitudMaxima) {
        tamañoFuente = tamanoMaximo;
    } else {
        // Si la frase es larga, reducimos el tamaño
        tamañoFuente = tamanoMinimo;
    }

    // Aplicamos el tamaño de la fuente a los elementos
    fraseElementos.forEach(elemento => {
        elemento.style.fontSize = `${tamañoFuente}vw`;
    });
}

window.onload = obtenerFraseDelDia;

document.addEventListener('DOMContentLoaded', () => {
    const mostrarFraseBtn = document.getElementById('mostrarFraseBtn');
    const fraseContenedores = document.querySelectorAll('.frase-contenedor');

    mostrarFraseBtn.addEventListener('click', () => {
        // Mostrar los contenedores
        fraseContenedores.forEach(el => el.classList.add('mostrar'));

        // Ocultar el botón
        mostrarFraseBtn.style.display = 'none';

        // Obtener la frase del día
        obtenerFraseDelDia();
    });
});
