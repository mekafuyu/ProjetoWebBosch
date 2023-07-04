const colaborador = require('../model/colaborador');
const processo = require('../model/processo');
const candidato = require('../model/candidato');
var XLSX = require("xlsx");
const { json } = require('sequelize');
// const xlsx = require('xlsx')

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

            await colaborador.create({
                EDV: dados.edv,
                Senha: dados.senha
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
                if (jsonData.length === 0 || jsonData[0].Nome) {
                    return res.status(400).json({
                        success: false,
                        message: "xml sheet has no data",
                    });
                }
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