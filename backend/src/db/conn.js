const {Connection} = require('tedious');

const LOAD_RESULT_MEMORY = true;

const config = {
    server: process.env.DB_HOST, // update me
    authentication: {
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        type: 'default'
    },
    options: {
        database: 'ilsayedb',
        encrypt: true,
        rowCollectionOnRequestCompletion: LOAD_RESULT_MEMORY,
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

connection.on('connect', function (err) {
    // If no error, then good to go...
    if (err) console.log(err);
    console.log(`DB Connected ${config.server}`)
});

module.exports = connection;