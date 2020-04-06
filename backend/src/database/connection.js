const knex = require('knex');
const conf = require('../../knexfile');
const connection = knex(conf.development);

module.exports = connection;
