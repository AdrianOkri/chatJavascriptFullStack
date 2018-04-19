const http = require('http');
const path = require('path'); // Modulo path es para unir directorios

const express = require('express'); // Requerir la dependencia express
const socketio = require('socket.io');

const app = express(); // Llamar la función express, nos devolverá un objeto js con metódos para hacer el servidor
const server = http.createServer(app); // Crearmos un servidor y le mandamos todo el contenido de app
const io = socketio.listen(server); // Conexión de web sockets, app en tiempo real
// Una vez que io detecte una conexión
io.on('connection', socket => {
    console.log('new user connected');
});
// static files
app.use(express.static(path.join(__dirname, 'public'))); // Mandar la carpeta public cada que el usuario se conecte al chat
// starting the server
server.listen(3000, () => {
    console.log("Server on port 3000");
}); // El servidor se quedará escuchando en el puerto 3000