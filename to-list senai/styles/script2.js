// Referências ao DOM (Document Object Model) - Pegamos elementos da página HTML para manipular
const modal = document.getElementById('modal'); // O modal que aparece para adicionar tarefas
const btnAbrirModal = document.getElementById('abrir-modal'); // Botão que abre o modal
const btnFecharModal = document.querySelector('.close'); // Botão de fechar o modal (o "X")
const inputTarefa = document.getElementById('nova-tarefa'); // Campo de input para digitar o nome da nova tarefa
const btnAdicionarTarefa = document.getElementById('adicionar-tarefa'); // Botão para adicionar a tarefa

// Listas de tarefas para cada fase: pendente, andamento, progresso e concluída
const listaPendentes = document.getElementById('tarefas-pendentes');
const listaAndamento = document.getElementById('tarefas-andamento');
const listaProgresso = document.getElementById('tarefas-progresso');
const listaConcluidas = document.getElementById('tarefas-concluidas');

// Abre o modal quando o botão "Nova Tarefa" é clicado
btnAbrirModal.addEventListener('click', function () {
  modal.style.display = 'flex'; // O modal se torna visível
});

// Fecha o modal quando o botão "X" (fechar) é clicado
btnFecharModal.addEventListener('click', function () {
  modal.style.display = 'none'; // O modal é escondido
});

// Adiciona uma tarefa à lista de "Pendentes" quando o botão "Adicionar" é clicado
btnAdicionarTarefa.addEventListener('click', function () {
  const tarefaTexto = inputTarefa.value; // Pega o valor digitado no input (nome da tarefa)

  if (tarefaTexto === '') {
    // Verifica se o campo está vazio
    alert('Digite uma tarefa!'); // Mostra um alerta caso o campo esteja vazio
    return; // Interrompe a função se o campo estiver vazio
  }

  adicionarTarefa(listaPendentes, tarefaTexto); // Chama a função para adicionar a tarefa à lista de pendentes
  inputTarefa.value = ''; // Limpa o campo de input após adicionar a tarefa
  modal.style.display = 'none'; // Fecha o modal após adicionar a tarefa
});

// Função que adiciona uma tarefa à lista especificada (neste caso, pendentes)
function adicionarTarefa(lista, texto) {
  const novaTarefa = document.createElement('li'); // Cria um novo elemento <li> (um item de lista)
  novaTarefa.innerText = texto; // Define o texto do item como o valor digitado no input

  // Cria um botão para mover a tarefa entre as colunas
  const btnMover = document.createElement('button');
  btnMover.classList.add('remover-tarefa'); // Adiciona uma classe CSS para estilizar o botão
  btnMover.innerText = 'X'; // O texto do botão será "X"

  // Evento que será chamado quando o botão "Mover" for clicado
  btnMover.addEventListener('click', function () {
    lista.removeChild(novaTarefa); // remove a tarifa da lista
  });

  novaTarefa.appendChild(btnMover); // classe CSS para o botão remover
  lista.appendChild(novaTarefa); // Adiciona a nova tarefa à lista específica (pendentes, andamento, etc.)

  // Configura o Drag and Drop
  novaTarefa.setAttribute('draggable', 'true');
  novaTarefa.addEventListener('dragstart', dragStart);
  novaTarefa.addEventListener('dragend', dragEnd);
}

// Função que move uma tarefa entre as colunas
function moverTarefa(tarefa) {
  // Verifica qual lista a tarefa pertence e move para a próxima lista
  if (tarefa.parentElement === listaPendentes) {
    listaAndamento.appendChild(tarefa); // Move a tarefa de "Pendentes" para "Em Andamento"
  } else if (tarefa.parentElement === listaAndamento) {
    listaProgresso.appendChild(tarefa); // Move de "Em Andamento" para "Em Progresso"
  } else if (tarefa.parentElement === listaProgresso) {
    listaConcluidas.appendChild(tarefa); // Move de "Em Progresso" para "Concluídas"
    tarefa.removeChild(tarefa.querySelector('button')); // Remove o botão "Mover" quando a tarefa estiver concluída
  }
}

// Fecha o modal se o usuário clicar fora da área do modal (na tela escura)
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Fecha o modal ao clicar fora dele
  }
};