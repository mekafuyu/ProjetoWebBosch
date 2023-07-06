const spawn = require("child_process").spawn;

module.exports = {
    async postCorrect(req, res){
        if (!req.file){
            res.status(400).send({error : 'Empty file'})
            return
        }
        const dados = req.body;
        const gabarito = JSON.parse(dados.gabarito);
        let respostas;
        
        const defaultpath = './public/img/exams/'
    
        var process = spawn('python',["./src/scripts/script.py",
                                        defaultpath+req.file.filename,
                                        dados.questoes] );
                                
        process.stdout.on('data', function(data) {
            respostas = JSON.parse(data.toString())
            // console.log(gabarito);
            // console.log(respostas);
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

            let nota = +(acertos/dados.questoes * 100).toFixed(2)
    
            res.send({success : "Recebido com sucesso" , nota})
        })

    },
    async getCorrect(req, res){
        res.render('Corrigir')
    }
}