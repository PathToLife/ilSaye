const {describe, it} = require('mocha');
const expect = require('expect');
const TestText = require('./models/model_test');

const db = require('./db.js');

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
        TestText.findOne().then(data => {
            done()
        }).catch(err => done(err));
    });

    it('should write to test_table', function (done) {
        need_auth(this);
        TestText.create({text: "Sequelize"}).then(() => {
            done()
        }).catch(err => done(err));
    })
});