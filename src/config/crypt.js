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


    async cryptpcf(cpf) {
        const cipher = crypto.createCipher(algorithm, process.env.CRYPT_PWD);
        const cryped = cipher.update(cpf, 'utf8', 'base64');
        return cryped
    },

    async decryptcpf(cpf) {
        const decipher = crypto.createDecipher(algorithm, process.env.CRYPT_PWD);
        const plain = decipher.update(cpf, 'base64', 'utf-8');
        return plain

    }

}




