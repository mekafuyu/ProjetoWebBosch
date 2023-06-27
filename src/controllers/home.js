const processo = require ('../model/processo')

module.exports = {
    async getHome(req, res){
        res.render('Home')
    },

    async getHomeCriar(req,res){
        res.render('HomeCriar')
    },

    async getHomeCol(req,res){
        session=req.session;
        if(session.edv){
            const processos = await processo.findAll({
                raw:true,
                attributes: ['Situacao']
            }); 
            res.render('HomeCol', {processos})
        }else
        res.redirect('/')
    },

    async getHomeCand(req,res){
        res.render('HomeCand')
    }
}
