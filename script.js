document.addEventListener("DOMContentLoaded", () => {
  const celulas = document.querySelectorAll(".celula");
  const statusTexto = document.getElementById("status");
  const jogadorAtualSpan = document.getElementById("jogadorAtual");
  const btnReiniciar = document.getElementById("btnReiniciar");

  let jogadorAtual = "X";
  let estadoJogo = ["", "", "", "", "", "", "", "", ""];
  let jogoAtivo = true;

  const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  function cliqueCelula(e) {
    const celula = e.target;
    const index = parseInt(celula.getAttribute("data-index"));

    if (estadoJogo[index] !== "" || !jogoAtivo) {
      return;
    }

    estadoJogo[index] = jogadorAtual;
    celula.textContent = jogadorAtual;
    celula.classList.add(jogadorAtual.toLowerCase());

    verificarResultado();
  }

  function verificarResultado() {
    let venceu = false;

    for (let i = 0; i < combinacoesVitoria.length; i++) {
      const [a, b, c] = combinacoesVitoria[i];
      if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
        venceu = true;
        break;
      }
    }

    if (venceu) {
      statusTexto.innerHTML = `🎉 Jogador <strong>${jogadorAtual}</strong> venceu!`;
      jogoAtivo = false;
      return;
    }

    if (!estadoJogo.includes("")) {
      statusTexto.textContent = "🤝 Empate (Deu Velha)!";
      jogoAtivo = false;
      return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    jogadorAtualSpan.textContent = jogadorAtual;
  }

  function reiniciarJogo() {
    jogadorAtual = "X";
    estadoJogo = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    statusTexto.innerHTML = 'Vez do jogador: <span id="jogadorAtual">X</span>';

    celulas.forEach(celula => {
      celula.textContent = "";
      celula.classList.remove("x", "o");
    });
  }

  celulas.forEach(celula => celula.addEventListener("click", cliqueCelula));
  btnReiniciar.addEventListener("click", reiniciarJogo);
});