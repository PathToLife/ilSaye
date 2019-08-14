const socketIO = require('socket.io');
const {notifyWeather, weatherLoopPush} = require('./weather');
const {notifyOnline} = require('./online');
const manager = require('./clientsManager');

const AttachSockets = (httpServer) => {
    const io = socketIO(httpServer, {
        path: '/socket' // internal TCP path of socket, not to be confused with http path
    });

    manager.addUpdateSubscriber((socket) => notifyOnline(socket, manager.getNumberOnline()));

    // http://base.com/api -> TCP /socket route
    io.of('/api').on("connection", socket => {

        const client = manager.clientConnected(socket);
        console.log(`New client ${client.id} connected. ${manager.getNumberOnline()} online`);
        manager.updateClients();

        notifyWeather(socket);

        client.updateSubscribers.push(weatherLoopPush(socket));

        socket.on("disconnect", () => {
            console.log(`Client disconnected ${client.id}`);
            manager.clientDisconnected(client);
        });
        socket.on("hello", (msg) => {
            console.log('hello got', msg);
        });
    });
};

module.exports = AttachSockets;