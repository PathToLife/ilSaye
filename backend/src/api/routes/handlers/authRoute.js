const express = require('express');
const {sendNotImplemented, sendError} = require('../builders/error');
const {validateToken} = require('../../oauth/googleauth');
const {sendAuthUser} = require('../builders/authOk');
const randName = require('../../../client/generateName');
const UserDB = require('../../../db/models/model_user');

// to save time we don't use randomly generated per-user salt
const SERVER_SALT = 'dwa879312noodle88912';

const crypto = require('crypto');
const router = express.Router();

const HashPassword = (pass) => {
    return crypto.createHash('sha1').update(pass).digest('hex') + SERVER_SALT
};

const ValidatePassword = (pass, hash) => {
    return HashPassword(pass) === hash
};

router.get('/logout', (req, res) => {
    sendNotImplemented(res);
});
router.post('/login', (req, res) => {
    try {
        const reqData = req.body;
        if (reqData && reqData.email && reqData.password) {
            UserDB.findOne({where: {email: reqData.email}}).then(userObj => {

                if (userObj === null) {
                    sendError(res, 401, 'Email or password wrong');
                    return
                }
                if (userObj.password === null) {
                    sendError(res, 401, 'Email or password wrong');
                    return
                }

                if (ValidatePassword(reqData.password, userObj.password_hash)) {
                    sendAuthUser(res, userObj.username, userObj.email, userObj.email);
                } else {
                    sendError(res, 401, 'Email or password wrong');
                }
            })
        } else {
            sendError(res, 401, 'Please provide email and password')
        }
    } catch (e) {
        sendError(res, 503, e)
    }
});
router.post('/logingoogle', async (req, res) => {
    if (req.query.token !== undefined && req.query.token.length > 10) {
        validateToken(req.query.token)
            .then(async (user) => {
                try {
                    // We have a validated user
                    // Now check if there is an account
                    // Else create
                    await UserDB.findOne({
                        where: {
                            email: user.email
                        }
                    }).then(userObj => {
                            if (userObj.email) {
                                sendAuthUser(res, userObj.username, userObj.email, userObj.email);
                            } else {

                                // user not found
                                // Create User with random username
                                UserDB.create({
                                    username: 'GG-' + randName(),
                                    password: null,
                                    google: "yes"
                                }).catch(e => sendError(res, 503, e));
                            }
                        }
                    ).catch(e => sendError(res, 503, e));
                } catch (e) {
                    sendError(res, 503, e);
                }
            })
            .catch(() => sendError(res, 401, 'not valid'))
    } else {
        sendError(res, 401, 'not valid');
    }

});

router.post('/loginfacebook', (req, res) => {
    sendNotImplemented(res);
});

router.post('/signup', (req, res) => {
    try {
        const data = req.body;

        if (!data.email || !data.password) {
            sendError(res, 400, 'usr or pass not included');
            return;
        }
        if (data.password.length < 4 || data.email.length < 4) {
            sendError(res, 400, 'usr or pass too short');
            return;
        }

        UserDB.create({
            username: randName(),
            email: data.email,
            password_hash: HashPassword(data.password)
        }).then((userObj) => {
            res.send(JSON.stringify(userObj, null, 2));
        }).catch(e => sendError(res, 400, e))
    } catch (e) {
        res.send(sendError(res, 503, e));
    }
})
;

module.exports = router;