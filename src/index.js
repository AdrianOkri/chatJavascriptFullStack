const http = require('http');
const path = require('path'); // Modulo path es para unir directorios

const express = require('express'); // Requerir la dependencia express
const socketio = require('socket.io');

const app = express(); // Llamar la función express, nos devolverá un objeto js con metódos para hacer el servidor
const server = http.createServer(app); // Crearmos un servidor y le mandamos todo el contenido de app
const io = socketio.listen(server); // Conexión de web sockets, app en tiempo real

// settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io); //Requerir el archivo de sockets y mandar nuestra constante io

// static files
app.use(express.static(path.join(__dirname, 'public'))); // Mandar la carpeta public cada que el usuario se conecte al chat
// starting the server
server.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
}); // El servidor se quedará escuchando en el puerto 3000
