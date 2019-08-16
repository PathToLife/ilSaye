require('dotenv').config(); // Load passwords / ports from .env
const express = require('express');
const http = require('http');
//const https = require('https');

// Cross Origin Request
const cors = require('cors');

// Routers
const publicRoute = require('./publicRoute');

// Socket
const AttachSockets = require('./api/websocket/socket');

/*
 Need Swagger
 */

const HTTP_PORT = process.env.PORT ? process.env.PORT : 8080;
//const HTTPS_PORT = 443;
const HOST = process.env.HOST ? process.env.HOST : '0.0.0.0';

const app = express();
app.use(cors({
    origin: HOST
}));

app.get('/', (req, res) => {
    res.send('ok ');
});

app.use('/api', publicRoute);

const httpServer = http.createServer(app);
AttachSockets(httpServer);

httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP listening on ${HTTP_PORT}`)
});

// https.createServer(app).listen(HTTPS_PORT, () => {
//     console.log(`HTTPS listening on ${HTTPS_PORT}`);
// });

