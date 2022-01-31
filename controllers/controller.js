require("dotenv").config();
const mysql = require("mysql2/promise");
const config = require("../config");

// const db = require("../models/nedb"); // Define o MODEL que vamos usar
const dbmySQL = require("../models/mysql"); // Define o MODEL mySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function connect() {
  return new Promise((resolve, reject) => {
    if (!global.connection || global.connection.state == "disconnected") {
      mysql
        .createConnection(config.db)
        .then((connection) => {
          global.connection = connection;
          console.log("Nova conexão ao mySQL");
          resolve(connection);
        })
        .catch((error) => {
          console.log("Erro na ligação ao mySQL:");
          console.log(error);
          reject(error.code);
        });
    } else {
      connection = global.connection;
      resolve(connection);
    }
  });
}

function query(sql, params) {
  return new Promise((resolve, reject) => {
    connect() // Acionado quando fazemos uma query
      .then((conn) => {
        conn
          .execute(sql, params)
          .then(([result]) => {
            console.log("Model: Query");
            // console.log(result);
            resolve(result);
          })
          .catch((error) => {
            reject(error.sqlMessage);
          });
      })
      .catch((error) => {
        console.log("Query:");
        console.log(error);
        reject(error);
      });
  });
}

function authenticateToken(req, res) {
  console.log("A autorizar...");
  const cookies = req.cookies
  console.log('Cookies:')
  console.log(cookies)
  // const authHeader = req.headers["authorization"];
  const token = req.cookies.jwt   //authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("Token nula");
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.email = user;
  });
}
const nodemailer = require("nodemailer");
const { response } = require("express");

// async..await não é permitido no contexto global
async function enviaEmail(recipients, confirmationToken) {
  // Gera uma conta do serviço SMTP de email do domínio ethereal.email
  // Somente necessário na fase de testes e se não tiver uma conta real para utilizar
  let testAccount = await nodemailer.createTestAccount();

  // Cria um objeto transporter reutilizável que é um transporter SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
      user: testAccount.user, // utilizador ethereal gerado
      pass: testAccount.pass, // senha do utilizador ethereal
    },
  });

  // envia o email usando o objeto de transporte definido
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // endereço do originador
    to: recipients, // lista de destinatários
    subject: "Hello ✔", // assunto
    text: "Clique aqui para ativar sua conta: " + confirmationToken, // corpo do email
    html: "<b>Clique aqui para ativar sua conta: " + confirmationToken + "</b>", // corpo do email em html
  });

  console.log("Mensagem enviada: %s", info.messageId);
  // Mensagem enviada: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // A pré-visualização só estará disponível se usar uma conta Ethereal para envio
  console.log(
    "URL para visualização prévia: %s",
    nodemailer.getTestMessageUrl(info)
  );
  // URL para visualização prévia: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Verificar utilizador
exports.verificaUtilizador = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  dbmySQL
    .crUd_ativar(confirmationCode)
    .then(() => {
      const resposta = { message: "O utilizador está ativo!" };
      console.log(resposta);
      return res.send(resposta);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};


// REGISTAR - cria um novo utilizador
exports.registar = async (req, res) => {
  console.log("Registar novo utilizador");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const idaluno = req.body.idaluno
  const email = req.body.email;
  const password = hashPassword;
  const confirmationToken = jwt.sign(
    req.body.email,
    process.env.ACCESS_TOKEN_SECRET
  );
  var existealuno = await verificaraluno(idaluno);
  if (existealuno.length === 0){
    res.status(201).send({
      message:
        "Utilizador não matriculado, contate a secretaria!",
    });
  
  }else{
  console.log("Utilizador matriculado, a efetuar registo");
  const confirmURL = `https://localhost:${process.env.PORT}/auth/confirm/${confirmationToken}`
  dbmySQL
    .Crud_registar(idaluno, email, password, confirmationToken) // C: Create
    .then((dados) => {
      enviaEmail(email, confirmURL).catch(console.error);
      res.status(201).send({
        message:
          "Utilizador criado com sucesso, confira sua caixa de correio para ativar!",
      });
      console.log("Controller - utilizador registado: ");
      console.log(JSON.stringify(dados)); // para debug
    })
    .catch((response) => {
      console.log("Controller - problema ao registar:");
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};
}

// Verificar se o utilizador registado está inscrito como aluno
function verificaraluno(id){
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM ALUNOS WHERE id=?", [id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



// LOGIN - autentica um utilizador
exports.login = async (req, res) => {
  console.log("Autenticação de um utilizador");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const email = req.body.email;
  const password = hashPassword;
  dbmySQL
    .cRud_login(email) //
    .then(async (dados) => {
      if (await bcrypt.compare(req.body.password, dados.password)) {
        const user = { name: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 20 * 60,
        });
        // res.setHeader('Set-Cookie','novoUser=true')
        res.cookie("jwt", accessToken, {
          maxAge: 1000 * 60 * 2,
          httpOnly: true,
        });
        res.status(200).send({ user: email }); // aqui temos de enviar a token de autorização
        console.log("Resposta da consulta à base de dados: ");
        console.log(JSON.stringify(dados)); // para debug
      } else {
        console.log("Password incorreta");
        return res.status(401).send({ erro: "A senha não está correta!" });
      }
    })
    .catch((response) => {
      console.log("Controller:");
      console.log(response);
      return res.status(401).send({
        message: JSON.stringify(response),
      });
    });
};

// CREATE - cria um novo aluno
exports.create = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO ALUNOS (id,nome,contato) values (?,?,?)",
    [data.id, data.nome, data.contato]
  )
  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

exports.consult = (req, res) => {
  dbmySQL
  .cRud_Alunos() // R: Read
  .then((dados) => {
    res.send(dados);
    // console.log("Dados: " + JSON.stringify(dados)); // para debug
  })
  .catch((err) => {
    return res
      .status(400)
      .send({ message: "Não há Alunos para mostrar!" });
  });
}

 
// Remove alunos
 exports.removerAlunos = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remAlunos(id) // D: Delete
    .then((dados) => {
      res.send("Aluno eliminado");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe o aluno escolhido!" });
    });
}

 // CREATE - cria um novo registo de Grupo
exports.createGrupo = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO GRUPOS (id,aluno,pwgrupo) values (?,?,?)",
    [data.id, data.aluno, data.pwgrupo]
  )
  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

// Efetua consulta a grupos existentes
exports.consultGrupos = (req, res) => {
  dbmySQL
    .cRud_Grupos() // R: Read
    .then((dados) => {
      res.send(dados);
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Grupos para mostrar!" });
    });
}

// Remover Grupos
exports.removerGrupos = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remGrupos(id) // D: Delete
    .then((dados) => {
      res.send("Grupo eliminado");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe o grupo escolhido!" });
    });
}


// CREATE - cria um novo registo de Questões
exports.createQuestoes = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO PERGUNTAS (tema,id, question, answer, option1, option2, option3, option4) values (?,?,?,?,?,?,?,?)",
    [data.tema, data.id, data.question, data.answer, data.option1, data.option2, data.option3, data.option4]
  )
  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

// Consultar Perguntas
exports.consultPerguntas = (req, res) => {
  dbmySQL
    .cRud_Perguntas() // R: Read
    .then((dados) => {
      res.send(dados);
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Grupos para mostrar!" });
    });
}

// Remover Questão por id
exports.removerQuestão = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remQuestao(id) // D: Delete
    .then((dados) => {
      res.send("Questão eliminada");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe o questão escolhida!" });
    });
}

// Remover todas as questões
exports.removerQuestões = (req, res) => {
  dbmySQL
    .cruD_remQuestoes() // D: Delete
    .then((dados) => {
      res.send("Questões eliminadas");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existem questões!" });
    });
}

// Criar atividades
 exports.createAtividades = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO ATIVIDADES (id, tema, idpergunta, tipo) values (?,?,?,?)",
    [data.id, data.tema, data.idpergunta, data.tipo]
  )

  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

// Remover atividades
exports.removerAtividades = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remAtividade(id) // D: Delete
    .then((dados) => {
      res.send("Atividade eliminada");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe a atividade escolhida!" });
    });
}

// Criar Modulos
exports.createModulos = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO MODULOS (id, designacao, idatividade) values (?,?,?)",
    [data.id, data.designacao, data.idatividade]
  )
  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

// Remover modulos
exports.removerModulos = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remModulo(id) // D: Delete
    .then((dados) => {
      res.send("Modulo eliminado");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe o modulo escolhida!" });
    });
}

 // CREATE - cria um novo docente
exports.createDocentes = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  query(
    "INSERT INTO DOCENTES (id, nomedocente, contatodocente, passworddocente) values (?,?,?,?)",
    [data.id, data.nomedocente, data.contatodocente, data.passworddocente]
  )
  console.log(JSON.stringify(data));
  const resposta = {message: "Criou um novo registo!"};
  console.log(resposta);
  return res.send(resposta);
};

// Consultar Docentes
 exports.consultDocentes = (req, res) => {
  dbmySQL
    .cRud_Docentes() // R: Read
    .then((dados) => {
      res.send(dados);
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
}


// Remover Docentes
exports.removerDocentes = (req, res) => {
  const id = req.body.id;
  dbmySQL
    .cruD_remDocentes(id) // D: Delete
    .then((dados) => {
      res.send("Docente eliminado");
      // console.log("Dados: " + JSON.stringify(dados)); // para debug
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não existe o docente escolhido!" });
    });
}