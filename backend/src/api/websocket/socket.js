const socketIO = require('socket.io');
const {notifyOnline} = require('./online');
const ClientsManager = require('./clientsManager');

const AttachSockets = (httpServer) => {
    const io = socketIO(httpServer, {
        path: '/socket' // internal TCP path of socket, not to be confused with http path
    });

    // Event Routing
    // User Routing
    // Send to admin user
    // Send to user

    // Subscribe to event message board
    // Subscribe to event role call
    // Subscribe to event questions
    // Subscribe to event votes

    const publicCM = new ClientsManager();

    publicCM.addUpdateSubscriber((socket) => notifyOnline(socket, publicCM.getNumberOnline()));

    // http://base.com/public/api -> TCP /socket route
    io.of('/publicapi').on("connection", socket => {
        const client = publicCM.addClient(socket);
        console.log(`New client ${client.id} connected. ${publicCM.getNumberOnline()} online`);
        publicCM.updateClients();

        socket.on("joinEvent", (data) => {
                console.log(data.code);
            });

        socket.on("disconnect", () => {
            console.log(`Client disconnected ${client.id}`);
            publicCM.removeClient(client);
        });
    });

    io.of('/privateapi').on("connection", socket => {
        console.log(`Private Client Joined`);

        socket.on("disconnect", () => {
            console.log(`Private Client disconnected`);
        });
    })
};

module.exports = AttachSockets;