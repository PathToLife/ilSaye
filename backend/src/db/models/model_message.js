const SQ = require('sequelize');
const db = require('../db');

const Message = db.define('messages', {
    id: {
        primaryKey: true,
        type: SQ.INTEGER,
        autoIncrement: true
    },
    vote_data: {
        type: SQ.STRING,
        allowNull: true,
        default: null
    },
    event_id: {
        type: SQ.STRING,
        allowNull: false
    },
    user_id: {
        type: SQ.STRING,
        allowNull: false
    },
    data_type: {
        type: SQ.STRING,
        allowNull: false
    },
    blob: {
        type: SQ.BLOB,
        allowNull: true,
        default: null
    },
    text: {
        type: SQ.STRING,
        allowNull: true,
        default: null
    }
    // createdAt, updatedAt automatically managed via timestamps
}, {});

module.exports = Message;