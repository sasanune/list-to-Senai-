//Seleciona os elementos do DOM que serão usados
const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionar = documento.getElementById('adicionar-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
//criamos 3 variáveis para o documento

//função para adicionar uma nova tarefa
btnAdicionar.addEventListener('click', function () {
    //Obtém o valor digitado no campo de entrada
    const tarefaTexto = inputTarefa.value;
    //verifica se o campo de entrada está vazio
    if (tarefaTexto === '') {
        alert('Digite uma tarefa antes de adicionar');
        return; //sai da função se o campo estiver vazio
    }
    //cria um novo item de lista (li) para a tarefa
    const novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefaTexto;
    //cria o botão de remover tarefa e o anexa à nova tarefa
    const btnRemover = document.createElement('button');
    btnRemover.innerText = 'Remover';
    btnRemover.classList.add('remover-tarefa');//aplica classe ao css

    //Função para remover a tarefa quando o botão for clicado
    btnRemover.addEventListener('click', function () {
        listaTarefas.removeChild(novaTarefa);
    });
    //adiciona o botão de remover à tarefa
    novaTarefa.appendChild(btnRemover);
    //adiciona a nova tarefa à lista de tarefas
    listaTarefas.appendChild(novaTarefa);
    //Limpa o campo de entrada após adicionar a tarefa
    inputTarefa.value = '';
});
//adiciona interatividade ao pressionar Entre para adicionar tarefas
inputTarefa.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        
        btnAdicionar.click
        (); //simula o clique no botão de adicionar tarefa
    }
});
