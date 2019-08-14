const express = require('express');
//const https = require('https');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');
const cors = require('cors');
/*
 Need Swagger
 */

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const HTTP_PORT = 8080;
// const HTTPS_PORT = null; // 443;
const HOST = '0.0.0.0';

let active = false;

const api = express.Router();

api.get('/', (req, res) => {
    res.send('api v1.0');
});
api.get('/status', (req, res) => {
    res.send(`Active ${active}`);
});
api.route('/control')
    .get((req, res) => {
        active = !active;
        res.send('Ok');
    });

app.get('/', (req, res) => {
    res.send('ok');
});

app.use('/api', api);


// Testing Socket.io
const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "https://api.darksky.net/forecast/e31bf4cadf43d410d2da84139ab49ab2/-36.846773,174.763057"
        ); // Getting the data from DarkSky
        socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
    path: '/socket'
});

io.on("connection", socket => {
    console.log("New client connected");
    getApiAndEmit(socket);
    const clientUpdater = setInterval(
        () => getApiAndEmit(socket),
        10000
    );
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(clientUpdater);
    });
});
httpServer.listen(HTTP_PORT, HOST, () => {
    console.log(`HTTP listening on ${HTTP_PORT}`)
});


// if (isNaN(HTTPS_PORT)) {
//     https.createServer(app).listen(HTTPS_PORT, HOST, () => {
//         console.log(`HTTPS listening on ${HTTPS_PORT}`);
//     })
// }

