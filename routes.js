const express = require('express')
const routes = express.Router();
const cadastro = require('./src/controllers/cadastro');
const home = require('./src/controllers/home');

routes
    .get('/', home.gethome)
    .get('/AddCol', cadastro.colaborador).post('/AddCol', cadastro.colaboradorInsert)
    .get('/AddProc', cadastro.processo).post('/AddProc', cadastro.processoInsert);


module.exports = routes;