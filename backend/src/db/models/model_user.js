const db = require('../db');
const SQ = require('sequelize');

const User = db.define('user', {
    id: {
        type: SQ.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: SQ.STRING,
        allowNull: false
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
}, {
    indexes: [
        {unique: true, fields: ['username']},
        {unique: true, fields: ['email']}
    ]
});

module.exports = User;