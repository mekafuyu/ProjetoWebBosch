const colaborador = require('../model/colaborador')
const crypt = require('../config/crypt')

module.exports = {
    async changepwd(req, res) {
        const dados = req.body
        const cpf = dados.Cpf

        console.log(dados.edv2)
        if (isNaN(dados.edv2)) {
            res.status(401).send({ error: 'Nulo' })
            return
        }

        const repassword = await colaborador.findByPk(dados.edv2, {
            raw: true
        })

        if (dados.newsenha != dados.confirmnewsenha) {
            res.status(401).send({ error: 'Dados invalidos' })
            return
        }

        const cpfdb = await crypt.decrypt(repassword.CPF)

        if (dados.edv2.trim() == repassword.EDV.trim() && cpf.trim() == cpfdb.trim()) {
            await colaborador.update({
                Senha: await crypt.crypt(dados.confirmnewsenha)
            }, { where: { EDV: dados.edv2 } })
            res.status(200).send({ success: 'valido' });

        }
        else
            res.status(401).send({ error: 'Invalido' })
    }

}