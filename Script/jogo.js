const params = new URLSearchParams(window.location.search);
const modo = params.get("modo");
const dificuldade = parseInt(params.get("Dificuldade")); 
const pecasContainer = document.querySelector(".campo");
pecasContainer.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;
const movimentos = document.getElementById("numMovimentos");

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
imagensEscolhidas = imagensEscolhidas.slice(0, totalPares);

// Duplica o array de imagens e coloca dentro do array baralho (operador ... copia os itens do array)
let baralho = [...imagensEscolhidas, ...imagensEscolhidas];

// Aleatoriza as imagens para os pares não ficarem juntos
baralho.sort(() => Math.random() - 0.5);

// Cria as peças cada uma com sua imagem
baralho.forEach(imgNome => {
    const peca = document.createElement("div");
    peca.classList.add("pecas");

    const carta = document.createElement("div");
    carta.classList.add("carta");

    // Verso (parte de trás da carta)
    const verso = document.createElement("div");
    verso.classList.add("carta-verso");

    // Frente (imagem verdadeira)
    const frente = document.createElement("div");
    frente.classList.add("carta-frente");
    const img = document.createElement("img");
    img.src = `../imagens/pecas/${imgNome}`;
    frente.appendChild(img);

    carta.appendChild(frente);
    carta.appendChild(verso);
    peca.appendChild(carta);
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
        setTimeout(() => { // espera 1 segundo antes de virar de volta
            virarCarta(primeiraPeca);
            virarCarta(segundaPeca);
            resetarSelecao();
        }, 1000);
    }

    let vitoria = verificaVitoria();
    if (vitoria === 1) {
        exibirVitoria(vitoria);
    }
}

let movimentosCount = 0;

function revelarPeca(peca) {
    if (movimentosCount === 0 && modo === "classico") iniciarTempo();
    virarCarta(peca); // agora usamos o flip em vez de opacity
    movimentosCount++;
    movimentos.textContent = movimentosCount;
}

pecas.forEach(peca => {
    peca.addEventListener("click", verificaPecas);
});

function getPecaValue(peca) {
    const img = peca.querySelector('.carta-frente img');
    return img?.src;
}

function resetarSelecao() {
    primeiraPeca = null;
    segundaPeca = null;
    bloqueado = false;
}

function virarCarta(peca) {
  const carta = peca.querySelector(".carta");

  peca.classList.add("virando");
  carta.classList.toggle("virada");

  // remove a classe ao fim da transição
  setTimeout(() => {
    peca.classList.remove("virando");
  }, 300); 
}



const tempo = document.querySelector(".tempo");
let sec = 0, min = 0, segundos = 0;
let intervalo;

function iniciarTempo() {
    intervalo = setInterval(() => {
        segundos++;
        atualizarTempo();
    }, 1000);
}

function pararTempo() {
    clearInterval(intervalo);
}

function atualizarTempo() {
    if (segundos < 60) {
        sec = segundos;
    } else {
        min++;
        segundos = 0;
    }
    tempo.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function verificaVitoria() {
    const tabuleiro = document.querySelector(".campo");
    const pecas = tabuleiro.querySelectorAll(".pecas");
    const todasClicadas = Array.from(pecas).every(div => div.classList.contains("mesma-peca"));

    if (todasClicadas) {
        return 1;
    }
    else return 0;
}

function desistir_jogo() {               
    exibirVitoria(2);
}

function exibirVitoria(vitoria) {
    pararTempo();
    setTimeout(() => {
        if (vitoria === 1) {
            alert(`Parabéns! Você venceu!\nTempo: ${tempo.textContent}\nMovimentos: ${movimentosCount}`);
            resetarJogo();
        } else if (vitoria === 2) {
            alert("Voce perdeu, hahahahahahaha");
            resetarJogo();
        }}, 500);
}

function resetarJogo() {
    location.reload();
}