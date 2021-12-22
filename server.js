const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const app = express();
app.set('view-engine', 'ejs')
var router = require("express").Router();
const controlador = require("../DEVWEV_TBL-main/controllers/controller");
app.use(express.json()); // Faz o parse (validação e interpretação) de solicitações do tipo application/json
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({
  exposedHeaders: ['Location'],
}));

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
app.listen(port, function(err) {
  if (!err) {
    console.log('Your app is listening on ' + host + ' and port ' + port);
  }
  else {
    console.log(err);
  }
});

var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', (req,res) => {
  res.render('login.ejs')
})

app.get('/register', (req,res) => {
  res.render('register.ejs')
})

// Cria um novo utilizador
app.post("/registar", controlador.registar);
  
// Rota para login - tem de ser POST para não vir user e pass na URL
app.post("/login", controlador.login);

// Rota para verificar e ativar o utilizador
app.get("/auth/confirm/:confirmationCode", controlador.verificaUtilizador)

app.post("/admin", controlador.create);

app.get("/admin", controlador.consult);

app.post("/grupo", controlador.createGrupo);


module.exports = app;
