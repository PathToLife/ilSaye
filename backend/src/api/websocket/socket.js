const socketIO = require('socket.io');
const {notifyOnline} = require('./online');
const socketCounter = require('./socketCounterManager');
const {EventManager, EventUser} = require('./EventManager');
const {ValidateJWT} = require('../../client/authenticate');

const publicCM = new socketCounter();
const eventManger = new EventManager();

const AttachSockets = (httpServer) => {
    const io = socketIO(httpServer, {
        path: '/socket', // internal TCP path of socket, not to be confused with http path
        transports: ['websocket']
    });

    // Event Routing
    // User Routing
    // Send to admin user
    // Send to user

    // Subscribe to event message board
    // Subscribe to event role call
    // Subscribe to event questions
    // Subscribe to event votes

    publicCM.addUpdateSubscriber((socket) => notifyOnline(socket, publicCM.getNumberOnline()));

    // http://base.com/public/api -> TCP /socket route
    io.of('/publicapi').on("connection", socket => {
        const client = publicCM.addClient(socket);
        console.log(`New client ${client.id} connected. ${publicCM.getNumberOnline()} online`);
        publicCM.updateClients();

        socket.on("disconnect", () => {
            console.log(`Client disconnected ${client.id}`);
            publicCM.removeClient(client);
            publicCM.updateClients();
        });
    });

    io.of('/privateapi').on("connection", socket => {

        console.log(`Private Client Joined ${socket.handshake.address}}`);

        socket.on("createEvent", ({jwt, eventName}) => {
            const data = ValidateJWT(jwt);
            if (data) {
                socket.emit("createEvent", eventManger.createEvent(eventName));
            }
        });

        socket.on("joinEvent", ({jwt, eventName}) => {
            if (!jwt || !eventName || eventName.length === 0) {
                socket.emit("joinEvent", false);
                return;
            }
            const data = ValidateJWT(jwt);
            if (data) {
                const joinResult = eventManger.joinEvent(eventName, data.username, socket);
                socket.emit("joinEvent", joinResult);
            }
        });

        socket.on("sendmessage", ({jwt, eventName, message}) => {
            const data = ValidateJWT(jwt);
            if (data) {
                eventManger.sendMessage(eventName, data.username, message)
            }
        });

        socket.on("disconnect", () => {
            console.log(`Private Client disconnected`);
        });
    })
};

module.exports = AttachSockets;