const EventDB = require('../../db/models/model_event');
const MessageDB = require('../../db/models/model_message');

class EventUser {
    constructor(username, eventName, socketID) {
        this.username = username;
        this.socketID = socketID;
    }

    sendMessage(username, message, io) {
        setTimeout (() => {
            io.socket.
            this.socketID.emit('receiveMessage', {username, message})
        })
    }
}

class Event {
    constructor(eventName, io) {
        this.io = io;
        this.eventName = eventName;
        this.eventUsers = new Map();
    }

    sendMessage(senderUsername, message) {
        if (this.eventUsers.has(senderUsername)) {
            this.eventUsers.forEach((eventUser,) => {
                console.log(`Sending msg to ${eventUser.username} ${message}`);
                eventUser.sendMessage(senderUsername, message, io)
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

    constructor(io) {
        this.io = io;
        this.events = new Map();
        this.socketToUser = new Map();
    }

    createEvent(eventName) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Event(eventName, io));
            return true;
        }
        return "event already exists"
    }

    // Join Event
    joinEvent(eventName, username, socketID) {
        if (this.events.has(eventName)) {
            const eventUser = new EventUser(username, eventName, socketID);
            const event = this.events.get(eventName);
            this.socketToUser.set(socketID, eventUser);
            console.log(`User Joined Event ${eventName} ${eventUser.username}`);
            return event.addUser(eventUser);
        }
        return false;
    }

    userLeft(socketID) {
        if (this.socketToUser.has(socketID)) {
            const eventUser = this.socketToUser.get(socketID);
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