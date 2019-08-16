const {Connection, Request} = require('tedious');

const LOAD_RESULT_MEMORY = true;

const config = {
    server: process.env.DB_HOST, // update me
    authentication: {
        options: {
            userName: process.env.DB_USER, // update me
            password: process.env.DB_PASS // update me
        },
        type: 'default'
    },
    options: {
        database: 'ilSayeDB', //update me
        encrypt: true,
        rowCollectionOnRequestCompletion: LOAD_RESULT_MEMORY
    }
};

const connection = new Connection(config);

connection.on('connect', function (err) {
    // If no error, then good to go...
    if (err) console.log(err);
    console.log(`DB Connected ${config.server}`)
});

module.exports = connection;