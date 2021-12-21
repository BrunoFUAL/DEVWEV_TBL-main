async function getData(){
    const urlBase = "http://localhost:8080/admin";
    const listaAlunos = document.getElementById("listaAlunos");
    let texto = "";
    var myHeaders = new Headers ();

    var myInit = { method: "GET", headers: myHeaders};

    var myRequest = new Request (`${urlBase}`, myInit);
    
    await fetch(myRequest).then(async function (response) {
        if (!response.ok) {
          listaAlunos.innerHTML = "Não posso mostrar Alunos de momento!";
        } else {
          alunos = await response.json();
          console.log(alunos);
          if (Object.keys(alunos).length == 1) {
            // Só retornou uma disciplina, detalhamos
            aluno = alunos[0];
            texto += ` 
            <div>
              <h4>${aluno.nome}</h4>
            </div>`;
          } else {
            // Retornou mais de uma disciplina
            for (const aluno of alunos) {
              texto += ` 
              <div>
                <h4>${aluno.nome}
              </div>`;
            }
          }
          listaAlunos.innerHTML = texto;
        }
    });
}