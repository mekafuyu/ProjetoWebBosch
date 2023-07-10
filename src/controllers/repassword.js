const colaborador = require('../model/colaborador')
const crypt = require('../config/crypt')

module.exports = {
    async changepwd(req, res) {
        const dados = req.body
        const cpf = dados.Cpf

        if (isNaN(dados.edv2)) {
            res.status(401).send({ error: 'tá nulokkkk' })
            return
        }

        const repassword = await colaborador.findByPk(dados.edv2, {
            raw: true
        })

        if (dados.newsenha != dados.confirmnewsenha) {
            res.status(401).send({ success: 'invalidokkkkkkkk' })
            return
        }
      
        if (dados.edv2 == repassword.EDV && cpf == await crypt.decryptcpf(repassword.CPF)) {
            await colaborador.update({
                Senha: await crypt.crypt(dados.confirmnewsenha)
            })
            res.redirect('/');
          
        }
        else
            res.status(401).send({ success: 'invalido' })
}

}