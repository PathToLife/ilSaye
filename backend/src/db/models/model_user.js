const db = require('../db');
const SQ = require('sequelize');

const User = db.define('user', {
    id: {
        type: SQ.STRING,
        primaryKey: true
    },
    username: {
        type: SQ.STRING,
        primaryKey: true
    },
    email: {
        type: SQ.STRING,
        primaryKey: true
    },
    password_hash: {
        type: SQ.STRING,
        default: null
    },
    google: {
        type: SQ.STRING,
        default: null
    },
    facebook: {
        type: SQ.STRING,
        default: null
    },
    joined_event_id: {
        type: SQ.STRING,
        default: null
    }
}, {});

module.exports = User;