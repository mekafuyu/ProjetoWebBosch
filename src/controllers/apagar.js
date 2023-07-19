const processo = require('../model/processo');
const colaborador = require('../model/colaborador');

module.exports = {
    async apagatudo (req,res){
        const dados = req.body

        dados.edvtrash = Number(dados.edvtrash)

        if (isNaN(dados.edvtrash)) {
            res.status(401).send({ error: 'Login invalido' })
            return
        }

        const login = await colaborador.findByPk(dados.edvtrash, {
            raw: true
        })

        if (!login) {
            res.status(401).send({ error: 'invalido' })
            return
        }
       
        if (dados.edvtrash == login.EDV) {
            // await processo.destroy({ where: { KKKKKKKKKKKKKKKKKKKK } })
            res.status(200).send({ success: 'valido' })
        }

        else {
            res.status(401).send({ error: 'invalido' })
            return
        }
    }
}