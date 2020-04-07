const generateUniqueId = require('../utils/GenerateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async create(rq, rp) {
        const { name, email, whatsapp, city, state } = rq.body;

        const id = generateUniqueId();

        await connection('ongs').insert({ id, name, email, whatsapp, city, state });

        return rp.json({ id, name, email, whatsapp, city, state });
    },
    async list(rq, rp) {
        const ongs = await connection('ongs').select('*');
        return rp.json(ongs);
    }
}