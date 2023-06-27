const processo = require ('../model/processo')

module.exports = {
    async gethome(req, res){
        res.render('../views/Home')
    },

    async gethomecriar(req,res){
        res.render('../views/HomeCriar')
    },

    async gethomecol(req,res){
        const processos = await processo.findAll({
            raw:true,
            attributes: ['Situacao']
        }); 
        res.render('../views/HomeCol', {processos})
    },

    async gethomecand(req,res){
        res.render('../views/HomeCand')
    }




}
