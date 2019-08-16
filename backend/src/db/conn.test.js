require('dotenv').config();

const expect = require('expect');

describe("DB", () => {

    it('should import without errors', () => {
        require('./conn');
    });

    it('should be defined DB_HOST', () => {
        const host = process.env.DB_HOST;
        expect(host).toBeDefined();
    })
});