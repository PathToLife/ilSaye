const {describe, it} = require('mocha');
const {validateToken} = require('./googleauth');
/**
 * this test class should only be run if we have a valid token
 */

const TOKEN = 'ya29.GlxmBzPGVqWQMgGvhdhUEUjhcC8HTFEiGtJf8BouiXKH6gMBqjjSpDMmPKaSsoFx7z1DcqqI15f_BOYdw7WLB05XMZR9uz1vPMhA8ZgxC0WbVOoNq1vaBf6VgMPZgg';

describe.skip('Google OAuth Test', () => {
    it('should validate', done => {
        validateToken(TOKEN).then(() => done()).catch(e => done(e))
    });

    it('should not validate', done => {
        validateToken('dwad')
            .then(() => done('expected not auth, but got auth'))
            .catch(() => done())
    })
});