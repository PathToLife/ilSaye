const socketIO = require('socket.io');
const {notifyOnline} = require('./online');
const socketCounter = require('./socketCounterManager');
const {ValidateJWT} = require('../../client/authenticate');
const {MIN_EVENT_NAME_LENGTH} = require('./EventManager');

const AttachSockets = (httpServer) => {
    const io = socketIO(httpServer, {
        path: '/socket', // internal TCP path of socket, not to be confused with http path
        transports: ['websocket']
    });

    const publicCM = new socketCounter();

    // eventManger.createEvent('123');

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
    io.of('/publicapi').on("connection", publicSocketRoute => {
        const client = publicCM.addClient(publicSocketRoute);
        console.log(`New client ${client.id} connected. ${publicCM.getNumberOnline()} online`);
        publicCM.updateClients();

        publicSocketRoute.on("disconnect", () => {
            console.log(`Client disconnected ${client.id}`);
            publicCM.removeClient(client);
            publicCM.updateClients();
        });
    });

    const events = [];

    io.of('/privateapi').on("connection", privateSocketRoute => {

        console.log(`Private Client Joined ${privateSocketRoute.handshake.address}}`);

        privateSocketRoute.on("createEvent", ({jwt, eventName}, res) => {
            if (jwt && ValidateJWT(jwt)) {
                if (events.includes(eventName)) return res('event already created');
                if (!(eventName.length >= MIN_EVENT_NAME_LENGTH)) return res('event name too short');

                events.push(eventName);
                privateSocketRoute.join(eventName);
                res(true);
                return
            }
            res(false);
        });

        privateSocketRoute.on("joinEvent", ({jwt, eventName}, res) => {
            if (jwt && ValidateJWT(jwt)) {
                // const joinResult = eventManger.joinEvent(eventName, data.username, privateSocketRoute.id);
                if (eventName.length >= MIN_EVENT_NAME_LENGTH && events.includes(eventName)) {
                    privateSocketRoute.join(eventName);
                    res(true);
                    return
                } else {
                    res('event does not exist');
                }
            }
            res(false);
        });

        privateSocketRoute.on("sendMessage", ({jwt, eventName, message}, res) => {
            const user = ValidateJWT(jwt);
            if (user) {
                console.log(eventName, message);
                //res(eventManger.sendMessage(eventName, data.username, message));
                if (eventName in privateSocketRoute.rooms) {
                    io.of('/privateapi').to(eventName).emit('receiveMessage', {username:user.username, message});
                    res(true);
                } else if (events.includes(eventName)) {
                    res('you have not joined this event');
                } else {
                    res('event does not exist')
                }
                return;
            }
            res(false);
        });

        privateSocketRoute.on("disconnect", () => {
            // Socket.io automatically leaves room on disconnect
            // console.log(`Private Client disconnected`);
        });
    })
};

module.exports = AttachSockets;
