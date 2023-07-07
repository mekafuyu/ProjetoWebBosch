const colaborador = require('../model/colaborador')
const crypt = require('../config/crypt')

module.exports = {
    async changepwd(req, res){
        const dados = req.body
        const password = dados.senha
        const cpf = dados.cpf

        const repassword = await colaborador.findAll(dados.cpf, {
            raw: true
        })

        if (!repassword) {
            res.status(401).send({ error: 'invalido' })
            return
        }

        if (dados.cpf == await crypt.decrypt(repassword.cpf)){
            res.status(200).send({ success: 'valido' })
        }

        else
            res.status(401).send({ success: 'invalido' })
            return

    }
}