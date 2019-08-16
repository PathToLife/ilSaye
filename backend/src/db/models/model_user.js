const db = require('../db');
const SQ = require('sequelize');

const User = db.define('user', {
    id: {
        type: SQ.STRING,
        unique: true,
        primaryKey: true
    },
    username: {
        type: SQ.STRING,
        isNull: false
    }
}, {});

module.exports = User;