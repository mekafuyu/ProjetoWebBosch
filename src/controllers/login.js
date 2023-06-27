const colaborador = require ('../model/colaborador')
const candidato = require ('../model/candidato')

const edv = 'user1'
const senha = 'mypassword'

var session;

module.exports =  {
    async getlogincand(req,res){
        res.render('../views/LoginCand')
    },

    async getlogincol(req,res){
        res.render('LoginCol')
    },

    async loginCol(req, res){
        const dados = req.body;
        if (dados.edv==edv && dados.senha==senha){
            session = req.session;
            session.edv = dados.edv;
            console.log(req.session)
            res.redirect('/HomeCol')
        }
        else{
            res.send('Invalid username or password');
        }
    },

    async logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}