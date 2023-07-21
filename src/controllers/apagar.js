const processo = require('../model/processo');
const colaborador = require('../model/colaborador');
const candidato = require('../model/candidato');

module.exports = {
    async apagatudo (req,res){
        const dados = req.body

        dados.edvtrash = Number(dados.edvtrash)
        dados.processo = Number(dados.processo)

        if (isNaN(dados.edvtrash) || isNaN(dados.processo)) {
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
            await candidato.destroy({
                where: { IDProcesso : dados.processo}
            })
            await processo.destroy({
                where: { IDProcesso : dados.processo}
            })

            res.status(200).send({ success: 'valido' })
        }

        else {
            res.status(401).send({ error: 'invalido' })
            return
        }
    }
}