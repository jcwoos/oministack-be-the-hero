const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngsController');
const incidentsController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sessionControler = require('./controllers/SessionController');

routes.get('/ongs', ongController.list);
routes.post('/ongs', celebrate({

}), ongController.create);

routes.get('/incidents', incidentsController.list);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

routes.get('/profile', profileController.list);
routes.post('/sessions', sessionControler.create);


module.exports = routes;