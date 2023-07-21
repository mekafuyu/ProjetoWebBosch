const colaborador = require('../model/colaborador')
const candidato = require('../model/candidato')
const processo = require('../model/processo')
const crypt = require('../config/crypt')

module.exports = {
    async loginCol(req, res) {
        const dados = req.body;
        dados.edv = Number(dados.edv)

        if (isNaN(dados.edv)) {
            res.status(401).send({ error: 'Login invalido' })
            return
        }

        const login = await colaborador.findByPk(dados.edv, {
            raw: true
        })

        if (!login) {
            res.status(401).send({ error: 'Login invalido' })
            return
        }
       
        if (dados.edv == login.EDV && dados.senha == await crypt.decrypt(login.Senha)) {
            req.session.edv = dados.edv;
            res.status(200).send({ success: 'Login valido' })
        }
        else {
            res.status(401).send({ error: 'Login invalido' })
            return
        }
    }
    ,

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}