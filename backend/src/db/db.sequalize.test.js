const {describe, it, after} = require('mocha');
const expect = require('expect');

/**
 * This Test Module not only tests the connection code,
 * it also servers a dual purpose of creating / altering tables for a new db
 */

const db = require('./db.js');
const modelTest = require('./models/model_test');
const modelUser = require('./models/model_user');
const modelEvent = require('./models/model_event');
const modelMessage = require('./models/model_message');

describe('Sequelize Connection Test', () => {
    let authed = false;
    const need_auth = (test) => {
        if (!authed) test.skip();
    };

    it('should be authenticated', done => {
        db.authenticate()
            .then(() => {
                authed = true;
                done()
            })
            .catch(err => done(err))
    }).timeout(15000);

    it('should find test_table', function (done) {
        need_auth(this);
        modelTest.findOne().then(data => {
            done()
        }).catch(err => done(err));
    });

    it.skip('should alter test_table', function (done) {
        need_auth(this);
        modelTest.create({text: "Sequelize"}).then(() => {
            done()
        }).catch(err => done(err));
    }).timeout(15000);

    it.skip('should alter table for user', function (done) {
        modelUser.sync({alter: true}).then(() => done())
            .catch(err => done(err));
    }).timeout(15000);

    it.skip('should alter table for event', function (done) {
        modelEvent.sync({alter: true}).then(() => done())
            .catch(err => done(err));
    }).timeout(15000);

    it.skip('should alter table for messages', function (done) {
        modelMessage.sync({alter: true}).then(() => done())
            .catch(err => done(err));
    }).timeout(15000);

    describe('data read/write/delete test', () => {
        const testString = 'modelTest1238089Text';

        it('should write data to test_table', done => {
            modelTest.create({
                text: testString
            }).then(textObj => {
                expect(textObj.text).toEqual(testString);
                done();
            }).catch(e => done(e))
        });

        it('should get data from test_table', done => {
            modelTest.findOne({where: {text: testString}}).then(data => {
                expect(data.text).toEqual(testString);
                done()
            }).catch(e => done(e))
        });

        it('should delete data from test_table', done => {
            modelTest.destroy({where: {text: testString}}).then(data => {
                console.log(data);
                done();
            }).catch(e => done(e))
        });

        it('should not find string in test_table', done => {
            modelTest.findAll({where: {text: testString}}).then(data => {
                expect(data).toEqual([]);
                done();
            }).catch(e => done(e));
        });

    });

    // db keeps this test open
    after(() => {
        db.close().then(() => {});
    })
});