const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/OngsController');
const incidentsController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sessionControler = require('./controllers/SessionController');

routes.get('/ongs', ongController.list);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().max(11),
        city: Joi.string().required(),
        state: Joi.string().required().length(2),
    }),
}), ongController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1).positive()
    }),
}), incidentsController.list);
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required().positive(),
    }),
}), incidentsController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
}), incidentsController.delete);
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.list);
routes.post('/sessions', sessionControler.create);


module.exports = routes;