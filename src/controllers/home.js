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

            res.render('HomeCol', { processos })

        } else res.render('Home')
    },

    async getHomeCriar(req, res) {
        if (req.session.edv)
            res.render('HomeCriar')
        else res.redirect('/')
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
        let candparam = req.params.IDCand;
        let candbody = req.body.IDCandidato;

        if(!candparam || candbody)
            return res.redirect('/Cand/'+ candbody)

        const candidatos = await candidato.findByPk(Number(candparam), {
            raw: true,
            attributes: ['IDCandidato', 'Nome', 'Nota1', 'Nota2', 'Nota3', 'Nota4']
        });

        if(!candidatos)
            return res.redirect('/')

        res.render('HomeCand', { candidatos } )
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
    },

    async viewProc(req, res) {
        const id = req.params.IDProcesso;
        
        const candidatos = await candidato.findAll({
            raw: true,
            attributes: ['IDCandidato', 'Nome', 'Nota1', 'Nota2', 'Nota3', 'Nota4', 'IDProcesso'],
            where: { IDProcesso : id }
        });

        res.render('ViewProc', { candidatos })
    }
}
