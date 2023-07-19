const { spawn } = require("child_process");
const candidato = require('../model/candidato')

module.exports = {
    async postCorrect(req, res){
        if (!req.file){
            res.status(400).send({error : 'Empty file'})
            return
        }
        const dados = req.body;
        const gabarito = JSON.parse(dados.gabarito);
        let respostas;
        let cand = req.params.IDCand;
        
        const defaultpath = './public/img/exams/'

        var process = spawn('python',["./src/scripts/script.py",
                                        defaultpath+req.file.filename,
                                        dados.questoes]);
        
        process.stdout.on('data', (data) => {
            try {
                respostas = JSON.parse(data.toString())
            } catch (error) {
                return res.send({error : data.toString()})
            }

            let acertos = 0;
            for (let i = 1; i <= dados.questoes; i++) {
                let key = i.toString();
                let correta = gabarito[key];
                let resposta = respostas[key]

                if (!resposta)
                    continue
                if (resposta.length != 1)
                    continue
                if (resposta[0] == correta)
                    acertos++
            }

            let nota = +(acertos/dados.questoes * 100).toFixed(2);

            candidato.update(
                { Nota1: nota },
                { where: {
                    IDCandidato: cand
                }}
            )
    
            res.send({success : "Recebido com sucesso" , nota, cand})
        })
    },
    
    async getCorrect(req, res){
        if (req.session.edv) 
            res.render('Corrigir');
        res.redirect('/');
    }
}