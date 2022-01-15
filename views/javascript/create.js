async function enviarAluno() {
    const urlBase = "http://localhost:8080/admin";
    const des = document.getElementById("des").value;
    const iden = document.getElementById("iden").value;
    const telf = document.getElementById("telf").value;
    const resultado = document.getElementById("resultado");
    const falhou = document.getElementById("falhou");
    if (des == "" || iden == ""|| telf == ""){
      falhou.innerHTML = "Deve completar todos os campos!";
      return;
    }
    console.log(des);
    var myInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        _id: `${iden}`,
        nome: `${des}`,
        contato: `${telf}`,
      }),
    };
    var myRequest = new Request(`${urlBase}`, myInit);
    await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado.innerHTML = resposta.message;
      }
    });
  }

  async function enviarGrupo() {
    const urlBase = "http://localhost:8080/grupo";
    const grup = document.getElementById("grup").value;
    const idaluno = document.getElementById("idaluno").value;
    const pwgrupo = document.getElementById("pwgrupo").value;
    const resultado = document.getElementById("resultado");
    const falhou = document.getElementById("falhou");
    if (des == "" || iden == ""|| telf == ""){
      falhou.innerHTML = "Deve completar todos os campos!";
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
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado.innerHTML = resposta.message;
      }
    });
  }


  async function enviarQuestoes() {
    const urlBase = "http://localhost:8080/questoes";
    const idQuestao = document.getElementById("idQuestao").value;
    const tema = document.getElementById("tema").value;
    const quest = document.getElementById("quest").value;
    const ans = document.getElementById("ans").value;
    const opt1 = document.getElementById("opt1").value;
    const opt2 = document.getElementById("opt2").value;
    const opt3 = document.getElementById("opt3").value;
    const opt4 = document.getElementById("opt4").value;
    const resultado = document.getElementById("resultado");
    const falhou = document.getElementById("falhou");
    if (idQuestao == "" || quest == ""|| ans == ""){
      falhou.innerHTML = "Deve completar todos os campos!";
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
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado.innerHTML = resposta.message;
      }
    });
  }

  async function enviarAtividades() {
    const urlBase = "http://localhost:8080/atividades";
    const tematic = document.getElementById("tematic").value;
    const refativ = document.getElementById("refativ").value;
    const idpergunta = document.getElementById("idpergunta").value;
    const tipo = document.getElementById("tipo").value;
    const resultado = document.getElementById("resultado");
    const falhou = document.getElementById("falhou");
    if (tema == "" || refativ == ""|| idpergunta == ""){
      falhou.innerHTML = "Deve completar todos os campos!";
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
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado.innerHTML = resposta.message;
      }
    });
  }

  async function enviarModulos() {
    const urlBase = "http://localhost:8080/modulos";
    const design = document.getElementById("design").value;
    const refmodulo = document.getElementById("refmodulo").value;
    const idativ = document.getElementById("idativ").value;
    const resultado = document.getElementById("resultado");
    const falhou = document.getElementById("falhou");
    if (tema == "" || refativ == ""|| idpergunta == ""){
      falhou.innerHTML = "Deve completar todos os campos!";
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
        falhou.innerHTML = "Algo correu mal!";
      } else {
         resposta = await response.json();
         console.log(resposta.message);
         resultado.innerHTML = resposta.message;
      }
    });
  }