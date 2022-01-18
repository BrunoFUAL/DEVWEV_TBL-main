const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const app = express();
const multer = require('multer')
app.set('view-engine', 'ejs')
var router = require("express").Router();
const controlador = require("../DEVWEV_TBL-main/controllers/controller");
app.use(express.json()); // Faz o parse (validação e interpretação) de solicitações do tipo application/json
app.use(express.urlencoded({ extended: true }));

const fileStorareEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './views/docs' )
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({storage: fileStorareEngine});

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

app.post('/single', upload.single("file"),(req,res) => {
  console.log(req.file);
  res.send('File uploaded with sucess');
});

app.post('/multiple', upload.array("files", 3),(req,res) => {
  console.log(req.file);
  res.send('Files uploaded with sucess');
});

const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', (req,res) => {
  res.render('index')
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

app.get("/grupos", controlador.consultGrupos);

app.get("/docentes", controlador.consultDocentes);

app.post("/questoes", controlador.createQuestoes);

app.post("/atividades", controlador.createAtividades);

app.post("/modulos", controlador.createModulos);

app.get("/questoes", controlador.consultPerguntas);

app.post("/docentes", controlador.createDocentes);


app.post("/upload", upload.any(), (req, res) => {
  console.log(req.files)
  res.setHeader("Aceess-Control-Allow-Origin", "*")
  res.send("Done.")
})

app.get('/', (req,res) => {
  res.render
})


module.exports = app;
