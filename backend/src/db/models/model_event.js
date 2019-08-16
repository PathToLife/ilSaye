const db = require('../db');
const SQ = require('sequelize');

const Event = db.define('events', {
    id: {
        primaryKey: true,
        type: SQ.INTEGER,
        autoIncrement: true
    },
    is_active: {
        type: SQ.BOOLEAN,
        allowNull: false,
        default: true
    },
    join_code: {
        type: SQ.STRING,
        allowNull: false
    },
    location: {
        type: SQ.STRING
    }
}, {});

module.exports = Event;