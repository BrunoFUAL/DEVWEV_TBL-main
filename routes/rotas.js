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

  router.post("/single", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send("File uploaded with sucess");
  });

  router.post("/multiple", upload.array("files", 3), (req, res) => {
    console.log(req.file);
    res.send("Files uploaded with sucess");
  });

  const path = require("path");

//   router.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname + "/index.html"));
//   });

//   router.get("/", (req, res) => {
//     res.render("index");
//   });

  // Cria um novo utilizador
  router.post("/registar", controlador.registar);

  // Rota para login - tem de ser POST para não vir user e pass na URL
  router.post("/login", controlador.login);

  // Rota para verificar e ativar o utilizador
  router.get("/auth/confirm/:confirmationCode", controlador.verificaUtilizador);

  router.post("/admin", controlador.create);

  router.get("/admin", controlador.consult);

  router.post("/remdocentes", controlador.removerDocentes);

  router.post("/remalunos", controlador.removerAlunos);

  router.post("/remgrupos", controlador.removerGrupos);

  router.post("/remquestao", controlador.removerQuestão);

  router.post("/remquestoes", controlador.removerQuestões);

  router.post("/rematividades", controlador.removerAtividades);

  router.post("/remmodulos", controlador.removerModulos);

  router.post("/grupo", controlador.createGrupo);

  router.get("/grupos", controlador.consultGrupos);

  router.get("/docentes", controlador.consultDocentes);

  router.post("/questoes", controlador.createQuestoes);

  router.post("/atividades", controlador.createAtividades);

  router.post("/modulos", controlador.createModulos);

  router.get("/questoes", controlador.consultPerguntas);

  router.post("/docentes", controlador.createDocentes);

  router.post("/upload", upload.any(), (req, res) => {
    console.log(req.files);
    res.setHeader("Aceess-Control-Allow-Origin", "*");
    res.send("Done.");
  });

//   router.get("/", (req, res) => {
//     res.render;
//   });

  app.use('/', router);
};
