const knex = require('knex');
const conf = require('../../knexfile');

const dbConf = process.env.RUNNING_ENV === 'test' ? conf.test : conf.development;

const connection = knex(dbConf);

module.exports = connection;
