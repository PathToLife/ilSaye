const express = require('express');
const {notImplemented} = require('./handlers/error');

const router = express.Router();

router.post('/eventjoin', (req, res) => {
    notImplemented()
});
router.get('/eventleave', (req, res) => {
    notImplemented()
});
router.get('/eventcreate', (req, res) => {
    notImplemented()
});

module.exports = router;