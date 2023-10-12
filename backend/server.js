const express = require('express');
const http = require('http');
const mysql = require('mysql');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

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
    const sql = 'SELECT * FROM pixels';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('place_pixel', (pixelData) => {
        const { x, y, color } = pixelData;
        const sql = 'INSERT INTO pixels (x, y, color) VALUES (?, ?, ?)';
        db.query(sql, [x, y, color], (err, result) => {
            if (err) throw err;
            io.emit('pixel_placed', pixelData);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Démarrage du serveur
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
