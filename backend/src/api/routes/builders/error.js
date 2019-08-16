const jsonError = (errorCode, msg) => {
    return JSON.stringify({errorCode, msg}, null, 2);
};

const sendNotImplemented = (res) => {
    sendError(res, 501, 'not implemented')
};

const sendError = (res, code, message) => {
    res.status(code);
    res.send(jsonError(code, message));
};

module.exports = {
    sendError,
    sendNotImplemented
};