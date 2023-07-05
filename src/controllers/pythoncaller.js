// var spawn = require("child_process").spawn;

// function callName(req, res) {
//     var spawn = require("child_process").spawn;

//     var process = spawn('python',["./hello.py",
//                             req.query.firstname] );
  
//     process.stdout.on('data', function(data) {
//         res.send(data.toString());
//     } )
// }

module.exports = {
    async postCorrect(req, res){
        if (!req.file){
            res.status(400).send({error : 'Empty file'})
            return
        }
        
        const defaultpath = './public/img/exams/'

        var spawn = require("child_process").spawn;
    
        var process = spawn('python',["./src/scripts/script.py",
                                        defaultpath+req.file.filename,
                                        req.body.questoes] );
                                
        process.stdout.on('data', function(data) {
            res.status(200).send({success : JSON.parse(data.toString())});
        } )
    },
    async getCorrect(req, res){
        res.render('Corrigir')
    }
}