async function getData() {
  const response = await fetch("/admin");
  const data = await response.json();
  const listaAlunos = document.getElementById("listaAlunos");

  for (aluno of data) {
    const root = document.createElement("div");
    const nome = document.createElement("div");
    const idaluno = document.createElement(`div`);

    nome.textContent = `Nome do Aluno: ${aluno.nome}`;
    idaluno.textContent = `ID: ${aluno._id}`;
    root.append(nome, idaluno);
    listaAlunos.append(root);
  }
  console.log(listaAlunos);
}

async function getPerguntas() {
  const response = await fetch("/questoes");
  const data = await response.json();
  const listaQuestoes = document.getElementById("listaQuestoes");

  for (pergunta of data) {
    const root2 = document.createElement("div");
    const Tema = document.createElement("div");
    const NumQuestão = document.createElement(`div`);
    const Questão = document.createElement(`div`);

    Tema.textContent = `Tema: ${pergunta.tema}`;
    NumQuestão.textContent = `ID: ${pergunta._id}`;
    Questão.textContent = `Questão: ${pergunta.question}`;
    root2.append(Tema, NumQuestão, Questão);
    listaQuestoes.append(root2);
  }
  // console.log(listaQuestoes);
}

async function removerDocente(req,res) {
  const id = document.getElementById("iddoc").value;
  const response = await fetch(`/remdocentes`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverDocente"
  ).innerHTML = `Pedido Executado com Sucesso: Docente com id ${id} removido`;
}

async function removerAluno(req,res) {
  const id = document.getElementById("iden").value;
  const response = await fetch(`/remalunos`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverAluno"
  ).innerHTML = `Pedido Executado com Sucesso: Aluno com id ${id} removido`;
}

async function removerGrupo(req,res) {
  const id = document.getElementById("grup").value;
  const response = await fetch(`/remgrupos`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverGrupo"
  ).innerHTML = `Pedido Executado com Sucesso: Grupo com id ${id} removido`;
}

async function removerQuestão(req,res) {
  const id = document.getElementById("idQuestao").value;
  const response = await fetch(`/remquestao`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverQuestão"
  ).innerHTML = `Pedido Executado com Sucesso: Pergunta com id ${id} removida`;
}

async function removerQuestões(req,res) {
  const response = await fetch(`/remquestoes`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverQuestões"
  ).innerHTML = `Pedido Executado com Sucesso: Todas as perguntas foram eliminadas da base de dados`;
}

async function removerAtividade(req,res) {
  const id = document.getElementById("refativ").value;
  const response = await fetch(`/rematividades`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverAtividade"
  ).innerHTML = `Pedido Executado com Sucesso: Atividade com id ${id} removida`;
}

async function removerModulo(req,res) {
  const id = document.getElementById("refmodulo").value;
  const response = await fetch(`/remmodulos`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json',
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `id=${id}`,
  })
  const data = await response.text();
  console.log(data);
  document.getElementById(
    "statusremoverModulo"
  ).innerHTML = `Pedido Executado com Sucesso: Modulo com id ${id} removido`;
}


async function validaGrupo(req, res) {
  let senhagrupo = document.getElementById("senhagrupoEntrar").value; // tem de ter uma senha
  const response = await fetch("/grupos");
  const data = await response.json();
  // console.log(data);
  for (grupo of data) {
    if (grupo.pwgrupo === senhagrupo) {
      console.log("Grupo registado, a entrar");
      $("#modalEntrarGrupo").modal("show");
    } else {
      console.log("Grupo não registado,fale com o docente");
      document.getElementById(
        "statusGrupo"
      ).innerHTML = `Pedido falhado: Grupo não existe, fale com o seu Docente`;
    }
  }
}

async function validaDocente(req, res) {
  let passworddocente = document.getElementById("passworddocente").value; // tem de ter uma senha
  const response = await fetch("/docentes");
  const data = await response.json();
  console.log(data);
  for (docente of data) {
    if (docente.passworddocente === passworddocente) {
      console.log("Docente Registado, a entrar");
      window.location.replace("https://localhost:8080/views/html/admin.html");
    } else {
      console.log("Docente não criado,fale com a secretaria do Docente");
      document.getElementById(
        "statusDocente"
      ).innerHTML = `Pedido falhado: Docente não existe, contate secretaria do Docente`;
    }
  }
}
