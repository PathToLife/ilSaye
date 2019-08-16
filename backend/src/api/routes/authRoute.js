const express = require('express');
const {notImplemented} = require('./handlers/error');

const router = express.Router();

router.get('/logout', (req, res) => {
    notImplemented()
});
router.post('/login', (req, res) => {
    notImplemented()
});
router.post('/logingoogle', (req, res) => {
    notImplemented()
});
router.post('/loginfacebook', (req, res) => {
    notImplemented()
});

module.exports = router;