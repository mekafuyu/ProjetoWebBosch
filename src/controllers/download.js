const candidato = require('../model/candidato')
const XLSX = require("xlsx");

module.exports = {
    async downloadprocesso(req, res) {
        const id = req.params.idprocesso;

        const arraycand = await candidato.findAll({
            raw : true,
            attributes : ['IDCandidato', 'Nome', 'Nota1', 'Nota2', 'Nota3', 'Nota4'],
            where : { IDProcesso : id }
        });

        try{
            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.json_to_sheet(arraycand);
            XLSX.utils.book_append_sheet(workbook, worksheet, `Processo ${id}`);
            XLSX.writeFileXLSX(workbook, `./public/data/processo-${id}.xlsx`);
        }
        catch (e)
        {
            console.log(e)
        }

        const file = `./public/data/processo-${id}.xlsx`;
        res.download(file);
    }
}