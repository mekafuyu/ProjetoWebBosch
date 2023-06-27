const processo = require ('../model/processo')

module.exports = {
    async gethome(req, res){
        res.render('Home')
    },
    
    async gethomecriar(req,res){
        res.render('HomeCriar')
    },

    async gethomecol(req,res){

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

    async gethomecand(req,res){
        res.render('HomeCand')
    }
}
