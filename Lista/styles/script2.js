//referências ao DOM - pegamos elementos da página HTML para manipular]
const modal = document.getElementById('modal');
//O modal que aparece para adicionar tarefas
const btnAbrirModal = document.getElementById('abrir-modal');
//botão que abre o modal
const btnFecharModal = document.querySelector('.close');
//botão de fechar o modal (o "X")
const inputTarefa = document.getElementById('nova-tarefa')
//campo de input para digitar o nome da nova tarefa
const btnAdicionarTarefa = document.getElementById('adicionar-tarefa');
//botão para adicionar a tarefa

//listas de tarefas para cada fase: pendente, andamento, progresso e concluída
const listaPedentes = document.getElementById('tarefas-pendentes');
const listaAndamento = document.getElementById('tarefas-andamento');
const listaProgresso = document.getElementById('tarefas-progresso');
const listaConcluidas = document.getElementById('tarefas-concluidas');

//abre o modal quando o botão "nova tarefa" é clicado
btnAbrirModal.addEventListener('click', function () {
    modal.style.display = 'flex'; // o modal se torna visivel
});

//fecha o modal quando o botão "X" (fechar) é clicado
btnFecharModal.addEventListener('click', function () {
    modal.style.display = 'none'; // o modal é escondido
});

//adiciona uma tarefa à lista de "Pendentes" quando o botão "Adicionar" é clicado
btnAdicionarTarefa.addEventListener('click', function () {
    const tarefaTexto = inputTarefa.value; //pega o valor digitado no input (nome da tarefa)

    if (tarefaTexto === '') {
        //verifica se o campo está vazio
        alert('digite uma tarefa!'); //mostra um alerta caso o campo esteja vazio
        return; //interrompe a função se o campo estiver vazio
    }

    btnAdicionarTarefa(listaPendentes, tarefatexto); //chama a função para adicionar a tarefa à lista de pendentes
    inputTarefa.value = ''; //limpa o campo de input após adicionar a tarefa
    modal.style.display = 'none'; //fecha o modal após adicionar a tarefa
});

//função que adiciona uma tarefa à lista epecificada(neste caso, pendentes)
function adicionarTarefa(lista, texto) {
    const novaTarefa = document.createElement('li'); //cria um novo elemento <li> (um item de lista)
    novaTarefa.innerText = texto; //define o texto do item como o valor digitado no input

    //cria um botão para mover a tarefa entre as colunas
    const btnMover =  document.createElement('button');
    btnMover.classList.add('mover-tarefa'); //adiciona uma classe CSS para estilizar o botão
    btnMover.innerText = 'Mover'; //O texto do botão será "mover"

    //evento que será chamado quando o botão "mover" for clicado
    btnMover.addEventListener('click', function () {
        moverTarefa(novaTarefa); //chama a função de mover a tarefa para outra lista
    });

    novaTarefa.appendChild(btnMover);//adiciona o botão "mover" dentro da nova tarefa
    lista.appendChild(novaTarefa); //adiciona a nova tarefa à lista específica (pendentes,a andamento, etc..)
}

//função que move uma tarefa entre as colunas
function moverTarefa(tarefa){
    //verifica que move uma tarefa entre as colunas
    if(tarefa.parentElement === listaPendentes) {
        listaAndamento.appendChild(tarefa); //move a tarefa "pendentes" para "em andamento"
    }else if (tarefa.parentElement === listaAndamento) {
        listaProgresso.appendChild(tarefa); //move de "em andamento" para "em progresso"
    }else if (tarefa.parentElement === listaProgresso){
        listaConcluidas.appendChild(tarefa); //move de "em progresso" para "concluídas"
        tarefa.removeChild(tarefa.querySelector ('button')); //remove o botão "Mover" quando a tarefa concluida
    }
}
//fecha o modal se o usuário clicar fora da área do modal(na tela escura)
window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none'; //fecha o modal ao clicar fora dele
    }
};