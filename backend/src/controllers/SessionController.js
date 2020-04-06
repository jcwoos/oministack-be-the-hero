const connection = require('../database/connection');

module.exports = {
    async create(rq, rp) {
        const { id } = rq.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name');

        if (!ong) {
            return rp.status(400).json({ error: 'no ong found' });
        }

        return rp.json(ong[0]);
    }
}