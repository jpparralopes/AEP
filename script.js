// ============================================================
//  script.js — EduReforço
//  Conceitos aplicados:
//    - Programação Orientada a Objetos (classes, encapsulamento)
//    - Estrutura de dados: Array (Lista) e Pilha (Stack)
//    - Manipulação do DOM
//    - Eventos
//    - Funções simples e comentadas
// ============================================================


// ============================================================
//  ESTRUTURA DE DADOS: PILHA (Stack)
//  Usada para armazenar o histórico de respostas do aluno.
//  Último item adicionado é o primeiro a ser removido (LIFO).
// ============================================================
class PilhaHistorico {
  constructor() {
    // O array interno guarda os itens da pilha
    this._itens = [];
  }

  // Empilha um novo item no topo
  push(item) {
    this._itens.push(item);
  }

  // Remove e retorna o item do topo (desfazer)
  pop() {
    if (this.estaVazia()) return null;
    return this._itens.pop();
  }

  // Apenas consulta o item do topo sem remover
  peek() {
    if (this.estaVazia()) return null;
    return this._itens[this._itens.length - 1];
  }

  // Retorna todos os itens (para exibição)
  getTodos() {
    // Retorna uma cópia invertida: topo da pilha primeiro
    return [...this._itens].reverse();
  }

  // Verifica se a pilha está vazia
  estaVazia() {
    return this._itens.length === 0;
  }

  // Retorna quantos itens existem
  tamanho() {
    return this._itens.length;
  }
}


// ============================================================
//  CLASSE: Exercicio
//  Representa uma questão com pergunta, opções e resposta.
// ============================================================
class Exercicio {
  constructor(id, pergunta, opcoes, respostaCorreta, materia) {
    this._id             = id;
    this._pergunta       = pergunta;
    this._opcoes         = opcoes;         // Array de strings
    this._respostaCorreta = respostaCorreta; // Índice da resposta certa
    this._materia        = materia;
  }

  // Getters: acesso controlado aos atributos (encapsulamento)
  getId()       { return this._id; }
  getPergunta() { return this._pergunta; }
  getOpcoes()   { return this._opcoes; }
  getMateria()  { return this._materia; }

  // Método que verifica se a resposta do aluno está correta
  verificarResposta(indiceEscolhido) {
    return indiceEscolhido === this._respostaCorreta;
  }

  // Retorna o índice da resposta correta (para destacar após responder)
  getIndiceCorreto() {
    return this._respostaCorreta;
  }
}


// ============================================================
//  CLASSE: Trilha
//  Representa um caminho de estudo com vários exercícios.
//  Usa um Array para guardar os exercícios.
// ============================================================
class Trilha {
  constructor(nome, descricao, emoji, exercicios) {
    this._nome        = nome;
    this._descricao   = descricao;
    this._emoji       = emoji;
    this._exercicios  = exercicios; // Array de objetos Exercicio
    this._indiceAtual = 0;          // Controla qual exercício está ativo
  }

  getNome()      { return this._nome; }
  getDescricao() { return this._descricao; }
  getEmoji()     { return this._emoji; }
  getTotalExercicios() { return this._exercicios.length; }

  // Retorna o exercício atual
  getExercicioAtual() {
    return this._exercicios[this._indiceAtual];
  }

  // Avança para o próximo exercício
  avancar() {
    this._indiceAtual++;
  }

  // Informa o número do exercício atual (começa em 1)
  getNumeroAtual() {
    return this._indiceAtual + 1;
  }

  // Verifica se todos os exercícios foram respondidos
  isCompleta() {
    return this._indiceAtual >= this._exercicios.length;
  }

  // Reinicia a trilha para recomeçar
  reiniciar() {
    this._indiceAtual = 0;
  }
}


// ============================================================
//  CLASSE: Aluno
//  Representa o estudante que usa a plataforma.
// ============================================================
class Aluno {
  constructor(nome) {
    this._nome        = nome;
    this._pontuacao   = 0;
    this._totalRespondidos = 0;
    this._historico   = new PilhaHistorico(); // Pilha de respostas
  }

  getNome()    { return this._nome; }
  getPontuacao() { return this._pontuacao; }
  getTotalRespondidos() { return this._totalRespondidos; }
  getHistorico() { return this._historico; }

  // Registra uma resposta e atualiza pontuação
  responder(nomeExercicio, acertou) {
    this._totalRespondidos++;

    if (acertou) {
      this._pontuacao += 10; // 10 pontos por acerto
    }

    // Empilha no histórico com informações da resposta
    this._historico.push({
      exercicio: nomeExercicio,
      acertou:   acertou,
      numero:    this._totalRespondidos
    });
  }

  // Desfaz a última resposta (pop da pilha)
  desfazerUltima() {
    const ultima = this._historico.pop();
    if (ultima) {
      this._totalRespondidos--;
      if (ultima.acertou) {
        this._pontuacao -= 10;
      }
    }
    return ultima;
  }
}


// ============================================================
//  DADOS: TRILHAS E EXERCÍCIOS
//  Array (Lista) com todas as trilhas disponíveis.
//  Cada trilha contém um array de exercícios.
// ============================================================
const listaDeTrilhas = [

  new Trilha(
    "Matemática Básica",
    "Operações fundamentais, frações e porcentagem.",
    "🔢",
    [
      new Exercicio(1,
        "Quanto é 15% de 200?",
        ["20", "25", "30", "35"],
        2,
        "Matemática"
      ),
      new Exercicio(2,
        "Qual é o resultado de 3/4 + 1/4?",
        ["1/2", "4/8", "1", "2"],
        2,
        "Matemática"
      ),
      new Exercicio(3,
        "Se um produto custa R$80 e tem 25% de desconto, qual o preço final?",
        ["R$55", "R$60", "R$65", "R$70"],
        1,
        "Matemática"
      ),
      new Exercicio(4,
        "Qual o resultado de 2³ (dois elevado ao cubo)?",
        ["4", "6", "8", "9"],
        2,
        "Matemática"
      ),
      new Exercicio(5,
        "Uma sequência começa em 2 e dobra a cada passo: 2, 4, 8… Qual é o próximo número?",
        ["10", "12", "14", "16"],
        3,
        "Matemática"
      ),
    ]
  ),

  new Trilha(
    "Português",
    "Gramática, interpretação e ortografia.",
    "📖",
    [
      new Exercicio(6,
        "Qual palavra é um substantivo?",
        ["Correr", "Bonito", "Escola", "Rapidamente"],
        2,
        "Português"
      ),
      new Exercicio(7,
        "Qual das frases está correta ortograficamente?",
        ["A gente vamos juntos.", "A gente vai junto.", "A gente vai juntos.", "A gente vamos junto."],
        1,
        "Português"
      ),
      new Exercicio(8,
        "Qual é o sujeito da frase: 'Os alunos estudaram muito'?",
        ["estudaram", "muito", "Os alunos", "alunos muito"],
        2,
        "Português"
      ),
      new Exercicio(9,
        "Em qual opção o acento está correto?",
        ["cafézinho", "cafézinho", "cafezinho", "cafèzinho"],
        2,
        "Português"
      ),
      new Exercicio(10,
        "Qual é o sinônimo de 'alegre'?",
        ["Triste", "Saudoso", "Feliz", "Cansado"],
        2,
        "Português"
      ),
    ]
  ),

  new Trilha(
    "Ciências",
    "Biologia básica, saúde e meio ambiente.",
    "🔬",
    [
      new Exercicio(11,
        "Qual órgão do corpo humano é responsável por bombear o sangue?",
        ["Pulmão", "Fígado", "Coração", "Rim"],
        2,
        "Ciências"
      ),
      new Exercicio(12,
        "O que as plantas produzem durante a fotossíntese?",
        ["Gás carbônico", "Oxigênio", "Nitrogênio", "Hidrogênio"],
        1,
        "Ciências"
      ),
      new Exercicio(13,
        "Quantos cromossomos tem uma célula humana normal?",
        ["23", "44", "46", "48"],
        2,
        "Ciências"
      ),
      new Exercicio(14,
        "Qual é a função principal dos pulmões?",
        ["Filtrar o sangue", "Digerir alimentos", "Realizar trocas gasosas", "Produzir hormônios"],
        2,
        "Ciências"
      ),
      new Exercicio(15,
        "O que é biodiversidade?",
        [
          "A quantidade de água no planeta",
          "A variedade de seres vivos em um ecossistema",
          "O estudo dos fósseis",
          "O ciclo das estações do ano"
        ],
        1,
        "Ciências"
      ),
    ]
  ),

  new Trilha(
    "História",
    "Eventos e conceitos da história do Brasil e do mundo.",
    "🏛️",
    [
      new Exercicio(16,
        "Em que ano o Brasil proclamou a Independência?",
        ["1789", "1808", "1822", "1889"],
        2,
        "História"
      ),
      new Exercicio(17,
        "Quem foi o líder da Revolução Francesa?",
        ["Napoleão Bonaparte", "Luís XVI", "Robespierre", "Richelieu"],
        0,
        "História"
      ),
      new Exercicio(18,
        "Qual evento marcou o início da Primeira Guerra Mundial?",
        [
          "A queda da Bastilha",
          "O assassinato do arquiduque Francisco Ferdinando",
          "A invasão da Polônia",
          "O bombardeio de Pearl Harbor"
        ],
        1,
        "História"
      ),
      new Exercicio(19,
        "A abolição da escravidão no Brasil ocorreu em qual ano?",
        ["1870", "1879", "1888", "1890"],
        2,
        "História"
      ),
      new Exercicio(20,
        "Qual civilização construiu as pirâmides do Egito?",
        ["Romana", "Grega", "Mesopotâmica", "Egípcia"],
        3,
        "História"
      ),
    ]
  ),

]; // fim do listaDeTrilhas


// ============================================================
//  VARIÁVEIS GLOBAIS DE ESTADO
//  Guardam o estado atual da sessão do usuário.
// ============================================================
let alunoAtual    = null; // Objeto Aluno da sessão
let trilhaAtual   = null; // Trilha que o aluno está fazendo


// ============================================================
//  FUNÇÃO: iniciarSessao
//  Lê o nome do campo, cria o objeto Aluno e exibe a tela principal.
// ============================================================
function iniciarSessao() {
  const inputNome = document.getElementById("input-nome");
  const nome = inputNome.value.trim();

  // Validação simples
  if (nome === "") {
    document.getElementById("erro-cadastro").style.display = "block";
    return;
  }

  // Cria o objeto Aluno (POO)
  alunoAtual = new Aluno(nome);

  // Esconde tela de cadastro e mostra tela principal
  mostrarTela("tela-trilhas");

  // Atualiza painel e renderiza trilhas
  atualizarPainel();
  renderizarTrilhas();
}


// ============================================================
//  FUNÇÃO: renderizarTrilhas
//  Percorre o Array listaDeTrilhas e cria os cards no DOM.
// ============================================================
function renderizarTrilhas() {
  const container = document.getElementById("lista-trilhas");
  container.innerHTML = ""; // Limpa antes de renderizar

  // Percorre o array de trilhas (estrutura de dados: Lista)
  listaDeTrilhas.forEach(function(trilha, indice) {
    const card = document.createElement("div");
    card.className = "card-trilha";

    card.innerHTML = `
      <h3>${trilha.getEmoji()} ${trilha.getNome()}</h3>
      <p>${trilha.getDescricao()}</p>
      <span class="qtd">${trilha.getTotalExercicios()} questões</span>
    `;

    // Evento de clique: abre a trilha correspondente
    card.addEventListener("click", function() {
      iniciarTrilha(indice);
    });

    container.appendChild(card);
  });
}


// ============================================================
//  FUNÇÃO: iniciarTrilha
//  Prepara a trilha escolhida e mostra a tela do exercício.
// ============================================================
function iniciarTrilha(indiceTrilha) {
  // Pega a trilha do array pelo índice
  trilhaAtual = listaDeTrilhas[indiceTrilha];
  trilhaAtual.reiniciar(); // Garante que começa do início

  mostrarTela("tela-exercicio");
  renderizarExercicio();
}


// ============================================================
//  FUNÇÃO: renderizarExercicio
//  Pega o exercício atual da trilha e atualiza o DOM.
// ============================================================
function renderizarExercicio() {
  const exercicio = trilhaAtual.getExercicioAtual();

  // Atualiza matéria e progresso
  document.getElementById("exibe-materia").textContent = exercicio.getMateria();
  document.getElementById("exibe-progresso").textContent =
    trilhaAtual.getNumeroAtual() + " / " + trilhaAtual.getTotalExercicios();

  // Atualiza a pergunta
  document.getElementById("exibe-pergunta").textContent = exercicio.getPergunta();

  // Esconde o feedback da questão anterior
  document.getElementById("feedback").style.display = "none";

  // Renderiza os botões de opções
  const containerOpcoes = document.getElementById("lista-opcoes");
  containerOpcoes.innerHTML = "";

  exercicio.getOpcoes().forEach(function(opcao, indiceOpcao) {
    const botao = document.createElement("button");
    botao.className = "btn-opcao";
    botao.textContent = opcao;

    // Cada botão chama responderExercicio com seu índice
    botao.addEventListener("click", function() {
      responderExercicio(indiceOpcao);
    });

    containerOpcoes.appendChild(botao);
  });
}


// ============================================================
//  FUNÇÃO: responderExercicio
//  Processa a resposta do aluno, registra na pilha e exibe feedback.
// ============================================================
function responderExercicio(indiceEscolhido) {
  const exercicio   = trilhaAtual.getExercicioAtual();
  const acertou     = exercicio.verificarResposta(indiceEscolhido);
  const indiceCorreto = exercicio.getIndiceCorreto();

  // Registra resposta no objeto Aluno (empilha no histórico)
  alunoAtual.responder(
    trilhaAtual.getNome() + " – Q" + trilhaAtual.getNumeroAtual(),
    acertou
  );

  // Destaca visualmente os botões (certo = verde, errado = vermelho)
  const botoes = document.querySelectorAll(".btn-opcao");
  botoes.forEach(function(btn, i) {
    btn.disabled = true; // Desabilita todos após responder
    if (i === indiceCorreto) {
      btn.classList.add("correta");
    } else if (i === indiceEscolhido && !acertou) {
      btn.classList.add("errada");
    }
  });

  // Exibe o feedback textual
  const feedback     = document.getElementById("feedback");
  const textoFeedback = document.getElementById("texto-feedback");

  if (acertou) {
    textoFeedback.textContent = "✅ Resposta correta! +10 pontos.";
  } else {
    textoFeedback.textContent =
      "❌ Resposta incorreta. A correta era: " +
      exercicio.getOpcoes()[indiceCorreto];
  }

  feedback.style.display = "block";

  // Atualiza o painel e o histórico na tela de trilhas
  atualizarPainel();
  renderizarHistorico();
}


// ============================================================
//  FUNÇÃO: proximaPergunta
//  Avança para o próximo exercício ou conclui a trilha.
// ============================================================
function proximaPergunta() {
  trilhaAtual.avancar(); // Move o índice do array para o próximo

  if (trilhaAtual.isCompleta()) {
    // Todos os exercícios foram concluídos
    mostrarConclusao();
  } else {
    // Ainda há exercícios: renderiza o próximo
    renderizarExercicio();
  }
}


// ============================================================
//  FUNÇÃO: mostrarConclusao
//  Exibe a tela de conclusão com a pontuação do aluno.
// ============================================================
function mostrarConclusao() {
  mostrarTela("tela-conclusao");

  document.getElementById("texto-conclusao").textContent =
    "Parabéns, " + alunoAtual.getNome() + "! Você concluiu a trilha de " +
    trilhaAtual.getNome() + ".";

  document.getElementById("pontuacao-final").textContent =
    alunoAtual.getPontuacao();
}


// ============================================================
//  FUNÇÃO: voltarParaTrilhas
//  Retorna para a tela de seleção de trilhas.
// ============================================================
function voltarParaTrilhas() {
  mostrarTela("tela-trilhas");
  atualizarPainel();
  renderizarHistorico();
}


// ============================================================
//  FUNÇÃO: desfazerUltima
//  Remove o último item da pilha de histórico (operação pop).
// ============================================================
function desfazerUltima() {
  const removido = alunoAtual.desfazerUltima(); // Pop da pilha

  if (removido === null) {
    alert("Nenhuma resposta para desfazer.");
    return;
  }

  alert("Resposta '" + removido.exercicio + "' desfeita.");

  atualizarPainel();
  renderizarHistorico();
}


// ============================================================
//  FUNÇÃO: renderizarHistorico
//  Lê os itens da pilha e os exibe no DOM (topo primeiro).
// ============================================================
function renderizarHistorico() {
  const container = document.getElementById("lista-historico");
  const itens     = alunoAtual.getHistorico().getTodos(); // Topo primeiro

  if (itens.length === 0) {
    container.innerHTML = '<p class="texto-vazio">Nenhuma resposta ainda.</p>';
    return;
  }

  container.innerHTML = "";

  itens.forEach(function(item) {
    const div = document.createElement("div");
    div.className = "item-historico " + (item.acertou ? "acerto" : "erro");

    div.innerHTML =
      (item.acertou ? "✅" : "❌") +
      " <strong>#" + item.numero + "</strong> — " +
      item.exercicio;

    container.appendChild(div);
  });
}


// ============================================================
//  FUNÇÃO: atualizarPainel
//  Atualiza os dados do painel superior com os do objeto Aluno.
// ============================================================
function atualizarPainel() {
  document.getElementById("exibe-nome").textContent =
    alunoAtual.getNome();

  document.getElementById("exibe-pontuacao").textContent =
    alunoAtual.getPontuacao();

  document.getElementById("exibe-total").textContent =
    alunoAtual.getTotalRespondidos();
}


// ============================================================
//  FUNÇÃO: mostrarTela
//  Esconde todas as telas e exibe apenas a solicitada.
//  Controla a navegação entre as seções da aplicação.
// ============================================================
function mostrarTela(idTela) {
  // Array com os IDs de todas as telas
  const telas = [
    "tela-cadastro",
    "tela-trilhas",
    "tela-exercicio",
    "tela-conclusao"
  ];

  // Percorre o array e esconde/mostra conforme necessário
  telas.forEach(function(id) {
    document.getElementById(id).style.display =
      (id === idTela) ? "block" : "none";
  });
}


// ============================================================
//  EVENTO: Enter no campo de nome
//  Permite que o usuário pressione Enter para entrar.
// ============================================================
document.getElementById("input-nome").addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    iniciarSessao();
  }
});