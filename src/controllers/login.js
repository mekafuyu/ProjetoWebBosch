const colaborador = require ('../model/colaborador')
const candidato = require ('../model/candidato')

module.exports =  {
    async getlogincand(req,res){
        res.render('../views/LoginCand')
    },

    async getlogincol(req,res){
        res.render('../views/LoginCol')


    }






}