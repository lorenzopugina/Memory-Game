const params = new URLSearchParams(window.location.search);
const modo = params.get("modo");
const dificuldade = parseInt(params.get("Dificuldade"));
const pecasContainer = document.querySelector(".campo");
const jogoContainer = document.querySelector(".jogo-tela");
pecasContainer.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;
const movimentos = document.getElementById("numMovimentos");
let intervalo;

const dificuldade_texto = params.get("Dificuldade") === "2" ? "Fácil" :
                         params.get("Dificuldade") === "4" ? "Médio" :
                         params.get("Dificuldade") === "6" ? "Difícil" : "Muito Difícil"; 

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

// Adiciona a barra de progresso se o modo for contra o tempo
if (modo === "tempo") {
    const jogoTela = document.querySelector(".jogo-tela");
    const barra = document.createElement("progress");
    barra.classList.add("progresso");
    barra.max = 100;
    barra.value = 100;
    jogoTela.appendChild(barra);
}

// Lógica da barra de progresso
const barra = document.querySelector(".progresso");
let jogoAtivo = true;
function iniciarBarraProgresso() {
    intervalo = setInterval(() => {
        if (!jogoAtivo) return;

        barra.value -= 100 / 10; // Diminui completamente em 60 segundos
        if (barra.value <= 0) {
            jogoAtivo = false;
            exibirVitoria(2); // Perdeu
            clearInterval(intervalo);
        }
    }, 1000);
}

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
    if (movimentosCount === 0) {
        if (modo === "classico") {
            iniciarTempo();
        } else if (modo === "tempo") {
            iniciarBarraProgresso();
            iniciarTempo();
        }
    }
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
            if (modo === "tempo") {
                const barra = document.querySelector(".progresso");
                barra.classList.add("escondido");
            }

            const tela_vitoria = document.createElement("div");
            const sair = document.createElement("div");
            const topo = document.querySelector(".topo");
            topo.classList.add("escondido");
            pecasContainer.classList.add("escondido");
            tela_vitoria.classList.add("tela-vitoria");
            jogoContainer.appendChild(tela_vitoria);
            jogoContainer.appendChild(sair);

            tela_vitoria.innerHTML = `
                <h2>Você Venceu!</h2>
                <img src="../imagens/estrelaVitoria.gif" alt="Estrela de Vitória" class="estrela-vitoria">
                <p>Tempo: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}
                <br>Movimentos: ${movimentosCount}
                <br>Modo: ${tituloModo.textContent}
                <br>Dificuldade: ${dificuldade_texto}
                <br>Data: ${obterDataAtual()}</p>
                <button onclick="resetarJogo()">Jogar Novamente</button>
            `;
            sair.innerHTML = `<a href="config_jogo.html">Sair</a>`;
            sair.classList.add("sair");

        } else if (vitoria === 2) {
            if (modo === "tempo") {
                const barra = document.querySelector(".progresso");
                barra.classList.add("escondido");
            }
            const tela_derrota = document.createElement("div");
            const sair = document.createElement("div");
            const topo = document.querySelector(".topo");
            topo.classList.add("escondido");
            pecasContainer.classList.add("escondido");
            tela_derrota.classList.add("tela-derrota");
            jogoContainer.appendChild(tela_derrota);
            jogoContainer.appendChild(sair);

            tela_derrota.innerHTML = `
                <h2>Você Perdeu</h2>
                <img src="../imagens/triste.gif" alt="Cara Triste" class="triste-derrota">
                <p>Tempo: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}
                <br>Movimentos: ${movimentosCount}
                <br>Modo: ${tituloModo.textContent}
                <br>Dificuldade: ${dificuldade_texto}
                <br>Data: ${obterDataAtual()}</p>
                <button onclick="resetarJogo()">Jogar Novamente</button>
            `;
            sair.innerHTML = `<a href="config_jogo.html">Sair</a>`;
            sair.classList.add("sair");
        }}, 500);
}

function obterDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const horas = String(hoje.getHours()).padStart(2, '0');
    const minutos = String(hoje.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function resetarJogo() {
    location.reload();
}