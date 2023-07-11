const crypto = require('crypto');
const algorithm = 'aes-256-ctr'
require('dotenv').config()


module.exports = {

    async crypt(password) {
        const cipher = crypto.createCipher(algorithm, process.env.CRYPT_PWD);
        const cryped = cipher.update(password, 'utf8', 'hex');
        return cryped
    },

    async decrypt(password) {
        const decipher = crypto.createDecipher(algorithm, process.env.CRYPT_PWD);
        const plain = decipher.update(password, 'hex', 'utf8');
        return plain

    },

}




