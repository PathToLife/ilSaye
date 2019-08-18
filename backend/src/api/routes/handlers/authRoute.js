const express = require('express');
const {sendNotImplemented, sendError} = require('../helpers/error');
const {validateToken} = require('../../oauth/googleauth');
const {sendAndSignAuthUser, HashPassword, ValidatePassword, ValidateJWT} = require('../../../client/authenticate');
const {getUserByUsername,getUserByEmail} = require('../../../client/user');
const randName = require('../../../client/generateName');
const UserDB = require('../../../db/models/model_user');

const router = express.Router();

router.get('/auth', (req, res) => {
    if(req.query.token) {
        const decoded = ValidateJWT(req.query.token);
        if (decoded.email) {
            res.status(200);
            res.send(JSON.stringify(decoded));
            return;
        }
    }
    sendError(res, 401, 'not authed');
});
router.get('/logout', (req, res) => {
    res.send({msg:'loggedOut'});
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
                if (userObj.password_hash === null) {
                    sendError(res, 401, 'You need to assign password to this account, please login using something else');
                    return
                }

                if (ValidatePassword(reqData.password, userObj.password_hash)) {
                    sendAndSignAuthUser(res, userObj.username, userObj.email, userObj.email);
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
            .then(async (googleUser) => {
                try {
                    // We have a validated user
                    // Now check if there is an account
                    // Else create
                    await UserDB.findOne({
                        where: {
                            email: googleUser.email
                        }
                    }).then(userObj => {
                            if (userObj !== null && userObj.email) {
                                sendAndSignAuthUser(res, userObj.username, userObj.email, userObj.email);
                            } else {
                                // user not found
                                // Create User with random username
                                UserDB.create({
                                    email: googleUser.email,
                                    username: 'GG-' + randName(),
                                    password: null,
                                    google: "yes"
                                }).then(userObj => {
                                    sendAndSignAuthUser(res, userObj.username, userObj.email, userObj.email);
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

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        if (!data.email || !data.password) {
            sendError(res, 400, 'Please provide email and password');
            return;
        }
        if (data.password.length < 4 || data.email.length < 4) {
            sendError(res, 400, 'Please provide longer password');
            return;
        }

        const user = await getUserByEmail(data.email);

        if (user !== null) {
            if (user.password_hash === null) {
                user.password_hash = HashPassword(data.password);
                user.save().then(
                    (userObj) => {
                        res.send(JSON.stringify(userObj, null, 2));
                    }
                );
                return;
            }
            sendError(res, 400, 'This email already exists');
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