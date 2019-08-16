require('dotenv').config();

const expect = require('expect');
const {Request, TYPES} = require('tedious');
const {describe, it} = require('mocha');

describe("DB", () => {

    it('should be defined DB_HOST', (done) => {
        const val = process.env.DB_HOST;
        // console.log(val);
        expect(val).toBeDefined();
        done();
    });

    it('should be defined DB_USER', (done) => {
        const val = process.env.DB_USER;
        // console.log(val);
        expect(val).toBeDefined();
        done();
    });

    it('should be defined DB_PASS', (done) => {
        const val = process.env.DB_PASS;
        expect(val).toBeDefined();
        done();
    });

    let conn = null;
    it('should connect without errors', (done) => {
        conn = require('./conn');
        conn.on('connect', (err) => {
            done(err);
        });
    });

    it('should write to test_table', (done) => {
        // language=TSQL
        const stmt = `INSERT INTO dbo.test_table (text)
                      VALUES (@text)`;
        const request = new Request(stmt
            , function (err, rowCount) {
                if (err) {
                    // console.log(err);
                    done(err);
                } else {
                    // console.log(`Inserted ${rowCount} Rows`);
                    done();
                }
            });
        request.addParameter('text', TYPES.VarChar, 'Mocha Test Text');

        conn.execSql(request);
    });

    it('should download from test_table', (done) => {
        // language=TSQL
        const stmt = `SELECT * FROM dbo.test_table`;
        const req = new Request(stmt, (err, rowCount, rows) => {
            if (!err) {
                // console.log(`Got ${rowCount} rows`);
                rows.forEach(row => {
                    const data = row.map(col => col.value);
                    // console.log(data);
                });
                done();
            } else {
                done(err);
            }
        });

        conn.execSql(req);
    });
});