const crypto = require('crypto');

module.exports = function GenerateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
};