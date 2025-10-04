const params = new URLSearchParams(window.location.search);
const modo = params.get("modo"); 
const dificuldade = parseInt(params.get("Dificuldade")); 
const pecasContainer = document.querySelector(".campo");
pecasContainer.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;

// Define o título do jogo conforme o modo selecionado
const tituloModo = document.getElementById("Modo");
tituloModo.textContent = modo === "classico" ? "Clássico" : "Contra o tempo";

// Ajusta o espaço entre as peças conforme a dificuldade
switch (dificuldade) {
    case 2: pecasContainer.style.gap = "50px"; pecasContainer.style.padding = "25px";  break;
    case 4: pecasContainer.style.gap = "20px"; break;
    case 6: pecasContainer.style.gap = "14px"; break;
    case 8: pecasContainer.style.gap = "12px"; break;
    default: pecasContainer.style.gap = "10px"; break;
}

// Lista de imagens disponíveis (adicionar todas)
const imagensDisponiveis = [
    "estrela.png",
    "cogumelo.png",
    "luigi.png",
    "marca.png",
    "mario.png",
    "planta.png",
    "waluigi.png",
    "wario.png"
];

// Calcula quantas peças terão
const totalPecas = dificuldade * dificuldade;
const totalPares = totalPecas / 2;

// aleatoriza o array de imagens (acho q da pra fazer melhor)
let imagensEscolhidas = imagensDisponiveis.sort(() => Math.random() - 0.5);

// Seleciona apenas o número necessário de imagens
imagensEscolhidas.slice(0, totalPares);

// Duplica o array de imagens e coloca dentro do array baralho (operador ... copia os itens do array)
let baralho = [...imagensEscolhidas, ...imagensEscolhidas];

// Aleatoriza as imagens para os pares não ficarem juntos
baralho.sort(() => Math.random() - 0.5);

// Cria as peças cada uma com sua imagem
baralho.forEach(imgNome => {
    const peca = document.createElement("div");
    peca.classList.add("pecas");

    const img = document.createElement("img");
    img.src = `../imagens/pecas/${imgNome}`;
    img.alt = "Peça";
    img.style.opacity = "0"; // começa oculta

    peca.appendChild(img);
    pecasContainer.appendChild(peca);
});

// Lógica de revelação e comparação
const pecas = document.querySelectorAll(".pecas");
let primeiraPeca = null;
let segundaPeca = null;
let bloqueado = false;

function verificaPecas(e) {
    const pecaClicada = e.currentTarget;
    if (pecaClicada === primeiraPeca) return;
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
        setTimeout(() => { // espera 1 segundo antes de ocultar novamente
            primeiraPeca.querySelector('img').style.opacity = '0';
            segundaPeca.querySelector('img').style.opacity = '0';
            resetarSelecao();
        }, 1000);
    }
}

function revelarPeca(peca) {
    const img = peca.querySelector('img');
    if (img) img.style.opacity = '1'; // se a imagem existir, revela
}

pecas.forEach(peca => {
    peca.addEventListener("click", verificaPecas);
});

// Função para obter o valor (src da imagem) de uma peça
function getPecaValue(peca) {
    const img = peca.querySelector('img');
    return img?.src;
}

function resetarSelecao() {
    primeiraPeca = null;
    segundaPeca = null;
    bloqueado = false;
}
