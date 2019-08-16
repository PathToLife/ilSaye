require('dotenv').config(); // Load passwords / ports from .env
const express = require('express');
const http = require('http');
const {AttachSwagger, version} = require('./api/swagger/swag');
//const https = require('https');

// Cross Origin Request
const cors = require('cors');

// Routers
const apiRouter = require('./api/routes/mainRouter');

// Socket
const AttachSockets = require('./api/websocket/socket');

const BUILD_VERSION = version;

const HTTP_PORT = process.env.PORT ? process.env.PORT : 8080;
//const HTTPS_PORT = 443;
const HOST = process.env.HOST ? process.env.HOST : '0.0.0.0';


/**
 * Start Building app
 * @type {Express}
 */
const app = express();

// Cross-origin wild cards
app.use(cors({
    origin: [/\.eozmon\.com$/, /\.azurewebsites\.net$/, /localhost:[0-9]+$/, HOST]
}));
app.get('/', (req, res) => {
    res.send(`API Server ${BUILD_VERSION} <br/> ${(new Date()).toString()}`);
});


app.use('/api/', apiRouter);
AttachSwagger(app);

const httpServer = http.createServer(app);
AttachSockets(httpServer);

httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP listening on ${HTTP_PORT}`)
});

// https.createServer(app).listen(HTTPS_PORT, () => {
//     console.log(`HTTPS listening on ${HTTPS_PORT}`);
// });

