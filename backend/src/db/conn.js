const {Connection, Request} = require('tedious');

const config = {
    server: process.env.DB_HOST, // update me
    authentication: {
        options: {
            userName: process.env.DB_USER, // update me
            password: process.env.DB_PASS // update me
        },
        type: 'default'
    },
    options:
        {
            database: 'ilSayeDB', //update me
            encrypt: true
        }
};

function executeStatement() {
    const request = new Request("select 42, 'hello world'", function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}

const connection = new Connection(config);

connection.on('connect', function (err) {
    // If no error, then good to go...
    executeStatement();
});

export default connection;