module.exports = (app) => {
  const controlador = require("../controllers/controller");

  const multer = require('multer')

  var router = require("express").Router();

  const fileStorareEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './views/docs' )
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  });
  
  const upload = multer({storage: fileStorareEngine});

  // Rota para efetuar o upload de um unico ficheiro
  router.post("/single", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send("File uploaded with sucess");
  });

  // Rota para efetuar o upload de multiplos ficheiros
  router.post("/multiple", upload.array("files", 5), (req, res) => {
    console.log(req.file);
    res.send("Files uploaded with sucess");
  });

  const path = require("path");


  // Cria um novo utilizador
  router.post("/registar", controlador.registar);

  // Rota para login - tem de ser POST para não vir user e pass na URL
  router.post("/login", controlador.login);

  // Rota para verificar e ativar o utilizador
  router.get("/auth/confirm/:confirmationCode", controlador.verificaUtilizador);

  // Rota para criar alunos
  router.post("/admin", controlador.create);

  // Rota para consultar alunos
  router.get("/admin", controlador.consult);

  // Rota para remover alunos
  router.post("/remalunos", controlador.removerAlunos);

  // Rota para remover grupos
  router.post("/remgrupos", controlador.removerGrupos);

  // Rota para criar atividades
  router.post("/atividades", controlador.createAtividades);

  // Rota para remover atividades
  router.post("/rematividades", controlador.removerAtividades);

  // Rota para criar modulos
  router.post("/modulos", controlador.createModulos);

  // Rota para remover modulos
  router.post("/remmodulos", controlador.removerModulos);

  // Rota para criar grupos
  router.post("/grupo", controlador.createGrupo);

  // Rota para consultar grupos
  router.get("/grupos", controlador.consultGrupos);

  // Rota para criar docentes
  router.post("/docentes", controlador.createDocentes);

  // Rota para consultar docentes
  router.get("/docentes", controlador.consultDocentes);

  // Rota para remover docentes
  router.post("/remdocentes", controlador.removerDocentes);

  // Rota para criar questoes
  router.post("/questoes", controlador.createQuestoes);

  // Rota para consultar perguntas
  router.get("/questoes", controlador.consultPerguntas);

  // Rota para remover questao por id
  router.post("/remquestao", controlador.removerQuestão);

  // Rota para remover questoes
  router.post("/remquestoes", controlador.removerQuestões);

  // Rota para efetuar o upload de ficheiros
  router.post("/upload", upload.any(), (req, res) => {
    console.log(req.files);
    res.setHeader("Aceess-Control-Allow-Origin", "*");
    res.send("Done.");
  });

  app.use('/', router);
};
