/* importar o módulo do framework express */
var express = require('express');
/* importar o módulo consign */
var consign = require('consign');
/* importar o módulo body-parser */
var bodyParser = require('body-parser');
/* importar o módulo express-validator */
var expressValidator = require('express-validator');

/* iniciar obj do express */
var app = express();
/* setar variáveis 'view engine' e 'views' do express */
app.set('view engine','ejs');
app.set('views', './app/views');
/* configurar o middleware express.static */
app.use(express.static('./app/public'));
/* configurar o middleware Body Parser */
app.use(bodyParser.urlencoded({extended: true}));
/* configurar o middleware express.static */
app.use(expressValidator());
/* efetua o autoload das rotas, models, controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o obj app */
module.exports = app;