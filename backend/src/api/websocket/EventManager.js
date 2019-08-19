const EventDB = require('../../db/models/model_event');
const MessageDB = require('../../db/models/model_message');

class EventUser {
    constructor(username, eventName, socket) {
        this.username = username;
        this.socket = socket;
    }

    sendMessage(username, message) {
        setTimeout (() => {
            this.socket.emit('receiveMessage', {username, message})
        })
    }
}

class Event {
    constructor(eventName) {
        this.eventName = eventName;
        this.eventUsers = new Map();
    }

    sendMessage(senderUsername, message) {
        if (this.eventUsers.has(senderUsername)) {
            this.eventUsers.forEach((eventUser,) => {
                console.log(`Sending msg to ${eventUser.username} ${message}`);
                eventUser.sendMessage(senderUsername, message)
            });
            return true
        }
        return false;
    }

    addUser(eventUser) {
        this.eventUsers.set(eventUser.username, eventUser);
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
        this.socketToUser = new Map();
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
            const eventUser = new EventUser(username, eventName, socket);
            const event = this.events.get(eventName);
            this.socketToUser.set(socket, eventUser);
            console.log(`User Joined Event ${eventName} ${eventUser.username}`);
            return event.addUser(eventUser);
        }
        return false;
    }

    userLeft(socket) {
        if (this.socketToUser.has(socket)) {
            const eventUser = this.socketToUser.get(socket);
            const eventName = eventUser.eventName;
            this.leaveEvent(eventName, eventUser);
            console.log(`User Left Event ${eventName} ${eventUser.username}`);
        }
    }

    // Leave Event
    leaveEvent(eventName, user) {
        if (this.events.has(eventName)) {
            this.events.get(eventName).removeUser(user);
        }
    }

    // Send Message
    sendMessage(eventName, username, message) {
        if (this.events.has(eventName)) {
            return this.events.get(eventName).sendMessage(username, message);
        }
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