const express = require('express');
const {sendNotImplemented} = require('../builders/error');

const router = express.Router();

router.get('/logout', (req, res) => {
    sendNotImplemented(res);
});
router.post('/login', (req, res) => {
    sendNotImplemented(res);
    try {

    } catch (e) {

    }
    req.body
});
router.post('/logingoogle', (req, res) => {
    sendNotImplemented(res);
});
router.post('/loginfacebook', (req, res) => {
    sendNotImplemented(res);
});

module.exports = router;