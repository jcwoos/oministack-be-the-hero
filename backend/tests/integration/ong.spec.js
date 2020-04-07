const req = require('supertest');
const app = require('../../src/app');
const id = require('../../src/utils/GenerateUniqueId');
const connection = require('../../src/database/connection');

describe('ong', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(async () => {
        connection.destroy();
    })
    it('should be able to create a new ong', async () => {
        const res = await req(app)
            .post('/ongs')
            // .set('Authorization':'asasda')
            .send({
                "name": "ong #" + id(),
                "email": "email@ong.com",
                "whatsapp": "12345123451",
                "city": "Ong's city",
                "state": "OS"
            });

        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toHaveLength(8);
    })
})