const colaborador = require('../model/colaborador');
const processo = require('../model/processo');

module.exports = {

    async colaborador(req, res) {
        if (req.session.edv) {
            res.render('AddCol');
            return
        }
        res.redirect('/')
    },

    async colaboradorInsert(req, res) {
        if (req.session.edv) {
            const dados = req.body;

            await colaborador.create({
                EDV: dados.edv,
                Senha: dados.senha
            });
        }
        res.redirect('/');
    },

    async processo(req, res) {
        if (req.session.edv) {
            res.render('AddProc');
            return
        }
        res.redirect('/')
    },

    async processoInsert(req, res) {
        if (req.session.edv) {
            const dados = req.body;

            await processo.create({
                Etapa: dados.etapa,
                Situacao: dados.situacao
            })
        }
        res.redirect('/')
    }
}