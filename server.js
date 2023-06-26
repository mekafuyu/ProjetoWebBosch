const express = require('express');
const routes = require('./routes');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({extended: true}));

//arquivos estáticos
app.use(express.static('public'));

//ejs

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(routes);
app.listen(process.env.APP_PORT, () => console.log(`Acesse: http://localhost:${process.env.APP_PORT}/`));