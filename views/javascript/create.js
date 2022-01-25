async function enviarAluno() {
    const urlBase = "https://localhost:8080/admin";
    const des = document.getElementById("des").value;
    const iden = document.getElementById("iden").value;
    const telf = document.getElementById("telf").value;
    const resultado1 = document.getElementById("resultado1");
    const falhou1 = document.getElementById("falhou1");
    if (des == "" || iden == ""|| telf == ""){
      falhou1.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: `${iden}`,
        nome: `${des}`,
        contato: `${telf}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou1.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado1.innerHTML = resposta.message;
      }
    });
  }

  async function enviarGrupo() {
    const urlBase = "https://localhost:8080/grupo";
    const grup = document.getElementById("grup").value;
    const idaluno = document.getElementById("idaluno").value;
    const pwgrupo = document.getElementById("pwgrupo").value;
    const resultado2 = document.getElementById("resultado2");
    const falhou2 = document.getElementById("falhou2");
    if (grup == "" || idaluno == ""|| pwgrupo == ""){
      falhou2.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${grup}`,
        aluno: `${idaluno}`,
        pwgrupo: `${pwgrupo}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou2.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado2.innerHTML = resposta.message;
      }
    });
  }


  async function enviarQuestoes() {
    const urlBase = "https://localhost:8080/questoes";
    const idQuestao = document.getElementById("idQuestao").value;
    const tema = document.getElementById("tema").value;
    const quest = document.getElementById("quest").value;
    const ans = document.getElementById("ans").value;
    const opt1 = document.getElementById("opt1").value;
    const opt2 = document.getElementById("opt2").value;
    const opt3 = document.getElementById("opt3").value;
    const opt4 = document.getElementById("opt4").value;
    const resultado3 = document.getElementById("resultado3");
    const falhou3 = document.getElementById("falhou3");
    if (idQuestao == "" || quest == ""|| ans == ""){
      falhou3.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${Number(idQuestao)}`,
        tema: `${tema}`,
        question: `${quest}`,
        answer: `${ans}`,
        option1: `${opt1}`,
        option2: `${opt2}`,
        option3: `${opt3}`,
        option4: `${opt4}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou3.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado3.innerHTML = resposta.message;
      }
    });
  }

  async function enviarAtividades() {
    const urlBase = "https://localhost:8080/atividades";
    const tematic = document.getElementById("tematic").value;
    const refativ = document.getElementById("refativ").value;
    const idpergunta = document.getElementById("idpergunta").value;
    const tipo = document.getElementById("tipo").value;
    const resultado4 = document.getElementById("resultado4");
    const falhou4 = document.getElementById("falhou4");
    if (tematic == "" || refativ == ""|| idpergunta == ""){
      falhou4.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${refativ}`,
        tema: `${tematic}`,
        idpergunta: `${idpergunta}`,
        tipo: `${tipo}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou4.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado4.innerHTML = resposta.message;
      }
    });
  }

  async function enviarModulos() {
    const urlBase = "https://localhost:8080/modulos";
    const design = document.getElementById("design").value;
    const refmodulo = document.getElementById("refmodulo").value;
    const idativ = document.getElementById("idativ").value;
    const resultado5 = document.getElementById("resultado5");
    const falhou5 = document.getElementById("falhou5");
    if (design == "" || refmodulo == ""|| idativ == ""){
      falhou5.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${refmodulo}`,
        designacao: `${design}`,
        idatividade: `${idativ}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou5.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado5.innerHTML = resposta.message;
      }
    });
  }

  async function enviarDocente() {
    const urlBase = "https://localhost:8080/docentes";
    const nomedoc = document.getElementById("nomedoc").value;
    const iddoc = document.getElementById("iddoc").value;
    const contatodoc = document.getElementById("contatodoc").value;
    const passworddoc = document.getElementById("passworddoc").value;
    const resultado6 = document.getElementById("resultado6");
    const falhou6 = document.getElementById("falhou6");
    if (nomedoc == "" || iddoc == ""|| contatodoc == "" || passworddoc == ""){
      falhou6.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(nomedoc);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${iddoc}`,
        nomedocente: `${nomedoc}`,
        contatodocente: `${contatodoc}`,
        passworddocente: `${passworddoc}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado6.innerHTML = resposta.message;
      }
    });
  }