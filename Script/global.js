document.addEventListener("DOMContentLoaded", () => {
  // cria as nuvens automaticamente
  const nuvens = document.createElement("div");
  nuvens.className = "nuvem";
  nuvens.innerHTML = `
      <img src="Imagens/nuvem.png" class="nuvem1">
      <img src="Imagens/nuvem.png" class="nuvem2">
      <img src="Imagens/nuvem.png" class="nuvem3">
  `;
  document.body.appendChild(nuvens);

  // garante um tempo de início global
  const startTime = localStorage.getItem("nuvensStartTime") || Date.now();
  localStorage.setItem("nuvensStartTime", startTime);

  // calcula quanto tempo já passou desde o início
  const elapsed = (Date.now() - startTime) / 1000; // segundos

  // aplica o deslocamento na animação de cada nuvem
  document.querySelectorAll(".nuvem img").forEach(el => {
    const dur = parseFloat(getComputedStyle(el).animationDuration); // duração em segundos
    const offset = elapsed % dur;
    el.style.animationDelay = `-${offset}s`;
  });
});
