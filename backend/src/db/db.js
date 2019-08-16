const Sequelize = require('sequelize');
const {DB_HOST, DB_USER, DB_NAME, DB_PASS} = require('./dbsettings');

const sq = new Sequelize(DB_NAME, DB_USER, DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            requestTimeout: 15000,
            options: {
                encrypt: true,
            }
        }
    }
);

module.exports = sq;