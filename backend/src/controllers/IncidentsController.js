const connection = require('../database/connection');

module.exports = {
    async create(rq, rp) {
        const { title, description, value } = rq.body;
        const ong_id = rq.headers.authorization;

        const [id] = await connection('incidents').insert({ title, description, value, ong_id });

        return rp.json({ id });
    },
    async list(rq, rp) {
        const { page = 1 } = rq.query;

        const [count] = await connection('incidents').count();

        rp.header('X-Total-Count', count['count(*)']);
        const ongs = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.state',
            ])
            .limit(5)
            .offset((page - 1) * 5);

        return rp.json(ongs);
    },
    async delete(rq, rp) {
        const { id } = rq.params;
        const ong_id = rq.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return rp.status(401).json({ error: 'operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return rp.status(204).send();
    }
}