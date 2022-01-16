async function getData(){
    const response = await fetch('/admin');
    const data = await response.json();
    const listaAlunos = document.getElementById("listaAlunos");
    
    for (aluno of data){
        const root = document.createElement('div');
        const nome = document.createElement('div');
        const idaluno = document.createElement(`div`);
  
        nome.textContent = `Nome do Aluno: ${aluno.nome}`;
        idaluno.textContent = `ID: ${aluno._id}`;
        root.append(nome, idaluno)
        listaAlunos.append(root);

    }
    console.log(listaAlunos)
}


async function getPerguntas(){
    const response = await fetch('/questoes');
    const data = await response.json();
    const listaQuestoes = document.getElementById("listaQuestoes");
    
    for (pergunta of data){
        const root2 = document.createElement('div');
        const Tema = document.createElement('div');
        const NumQuestão = document.createElement(`div`);
        const Questão = document.createElement(`div`);
  
        Tema.textContent = `Tema: ${pergunta.tema}`;
        NumQuestão.textContent = `ID: ${pergunta._id}`;
        Questão.textContent = `Questão: ${pergunta.question}`;
        root2.append(Tema, NumQuestão, Questão)
        listaQuestoes.append(root2);

    }console.log(listaQuestoes)
    
}

async function validaGrupo(req,res){
    let senhagrupo = document.getElementById("senhagrupoEntrar").value; // tem de ter uma senha
    const response = await fetch('/grupos');
    const data = await response.json();
    console.log(data)
    for (grupo of data){
        if (grupo.pwgrupo === senhagrupo){
            console.log("Grupo registado, a entrar");
            $('#modalEntrarGrupo').modal('show');

        }else{
            console.log("Grupo não registado,fale com o docente"); 
                  
              };
        }
    }

