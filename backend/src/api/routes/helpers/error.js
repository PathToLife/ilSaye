/**
 * errors from this server are served in this json format
 * {
 *     errorCode: number,
 *     msg: string
 * }
 * @param errorCode
 * @param msg
 * @returns {string}
 */
const jsonError = (errorCode, msg) => {
    let errorString = '';
    try {
        errorString = JSON.stringify({errorCode, msg}, null, 2);
    } catch (e) {
        errorString = JSON.stringify({errorCode, msg: "exception occurred and parsing error object failed"}, null, 2)
    }
    return errorString
};

const sendError = (res, code, message) => {
    console.log(message);
    res.status(code);
    res.send(jsonError(code, message));
};

const sendNotImplemented = (res) => {
    sendError(res, 501, 'not implemented')
};


module.exports = {
    sendError,
    sendNotImplemented
};