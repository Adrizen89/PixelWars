const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pixel_wars'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Route pour récupérer les pixels
app.get('/pixels', (req, res) => {
    const sql = 'SELECT * FROM pixels ORDER BY timestamp DESC LIMIT 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Route pour mettre à jour un pixel
app.post('/pixels', (req, res) => {
    const color = req.body.color;
    const sql = 'INSERT INTO pixels (color) VALUES (?)';
    db.query(sql, color, (err, result) => {
        if (err) throw err;
        res.send('Pixel updated.');
    });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
