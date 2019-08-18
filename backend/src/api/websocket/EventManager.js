const EventDB = require('../../db/models/model_event');
const MessageDB = require('../../db/models/model_message');

class EventUser {
    constructor(username, eventName, socket) {
        this.username = username;
        this.socket = socket;
    }

    sendMessage(username, message) {
        this.socket.emit('onmessage', {username, message})
    }
}

class Event {
    constructor(eventName) {
        this.eventName = eventName;
        this.eventUsers = new Map();
    }

    sendMessage(user, message) {
        if (this.eventUsers.has(user.username)) {
            this.eventUsers.forEach((_, eventUser) => {
                eventUser.sendMessage(user.username, message)
            })
        }
    }

    addUser(user) {
        if (!this.eventUsers.has(user.username)) {
            this.eventUsers.set(user.username, user);
        }
        return true;
    }

    removeUser(user) {
        this.eventUsers.delete(user.username);
    }

    retrieveMessage(user, from, limit) {

    }
}

class EventManager {

    constructor() {
        this.events = new Map();
    }

    createEvent(eventName) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Event(eventName));
            return true;
        }
        return "event already exists"
    }

    // Join Event
    joinEvent(eventName, username, socket) {
        if (this.events.has(eventName)) {
            const user = new EventUser(username, eventName, socket);
            const event = this.events.get(eventName);
            return event.addUser(user);
        }
        return false;
    }

    // Leave Event
    leaveEvent(eventName, user) {
        this.events.get(eventName).removeUser(user);
    }

    // Send Message
    sendMessage(eventName, user, message) {
        this.events.get(eventName).sendMessage(user, message);
    }

    // Retrieve Messages
    retrieveMessage(eventName, user, from, limit) {
        this.events.get(eventName).retrieveMessage()
    }
}

module.exports = {
    EventManager,
    Event,
    EventUser
};