document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("btnInteracao");
  const mensagem = document.getElementById("mensagem");

  botao.addEventListener("click", () => {
    mensagem.textContent = "Projeto carregado e funcionando perfeitamente!";
    mensagem.className = "mensagem-sucesso";
  });
});