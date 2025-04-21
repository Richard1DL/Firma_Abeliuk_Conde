const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para analizar JSON
app.use(express.json());

// Sirve archivos estáticos del panel de administración
app.use(express.static(path.join(__dirname, 'public')));

// Sirve la página de frases desde su propia carpeta
app.use('/frases-del-dia', express.static(path.join(__dirname, 'public_pagina_frases')));

// Ruta para obtener todas las frases (desde frases.json)
app.get('/frases', (req, res) => {
    const archivoFrases = path.join(__dirname, 'frases.json');

    fs.readFile(archivoFrases, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer las frases.');
        }

        const frases = JSON.parse(data);
        res.json(frases);
    });
});

// Ruta para obtener frases según el día
app.get('/frases/:dia', (req, res) => {
    const dia = req.params.dia;
    const archivo = path.join(__dirname, 'frases_dias', `${dia}.txt`);

    fs.readFile(archivo, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Archivo de frases no encontrado para ese día.');
        }

        const frases = data.split('\n').filter(f => f.trim() !== ''); // Filtra líneas vacías
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        res.send(fraseAleatoria);
    });
});


// Ruta para agregar frases y guardarlas en el archivo correspondiente según el día
app.post('/agregar-frase', (req, res) => {
    const nuevaFrase = req.body.frase;

    if (!nuevaFrase) {
        return res.status(400).send('No se proporcionó una frase.');
    }

    // Obtener el día actual
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const diaActual = dias[diaSemana]; // Nombre del día (ej. 'Martes')

    // Ruta del archivo correspondiente al día
    const archivoDia = path.join(__dirname, 'frases_dias', `${diaActual}.txt`);

    // Agregar la frase al archivo correspondiente
    fs.readFile(archivoDia, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // Si el archivo no existe, lo creamos con la frase
            fs.writeFile(archivoDia, nuevaFrase + '\n', 'utf8', (err) => {
                if (err) return res.status(500).send('Error al guardar la frase.');
                res.status(200).send('Frase guardada correctamente.');
            });
        } else {
            // Si el archivo existe, agregamos la nueva frase
            const nuevasFrases = data + nuevaFrase + '\n';
            fs.writeFile(archivoDia, nuevasFrases, 'utf8', (err) => {
                if (err) return res.status(500).send('Error al guardar la frase.');
                res.status(200).send('Frase guardada correctamente.');
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Página de frases en: http://localhost:${port}/frases-del-dia`);
});
