const XLSX = require("xlsx");
const crypt = require('../config/crypt')
const valid = require('../config/validCpf')
const pesize = require('../config/pe_size')
const colaborador = require('../model/colaborador');
const processo = require('../model/processo');
const candidato = require('../model/candidato');

module.exports = {

    async colaborador(req, res) {
        if (req.session.edv) {
            res.render('AddCol');
            return
        }
        res.redirect('/')
    },

    async colaboradorInsert(req, res) {

        if (req.session.edv) {
            const dados = req.body;
            const password = dados.senha;
            const cpf = dados.cpf;

            if (isNaN(dados.edv || cpf))
                res.status(401).send({error: 'Cadastro inválido'})

            if (await valid.cpfWithoutLetters(cpf)){
                res.status(401).send({error : 'CPF inválido'})
                return
            }

            if (await valid.validator(cpf)){
                res.status(401).send({error : 'CPF inválido!'})
                return
            }

            if (!(await pesize.requirementpwd(password))){
                res.status(401).send({error : 'senha invalida kkkk'})
                return
            }

            if (!(await pesize.edvnumber(dados.edv))){
                res.status(401).send({error : 'edv invalido kkkk'})
                return
            }

            await colaborador.create({
                EDV: dados.edv,
                Senha: await crypt.crypt(password),
                CPF: await crypt.crypt(cpf)
            });
        }
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

            const processoatual = await processo.create({
                Nome: dados.nome,
                Etapa: 1,
                Situacao: 1
            })

            if (req.file) {
                const workbook = XLSX.readFile('public/img/exams/' + req.file.filename)
                var sheet_name_list = workbook.SheetNames;
                let jsonData = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheet_name_list[0]]
                );
                
                if (jsonData.length === 0 || !jsonData[0].Nome) {
                    return res.status(400).send({ error: "Arquivo não possui informações necessárias" });
                } else
                for (const candidatos of jsonData){
                    await candidato.create({
                        Nome: candidatos.Nome,
                        Nota1: 0,
                        Nota2: 0,
                        Nota3: 0,
                        Nota4: 0,
                        IDProcesso: processoatual.IDProcesso
                    })
                }
            }
        }
        res.redirect('/')
    }
}