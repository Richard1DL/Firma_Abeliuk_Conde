const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;


// Middleware para analizar JSON
app.use(cors());
app.use(express.json());

// Inicializar base de datos SQLite
const db = new sqlite3.Database('frases.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS frases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT NOT NULL,
    frase TEXT NOT NULL
)`);

// Sirve archivos estáticos del panel de administración
app.use(express.static(path.join(__dirname, 'public')));

// Sirve la página de frases desde su propia carpeta
app.use(express.static(path.join(__dirname)));

// Ruta para obtener una frase aleatoria según el día
app.get('/frases/:dia', (req, res) => {
    const dia = req.params.dia;
    db.all("SELECT frase FROM frases WHERE dia = ?", [dia], (err, rows) => {
        if (err) {
            return res.status(500).send('Error al leer las frases.');
        }

        if (rows.length === 0) {
            return res.status(404).send('No hay frases para este día.');
        }

        const frases = rows.map(row => row.frase);
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        res.send(fraseAleatoria);
    });
});

// Ruta para agregar frases según el día actual
app.post('/agregar-frase', (req, res) => {
    const nuevaFrase = req.body.frase;
    if (!nuevaFrase) {
        return res.status(400).send('No se proporcionó una frase.');
    }

    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const diaActual = dias[diaSemana];

    db.run("INSERT INTO frases (dia, frase) VALUES (?, ?)", [diaActual, nuevaFrase], function(err) {
        if (err) {
            return res.status(500).send('Error al guardar la frase.');
        }
        res.status(200).send('Frase guardada correctamente.');
    });
});

// Ruta para obtener todas las frases (solo para pruebas o admin)
app.get('/frases', (req, res) => {
    db.all("SELECT * FROM frases", [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error al leer las frases.');
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
