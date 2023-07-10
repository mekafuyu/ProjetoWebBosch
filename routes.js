const multer = require('multer');
const config = require('./src/config/multer');

const express = require('express');
const routes = express.Router();
const login = require('./src/controllers/login')
const cadastro = require('./src/controllers/cadastro');
const home = require('./src/controllers/home');
const corrigir =  require('./src/controllers/pythoncaller');
const repassword = require('./src/controllers/repassword')


routes
    .get('/', home.getHome).post('/',home.getHome)
    .post('/changepwd', repassword.changepwd)
    
    .post('/LoginCol', login.loginCol).get('/HomeCriar', home.getHomeCriar).get('/Logout', login.logout)
    .post('/LoginCand', login.loginCand).get('/HomeCand', home.getHomeCand).post('/HomeCand', home.postHomeCand)

    .get('/AddCol', cadastro.colaborador).post('/AddCol', cadastro.colaboradorInsert)
    .get('/AddProc', cadastro.processo).post('/AddProc', cadastro.processoInsert)

    .get('/Corrigir', corrigir.getCorrect).post('/Corrigir', multer(config).single('gabarito'), corrigir.postCorrect)

module.exports = routes;