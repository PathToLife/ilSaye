const socketIO = require('socket.io');
const {notifyWeather} = require('./weather');

const AttachSockets = (httpServer) => {
    const io = socketIO(httpServer, {
        path: '/socket' // internal TCP path of socket, not to be confused with http path
    });

    // http://base.com/api -> TCP /socket route
    io.of('/api').on("connection", socket => {
        console.log("New client connected");
        notifyWeather(socket);
        const clientUpdater = setInterval(
            () => notifyWeather(socket),
            10000
        );
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(clientUpdater);
        });
        socket.on("hello", (msg) => {
            console.log('hello got', msg);
        });
    });
};

module.exports = AttachSockets;