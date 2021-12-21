async function enviarRegisto() {
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
        nome: `${des}`,
        nif: `${iden}`,
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