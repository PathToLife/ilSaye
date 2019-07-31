const express = require('express');
const https = require('https');
const http = require('http');

const app = express();

const HTTP_PORT = 8080;
const HTTPS_PORT = null; // 443;

app.get('/', (req, res) => {
    res.send('ok');
});


http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`HTTP listening on ${HTTP_PORT}`)
});
if (!isNaN(HTTPS_PORT)) {
    https.createServer(app).listen(HTTPS_PORT, () => {
        console.log(`HTTPS listening on ${HTTPS_PORT}`);
    })
}

