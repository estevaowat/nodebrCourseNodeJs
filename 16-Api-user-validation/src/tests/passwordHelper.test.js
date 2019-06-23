const assert = require('assert');
const PasswordHelper = require('./../helpers/passwordHelper');

const PASSWORD = '123';
const HASH = '$2b$04$Azx7LH2IabXjrIVM/Ynl1.QQIZ9TcbkK6Qg2Dj2rxvOW1ipS9YU0S';

describe('Password Helper Tests', function () {
    it('Should generate a hash from a password', async () => {
        const result = await PasswordHelper.hashPassword(PASSWORD)
        assert.ok(result.length > 10)
    });
    it('Should compare a password with a hash', async() => {
        const result = await PasswordHelper.comparePassword(PASSWORD, HASH);
        assert.ok(result);
    })
});