const SQ = require('sequelize');
const db = require('../db');

// class TestText extends SQ.Model {}
// TestText.init({
//     // attributes
//     pk: {
//         type: SQ.STRING,
//         primaryKey: SQ.NUMBER
//     },
//     text: {
//         // allowNull defaults to true
//         type: SQ.STRING
//     },
//     date: {
//         type: SQ.DATE,
//         defaultValue: true
//     }
// }, {
//     db,
//     modelName: 'test_table'
//     // options
// });

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




