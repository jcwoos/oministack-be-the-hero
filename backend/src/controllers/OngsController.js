const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(rq, rp) {
        const { name, email, whatsapp, city, state } = rq.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({ id, name, email, whatsapp, city, state });

        return rp.json({ id, name, email, whatsapp, city, state });
    },
    async list(rq, rp) {
        const ongs = await connection('ongs').select('*');
        return rp.json(ongs);
    }
}