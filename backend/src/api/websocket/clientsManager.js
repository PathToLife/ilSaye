const shortid = require('shortid');

const onlineClients = new Map();

const updateSubscribers = [];

function clientConnected(socket) {
    const id = shortid.generate();

    const client = {
        id: id,
        socket: socket,
        updateSubscribers: []
    };
    onlineClients.set(id, client);

    return client
}

function updateClients() {
    onlineClients.forEach((client) => {
        updateSubscribers.forEach(subscriber => subscriber(client.socket));
    })
}

function addUpdateSubscriber(m_function) {
    updateSubscribers.push(m_function)
}

function getNumberOnline() {
    return onlineClients.size;
}

function clientDisconnected(client) {
    client.updateSubscribers.forEach(subscriber => clearInterval(subscriber));
    onlineClients.delete(client.id);
}

module.exports = {
    clientConnected,
    clientDisconnected,
    updateClients,
    addUpdateSubscriber,
    getNumberOnline
};