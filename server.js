const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const crypt = require('./src/config/crypt')
const colaborador = require('./src/model/colaborador')
const candidato = require('./src/model/candidato')
const processo = require('./src/model/processo')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// arquivos estáticos
app.use(express.static('public'));

// sessões
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// cookie parser middleware
app.use(cookieParser());

// ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

// config admin default
app.listen(process.env.APP_PORT, async () => {

    await processo.sync();
    await colaborador.sync();
    await candidato.sync();

    if(await colaborador.count() < 1){
    await colaborador.create({
        EDV: process.env.ADMIN_EDV,
        Senha: await crypt.crypt(process.env.ADMIN_PWD),
        CPF: await crypt.crypt(process.env.ADMIN_CPF)
        });
    };

    console.log(`\nhttp://localhost:${process.env.APP_PORT}/\n`)
});                                 