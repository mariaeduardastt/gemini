document.addEventListener("DOMContentLoaded", () => {
  let numeroSecreto = gerarNumero();
  let totalTentativas = 0;

  const inputPalpite = document.getElementById("palpite");
  const btnChutar = document.getElementById("btnChutar");
  const btnReiniciar = document.getElementById("btnReiniciar");
  const mensagem = document.getElementById("mensagem");
  const textoTentativas = document.getElementById("tentativas");

  function gerarNumero() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function verificarChute() {
    const chute = parseInt(inputPalpite.value);

    if (isNaN(chute) || chute < 1 || chute > 100) {
      mensagem.textContent = "Digite um número válido entre 1 e 100!";
      mensagem.style.color = "#f38ba8";
      return;
    }

    totalTentativas++;
    textoTentativas.textContent = `Tentativas: ${totalTentativas}`;

    if (chute === numeroSecreto) {
      mensagem.textContent = `🎉 Parabéns! Você acertou em ${totalTentativas} tentativa(s)!`;
      mensagem.style.color = "#a6e3a1";
      inputPalpite.disabled = true;
      btnChutar.disabled = true;
      btnReiniciar.classList.remove("oculto");
    } else if (chute < numeroSecreto) {
      mensagem.textContent = " O número secreto é MAIOR!";
      mensagem.style.color = "#f9e2af";
    } else {
      mensagem.textContent = " O número secreto é MENOR!";
      mensagem.style.color = "#f9e2af";
    }

    inputPalpite.value = "";
    inputPalpite.focus();
  }

  btnChutar.addEventListener("click", verificarChute);

  inputPalpite.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !btnChutar.disabled) {
      verificarChute();
    }
  });

  btnReiniciar.addEventListener("click", () => {
    numeroSecreto = gerarNumero();
    totalTentativas = 0;
    textoTentativas.textContent = "Tentativas: 0";
    mensagem.textContent = "";
    inputPalpite.disabled = false;
    btnChutar.disabled = false;
    btnReiniciar.classList.add("oculto");
    inputPalpite.focus();
  });
});