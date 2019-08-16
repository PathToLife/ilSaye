const SQ = require('sequelize');
const db = require('../db');

const TestText = db.define('test_table', {
    pk: {
        primaryKey: true,
        type: SQ.INTEGER,
        autoIncrement: true
    },
    text: {
        type: SQ.STRING
    },
    date: {
        type: SQ.DATE
    }
}, {
    freezeTableName:true,
    tableName:'test_table',
    timestamps: false
});

module.exports = TestText;




