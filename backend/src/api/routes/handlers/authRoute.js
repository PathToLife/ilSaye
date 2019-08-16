const express = require('express');
const {sendNotImplemented, sendError} = require('../builders/error');
const {validateToken} = require('../../oauth/googleauth');
const {sendAuthUser} = require('../builders/authOk');
const randName = require('../../../client/generateName');

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
    if (req.query.token !== undefined && req.query.token.length > 10) {
        validateToken(req.query.token)
            .then((user) => {
                try {
                    // We have a validated user
                    // Now check if there is an account
                    // Else create
                    sendAuthUser(res, randName(), user.email, null);
                } catch (e) {
                    sendError(res, 503, e);
                }
            })
            .catch(() => sendError(res, 403, 'not valid'))
    } else {
        sendError(res, 403, 'not valid');
    }

});
router.post('/loginfacebook', (req, res) => {
    sendNotImplemented(res);
});

module.exports = router;