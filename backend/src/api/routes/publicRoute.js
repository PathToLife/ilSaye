const express = require('express');

let active = false;

const router = express.Router();

const model_test = require('../../db/models/model_test');
const db = require('../../db/db');

router.get('/', (req, res) => {
    let authed = false;
    db.authenticate().then(() => {
        authed = true;
    }).catch(err => done(err)
    ).finally(() => {
        res.send(`api v1.0 DB ${authed ? 'connected': process.env.DB_HOST}`);
    });

});
router.get('/status', (req, res) => {
    res.send(`Active ${active}`);
});
router.route('/control').get((req, res) => {
    active = !active;
    res.send('Ok');
});

router.get('/dbtest', (req, res) => {
    model_test.findOne().then(data => {
        res.status(200);
        res.send(JSON.stringify(data, null, 2));
    }).catch(err => {
        res.status(503);
        res.send(err)
    })
});


module.exports = router;