const express = require('express');

let active = false;

const router = express.Router();

router.get('/', (req, res) => {
    res.send('api v1.0');
});
router.get('/status', (req, res) => {
    res.send(`Active ${active}`);
});
router.route('/control')
    .get((req, res) => {
        active = !active;
        res.send('Ok');
    });


module.exports = router;