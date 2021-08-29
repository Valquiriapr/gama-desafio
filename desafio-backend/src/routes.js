const express = require('express');
const CandidateController = require('./controllers/CandidateController');
const routes = new express.Router();

routes.post('/registro', CandidateController.register);

routes.get('/', (req, res) => {
    res.send('Conexão OK!');
});
module.exports = routes;