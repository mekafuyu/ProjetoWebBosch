const colaborador = require('../model/colaborador');
const processo = require('../model/processo');
const crypt = require('../config/crypt')
const valid = require('../config/validCpf')


module.exports = {

    async colaborador(req, res) {
        if (req.session.edv) {
            res.render('AddCol');
            return
        }
        res.redirect('/')
    },

    async colaboradorInsert(req, res) {

        // if (req.session.edv) {
            const dados = req.body;
            const password = dados.senha;
            const cpf = dados.cpf;

            if (await valid.cpfWithoutLetters(cpf)){
                res.status('400').send({error : 'CPF inserido é inválidoajajaja!'})
                return
            }

            if (await valid.validator(cpf)){
                res.status('400').send({error : 'CPF inserido é inválidokkkk!'})
                return
            }

            await colaborador.create({
                EDV: dados.edv,
                Senha: await crypt.crypt(password),
                CPF: cpf
            });
        // }
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