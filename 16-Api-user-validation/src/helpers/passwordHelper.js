const {
    promisify
} = require('util');
const bcrypt = require('bcrypt');
const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

const SALT = 3
class PasswordHelper {
    static hashPassword(password) {
        return hashAsync(password, SALT)
    }

    static comparePassword(password, hash) {
        return compareAsync(password, hash)
    }
}

module.exports = PasswordHelper