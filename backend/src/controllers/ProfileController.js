const connection = require('../database/connection');

module.exports = {
    async list(rq, rp) {
        const ong_id = rq.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        return rp.json(incidents);
    }
}