function iniciarJogo() {
  const modo = document.getElementById("Modo").value;
  const Dificuldade = document.getElementById("Dificuldade").value;
  window.location.href = `jogo.html?modo=${modo}&Dificuldade=${Dificuldade}`;
}