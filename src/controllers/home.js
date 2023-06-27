module.exports = {
    async gethome(req, res){
        res.render('../views/Home')
    },

    async homeCol(req, res){
        session=req.session;
        if(session.edv){
            res.render('HomeCol');
        }else
        res.redirect('/')
    }
}