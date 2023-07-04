const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const processo = require('../model/processo')
const candidato = require('../model/candidato')
const session = require('express-session')


module.exports = {

    async getHome(req, res) {
        if (req.session.edv){
            let processos;
            if (req.body.search){
                processos = await processo.findAll({
                    raw: true,
                    attributes: ['IDProcesso','Nome', 'Situacao'],
                    where: { Nome : { [Op.substring]: req.body.search } }
                });
            } else {
                processos = await processo.findAll({
                    raw: true,
                    attributes: ['IDProcesso','Nome', 'Situacao']
                });
            }
            console.log(processos)
            res.render('HomeCol', { processos })
        } else res.render('Home')
    },

    async getHomeCriar(req, res) {
        res.render('HomeCriar')
    },

    async postHomeCol(req, res) {
        const si = req.body.Situacao;
        const processos = await processo.findAll({
            raw: true,
            attributes: ['IDProcesso', 'Nome', 'Etapa', 'Situacao'],
            where: { Situacao: si }
        });
        res.render('HomeCol', {processos})
    },


    async getHomeCand(req, res) {
        res.render('HomeCand')
    },

    async postHomeCand(req, res) {
        const id = req.params.IDCandidato;
        const processos = await processo.findAll({
            raw: true,
            attributes: ['IDProcesso', 'Etapa', 'Situacao'],
            where: { IDprocesso: id }
        });
        const candidatos = await candidato.findByPk(id, {
            raw: true,
            attributes: ['IDCandidato', 'Nome', 'Nota1', 'Nota2', 'Nota3', 'Nota4']
        });
        res.render('HomeCand', {processos, candidatos})
    }
}
