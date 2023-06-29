const express = require('express')
const routes = express.Router();
const login = require('./src/controllers/login')
const cadastro = require('./src/controllers/cadastro');
const home = require('./src/controllers/home');
const corrigir =  require('./src/controllers/pythoncaller')

routes
    .get('/', home.getHome)
    .get('/HomeCol', home.getHomeCol).post('/HomeCol', home.postHomeCol)
    .get('/HomeCriar', home.getHomeCriar)
    .get('/HomeCand', home.getHomeCand).post('/HomeCand', home.postHomeCand)
    .get('/LoginCol', login.getLoginCol).post('/LoginCol', login.loginCol).post('/TryLoginCol', login.tryLoginCol)
    .get('/LoginCand', login.getLoginCand).post('/LoginCand', login.loginCand)
    .get('/Logout', login.logout)
    .get('/AddCol', cadastro.colaborador).post('/AddCol', cadastro.colaboradorInsert)
    .get('/AddProc', cadastro.processo).post('/AddProc', cadastro.processoInsert)
    .get('/Corrigir', corrigir.getCorrect).post('/Corrigir', corrigir.postCorrect)

module.exports = routes;