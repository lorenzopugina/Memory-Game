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

console.log("Modo:", modo);
console.log("Dificuldade:", dificuldade);

//ajusta o espaço entre as peças conforme a dificuldade
switch (dificuldade) {
    case 2: pecasContainer.style.gap = "50px"; pecasContainer.style.padding = "25px";  break;
    case 4: pecasContainer.style.gap = "20px"; break;
    case 6: pecasContainer.style.gap = "10px"; break;
    case 8: pecasContainer.style.gap = "5px"; break;
    default: pecasContainer.style.gap = "10px"; break;
}

for (let i = 1; i <= dificuldade; i++) {
    for (let j = 1; j <= dificuldade; j++) {
        const pecas = document.createElement("div");
        pecas.classList.add("pecas");
        pecasContainer.appendChild(pecas);
    }
}