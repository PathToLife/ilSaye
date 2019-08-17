const sendAuthUser = (res, username, email, eventName) => {
    const userData = JSON.stringify({username, email, eventName}, null, 2);
    res.status(200);
    res.send(userData);
};

module.exports = {
    sendAuthUser
};