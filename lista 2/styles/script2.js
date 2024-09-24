// Referências ao DOM (Document Object Model)
const modal = document.getElementById("modal");
const btnAbrirModal = document.getElementById("abrir-modal");
const btnFecharModal = document.querySelector(".close");
const inputTarefa = document.getElementById("nova-tarefa");
const btnAdicionarTarefa = document.getElementById("adicionar-tarefa");

const listaPendentes = document.getElementById("tarefas-pendentes");
const listaAndamento = document.getElementById("tarefas-andamento");
const listaProgresso = document.getElementById("tarefas-progresso");
const listaConcluidas = document.getElementById("tarefas-concluidas");

btnAbrirModal.addEventListener("click", function () {
  modal.style.display = "flex"; // O modal se torna visível
});

btnFecharModal.addEventListener("click", function () {
  modal.style.display = "none"; // O modal é escondido
});

btnAdicionarTarefa.addEventListener("click", function () {
  const tarefaTexto = inputTarefa.value;

  if (tarefaTexto === "") {
    alert("Digite uma tarefa!"); // Mostra um alerta caso o campo esteja vazio
    return;
  }

  adicionarTarefa(listaPendentes, tarefaTexto); // Adiciona a tarefa à lista de pendentes
  inputTarefa.value = ""; // Limpa o campo de input após adicionar a tarefa
  modal.style.display = "none"; // Fecha o modal após adicionar a tarefa
});

function adicionarTarefa(lista, texto) {
  const novaTarefa = document.createElement("li"); // Cria um novo elemento <li>
  novaTarefa.innerText = texto;

  // Adiciona um ID único à tarefa
  novaTarefa.id = "tarefa-" + Date.now();

  const btnMover = document.createElement("button");
  btnMover.classList.add("remover-tarefa"); // Adiciona uma classe CSS para estilizar o botão
  btnMover.innerText = "X"; // O texto do botão será "X"

  // Evento que será chamado quando o botão "Mover" for clicado
  btnMover.addEventListener("click", function () {
    moverTarefa(novaTarefa);
  });

  novaTarefa.appendChild(btnMover); // Adiciona o botão mover à nova tarefa
  lista.appendChild(novaTarefa); // Adiciona a nova tarefa à lista específica

  novaTarefa.setAttribute("draggable", "true"); // Configura drag-and-drop
  novaTarefa.addEventListener("dragstart", dragStart);
}

// Função que move uma tarefa entre as colunas
function moverTarefa(tarefa) {
  if (tarefa.parentElement === listaPendentes) {
    // Se está na lista pendente
    listaAndamento.appendChild(tarefa); // Move para Andamento
    tarefa.style.backgroundColor = "orange"; // Define cor laranja
    tarefa.style.color = "white"; // Define texto branco
  } else if (tarefa.parentElement === listaAndamento) {
    // Se está na lista de Andamento
    listaProgresso.appendChild(tarefa); // Move para Progresso
    tarefa.style.backgroundColor = "purple"; // Define cor roxa
    tarefa.style.color = "white"; // Define texto branco
  } else if (tarefa.parentElement === listaProgresso) {
    // Se está na lista de Progresso
    listaConcluidas.appendChild(tarefa); // Move para Concluídas
    tarefa.removeChild(tarefa.querySelector(".remover-tarefa")); // Remove botão quando concluída
    tarefa.style.backgroundColor = "green"; // Define cor verde
    tarefa.style.color = "white"; // Define texto branco
  }
}

// Funções para Drag-and-Drop...
// (o restante do seu código JavaScript permanece inalterado)

// Funções para Drag-and-Drop
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id); // Armazena o ID da tarefa para o Drop
}

function dragOver(event) {
  event.preventDefault(); // Previne comportamento padrão para permitir drop
}

function drop(event) {
  event.preventDefault();

  const tarefaId = event.dataTransfer.getData("text/plain");
  const taskElement = document.getElementById(tarefaId);

  if (event.target === lista) {
    taskElement.style.backgroundColor = "blue";
    taskElement.style.color = "white";
  } else if (event.target === listaAndamento) {
    taskElement.style.backgroundColor = "orange";
    taskElement.style.color = "white";
    listaAndamento.appendChild(taskElement);
  } else if (event.target === listaProgresso) {
    taskElement.style.backgroundColor = "purple";
    taskElement.style.color = "white";
    listaProgresso.appendChild(taskElement);
  } else if (event.target === listaConcluidas) {
    taskElement.style.backgroundColor = "green";
    taskElement.removeChild(taskElement.querySelector(".remover-tarefa"));
    taskElement.style.color = "white";
    listaConcluidas.appendChild(taskElement);
  }
}

// Adiciona eventos de drop nas listas
listaPendentes.addEventListener("dragover", dragOver);
listaAndamento.addEventListener("dragover", dragOver);
listaProgresso.addEventListener("dragover", dragOver);
listaConcluidas.addEventListener("dragover", dragOver);

listaPendentes.addEventListener("drop", drop);
listaAndamento.addEventListener("drop", drop);
listaProgresso.addEventListener("drop", drop);
listaConcluidas.addEventListener("drop", drop);

// Fecha o modal se o usuário clicar fora da área do modal (na tela escura)
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
