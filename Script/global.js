  // cria as nuvens automaticamente
document.addEventListener("DOMContentLoaded", () => {
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


// Abre e fecha os submenus 
document.addEventListener('DOMContentLoaded', function() {
    const MenuUsuario = document.getElementById('Menu_usuario');
    const MenuRanking = document.getElementById('Menu_ranking');
    const subUsuario = document.getElementById('subMenu_Usuario');
    const subRanking = document.getElementById('subMenu_Ranking');

    // Abre o submenu ao clicar na imagem
    MenuUsuario.addEventListener('click', function() {
        subUsuario.style.display = subUsuario.style.display === 'block' ? 'none' : 'block';
        subRanking.style.display = 'none'; // fecha o outro
    });

    MenuRanking.addEventListener('click', function() {
        subRanking.style.display = subRanking.style.display === 'block' ? 'none' : 'block';
        subUsuario.style.display = 'none'; // fecha o outro
    });

    // Fecha os submenus se clicar fora 
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#Menu_usuario, #subMenu_Usuario, #Menu_ranking, #subMenu_Ranking')) {
            subUsuario.style.display = 'none';
            subRanking.style.display = 'none';
        }
    });
});

