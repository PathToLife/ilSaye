const express = require('express');
//const https = require('https');
const http = require('http');
const AttachSockets = require('./api/websocket/socket');

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

const httpServer = http.createServer(app);
AttachSockets(httpServer);


httpServer.listen(HTTP_PORT, HOST, () => {
    console.log(`HTTP listening on ${HTTP_PORT}`)
});


// if (isNaN(HTTPS_PORT)) {
//     https.createServer(app).listen(HTTPS_PORT, HOST, () => {
//         console.log(`HTTPS listening on ${HTTPS_PORT}`);
//     })
// }
