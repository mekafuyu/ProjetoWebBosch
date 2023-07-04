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
        const defaultpath = './public/img/exams/'

        var spawn = require("child_process").spawn;
    
        var process = spawn('python',["./src/scripts/script.py",
                                defaultpath+req.file.filename] );
                                
        process.stdout.on('data', function(data) {
            res.send(data.toString());
        } )
    },
    async getCorrect(req, res){
        res.render('Corrigir')
    }
}