const multer = require('multer');
const config = require('./src/config/multer');

const express = require('express');
const routes = express.Router();

const login = require('./src/controllers/login')
const cadastro = require('./src/controllers/cadastro');
const home = require('./src/controllers/home');
const corrigir =  require('./src/controllers/corrigir');
const repassword = require('./src/controllers/repassword');


routes
    .get('/', home.getHome).post('/',home.getHome)
    .post('/ChangePwd', repassword.changepwd)
    
    .post('/LoginCol', login.loginCol).get('/HomeCriar', home.getHomeCriar).get('/Logout', login.logout)
    .get('/Cand/:IDCand', home.getHomeCand).post('/Cand', home.getHomeCand).post('/HomeCand', home.postHomeCand)
    .get('/Proc/:IDProcesso', home.viewProc)

    .get('/AddCol', cadastro.colaborador).post('/AddCol', cadastro.colaboradorInsert)
    .get('/AddProc', cadastro.processo).post('/AddProc', multer(config).single('candidatos'), cadastro.processoInsert)

    .get('/Corrigir', corrigir.getCorrect).post('/Corrigir/:IDCand/:Prova', multer(config).single('prova'), corrigir.postCorrect)

module.exports = routes;