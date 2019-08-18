const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// to save time we don't use randomly generated per-user salt
const SERVER_SALT = 'dwa879312noodle88912';
const JWT_SECRET = process.env.AUTH_JWT_SECRET ? process.env.AUTH_JWT_SECRET : 'WhiteHat keyboard cat';

// @todo Store token blacklist for 3600 then delete on next update
const TokenBlackList = [];

const SignJWT = (username, email, duration=3600) => {
    return jwt.sign({
        username: username,
        email: email
    }, JWT_SECRET, {expiresIn: duration})
};

const ValidateJWT = (token) => {
    if (token in TokenBlackList) {
        return false
    }
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (e) {
        console.log(e);
        return false
    }
};

const HashPassword = (pass) => {
    return crypto.createHash('sha1').update(pass).digest('hex') + SERVER_SALT
};

const ValidatePassword = (pass, hash) => {
    return HashPassword(pass) === hash
};

const sendAndSignAuthUser = (res, username, email, eventName) => {
    const jwt = SignJWT(username, email);
    const userData = JSON.stringify({username, email, eventName, jwt}, null, 2);
    res.status(200);
    res.send(userData);
};

module.exports = {
    sendAndSignAuthUser,
    HashPassword,
    ValidatePassword,
    ValidateJWT,
    SignUser: SignJWT
};