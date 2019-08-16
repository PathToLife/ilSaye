const express = require('express');
const {sendNotImplemented} = require('../builders/error');

const router = express.Router();

router.post('/eventjoin', (req, res) => {
    sendNotImplemented(res);
});
router.get('/eventleave', (req, res) => {
    sendNotImplemented(res);
});
router.get('/eventcreate', (req, res) => {
    sendNotImplemented(res);
});

module.exports = router;