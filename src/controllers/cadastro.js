const colaborador = require ('../model/colaborador');
const processo = require ('../model/processo');

module.exports = {

    async colaborador(req, res){
        res.render('../views/AddCol');
    },

    async colaboradorInsert(req, res){
        const dados = req.body;

        await colaborador.create({
            EDV: dados.edv,
            Senha: dados.senha
        });
        res.redirect('/');
    },

    async processo(req, res){
        res.render('../AddProc');
    },

    async processoInsert(req,res){
        const dados = req.body;

        await processo.create ({
            Etapa: dados.etapa,
            Situacao: dados.situacao
        }),

        res.redirect('/')
    }
}