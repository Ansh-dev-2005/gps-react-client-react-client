const crypto = require('crypto')
exports.hashPassword = async (password, salt) => {
    return crypto
            .createHmac('sha256', salt)
            .update(password)
            .digest('hex')
}
