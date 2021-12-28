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
