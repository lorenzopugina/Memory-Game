const params = new URLSearchParams(window.location.search);
const modo = params.get("modo"); 
const dificuldade = parseInt(params.get("Dificuldade")); 
const pecasContainer = document.querySelector(".campo");
pecasContainer.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;

const tituloModo = document.getElementById("Modo");
if (modo === "classico") {
    tituloModo.textContent = "Clássico";
} else if (modo === "tempo") {
    tituloModo.textContent = "Contra o tempo";
}

//ajusta o espaço entre as peças conforme a dificuldade
switch (dificuldade) {
    case 2: pecasContainer.style.gap = "50px"; pecasContainer.style.padding = "25px";  break;
    case 4: pecasContainer.style.gap = "20px"; break;
    case 6: pecasContainer.style.gap = "14px"; break;
    case 8: pecasContainer.style.gap = "12px"; break;
    default: pecasContainer.style.gap = "10px"; break;
}

for (let i = 1; i <= dificuldade; i++) {
    for (let j = 1; j <= dificuldade; j++) {
        const pecas = document.createElement("div");
        pecas.classList.add("pecas");

        //Só para ter imagens diferentes, alterna entre duas imagens, mas isso não é definitivo
        if(i%2 === 0 && j%2 !== 0 || i%2 !== 0 && j%2 === 0) {
            const img = document.createElement("img");
            img.src = "../imagens/pecas/estrelaamarela.png"; 
            img.alt = "Peça";
            pecas.appendChild(img); // adiciona a imagem dentro da div
        } else {
            const img = document.createElement("img");
            img.src = "../imagens/pecas/cogumeloteste.png"; 
            img.alt = "Peça";
            pecas.appendChild(img); // adiciona a imagem dentro da div
        }

        pecasContainer.appendChild(pecas);
    }
}

//Revela peça ao clicar
const pecas = document.querySelectorAll(".pecas");

let primeiraPeca = null;
let segundaPeca = null;
let bloqueado = false; // impede clicar enquanto as peças estão sendo verificadas

function verificaPecas(e) {
    const pecaClicada = e.currentTarget;
    if (pecaClicada === primeiraPeca) return; // evita clicar na mesma peça duas vezes  
    if (bloqueado) return;

    revelarPeca(pecaClicada);

    if (!primeiraPeca) {
        primeiraPeca = pecaClicada;
        return;
    }

    segundaPeca = pecaClicada;
    bloqueado = true;

    const valorPrimeira = getPecaValue(primeiraPeca);
    const valorSegunda = getPecaValue(segundaPeca);

    if (valorPrimeira === valorSegunda) {
        primeiraPeca.classList.add("mesma-peca");
        segundaPeca.classList.add("mesma-peca");
        resetarSelecao();
    } else {
        setTimeout(() => {
            primeiraPeca.querySelector('img').style.opacity = '0';
            segundaPeca.querySelector('img').style.opacity = '0';
            resetarSelecao();
        }, 1000);
    }
    
}

function revelarPeca(peca) {
     const img = peca.querySelector('img'); // imagem dentro da peça clicada
    if (img) {
      img.style.opacity = '1';
    }   
}

pecas.forEach(peca => {
  peca.addEventListener("click", verificaPecas);
});

function getPecaValue(peca) {
    const img = peca.querySelector('img');
    if (img && img.src) 
        return img.src;
}

function resetarSelecao() {
    primeiraPeca = null;
    segundaPeca = null;
    bloqueado = false;
}