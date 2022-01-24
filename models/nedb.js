const Datastore = require("nedb");
users = new Datastore("users.db");
users.loadDatabase();
alunos = new Datastore("alunos.db");
alunos.loadDatabase();
grupos = new Datastore("grupos.db");
grupos.loadDatabase();
perguntas = new Datastore("perguntas.db");
perguntas.loadDatabase();
atividades = new Datastore("atividades.db");
atividades.loadDatabase();
modulos= new Datastore("modulos.db");
modulos.loadDatabase();
docentes= new Datastore("docentes.db");
docentes.loadDatabase();



// Ativa um utilizador (faz um Update)
exports.crUd_ativar = (confirmationToken) => {
  users.update(
    {
      confirmationToken: confirmationToken,
    },
    {
      $set: {
        confirm: 1,
      },
    },
    {},
    function (err, nRegistos) {
      console.log("Registos alterados---->" + nRegistos);
    }
  );
};

// Retorna o utilizador e sua password encriptada
exports.cRud_login = (email) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    users.findOne(
      {
        email: email,
      },
      (err, user) => {
        if (err) {
          reject({ msg: "Problemas na base de dados!" });
        } else {
          if (user == null) {
            reject({ msg: "Utilizador inexistente!" });
          } else if (user.confirm != 1) {
            reject({ msg: "Ativação pendente. Verifique seu email!" });
          } else {
            resolve(user);
          }
        }
      }
    );
  });
};

exports.Crud_registar = (idaluno, email, password, confirmationToken) => {
  // insere um novo utilizador
  return new Promise((resolve, reject) => {
    data = {
      _id: idaluno,
      email: email,
      confirm: 0,
      password: password,
      confirmationToken: confirmationToken,
    };
    users.insert(data, (err, dados) => {
      if (err) {
        reject(null);
      } else {
        resolve(dados);
      }
    });
  });
};


exports.cRud_all = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    alunos.find({}, (err, dados) => {
      if (err) {
        reject("Não há disciplinas para mostrar!");
      } else {
        resolve(dados);
      }
    });
  });
};

exports.cRud_id = (id) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    disciplinas.find(
      {
        _id: id,
      },
      (err, dados) => {
        if (err) {
          reject("Disciplina com o id " + id + " não encontrada!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};

exports.cRud_key = (criteria) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    disciplinas.find(
      {
        $or: [
          {
            disciplina: new RegExp(criteria), // RegExp é para usar como expressão regular /criterio/
          },
          {
            docente: new RegExp(criteria),
          },
          {
            curso: new RegExp(criteria),
          },
          {
            ano: Number(criteria),
          },
        ],
      },
      (err, dados) => {
        if (err || Object.keys(dados).length == 0) {
          reject("Não posso mostrar disciplinas!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};

//module.exports = db.alunos;

