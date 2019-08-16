const shortid = require('shortid');

class ClientsManager {

    constructor() {
        this.onlineClients = new Map();
        // Array of socket emit functions
        this.updateSubscribers = [];
    }

    /**
     * @param socket
     * @returns {{id, socket: *, updateSubscribers: Array}}
     */
    addClient(socket) {
        const id = shortid.generate();

        const client = {
            id: id,
            socket: socket,
            updateSubscribers: []
        };
        this.onlineClients.set(id, client);

        return client
    }

    /**
     * Remove client to stop tracking and updates on that socket
     * @param client:string
     */
    removeClient(client) {
        client.updateSubscribers.forEach(subscriber => clearInterval(subscriber));
        this.onlineClients.delete(client.id);
    }

    /**
     * Calls each updateSubscribers socket emit() on every client
     */
    updateClients() {
        this.onlineClients.forEach((client) => {
            this.updateSubscribers.forEach(subscriber => subscriber(client.socket));
        })
    }

    /**
     * Adds a socket emit() function that should be run on every client
     */
    addUpdateSubscriber(m_function) {
        this.updateSubscribers.push(m_function)
    }

    /**
     * Get Number of connected clients
     * @returns {number}
     */
    getNumberOnline() {
        return this.onlineClients.size;
    }
}



module.exports = ClientsManager;