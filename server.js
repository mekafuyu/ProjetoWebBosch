const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//arquivos estáticos
app.use(express.static('public'));

//sessões
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// cookie parser middleware
app.use(cookieParser());


//ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

//criptografia

const users = []

app.get('/LoginCol', (req,res) => {
    res.json(users)
})

app.post('/LoginCol', async (req,res) => {
    try{
        const hashedpass = await bcrypt.hash(req.body.password,10); //criptografias diferentes para a mesma senha
        const user = { EDV: req.body.edv, Senha: hashedpass};
        users.push(user);
        res.status(201).send();
    } 
    catch{
        res.status(500).send();
    }
})


app.use(routes);
app.listen(process.env.APP_PORT, () => console.log(`Acesse: http://localhost:${process.env.APP_PORT}/`));

