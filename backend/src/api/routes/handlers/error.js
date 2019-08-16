

const notImplemented = (res) => {
    res.status(501);
    res.send('not implemented');
};

module.exports = {
    notImplemented
};