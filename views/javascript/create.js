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
    const quest = document.getElementById("quest").value;
    const ans = document.getElementById("ans").value;
    const opt1 = document.getElementById("opt1").value;
    const opt2 = document.getElementById("opt2").value;
    const opt3 = document.getElementById("opt3").value;
    const opt4 = document.getElementById("opt4").value;
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
        _id: `${idQuestao}`,
        questao: `${quest}`,
        resposta: `${ans}`,
        opcoes: `${opt1, opt2, opt3, opt4}`,
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