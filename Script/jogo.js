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

// usuário corrente (carregado via whoami.php)
let currentUser = { id: null, apelido: null, logged: false };

async function loadCurrentUser() {
    try {
        const resp = await fetch('BD/whoami.php');
        if (!resp.ok) throw new Error('Falha ao obter usuário');
        const j = await resp.json();
        if (j.logged) {
            currentUser = { id: j.id || null, apelido: j.apelido || null, logged: true };
        } else {
            currentUser = { id: null, apelido: null, logged: false };
        }
    } catch (err) {
        console.warn('Erro loadCurrentUser:', err);
        currentUser = { id: null, apelido: null, logged: false };
    }
}

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

// Lista de imagens disponíveis
const imagensDisponiveis = [
    "carro.png",
    "cogumelo.png",
    "luigi.png",
    "marca.png",
    "mario.png",
    "planta.png",
    "waluigi.png",
    "wario.png",
    "akuaku.png",
    "crash.png",
    "cortex.png",
    "bomberman.png",
    "bulbasaur.png",
    "charmander.png",
    "squirtle.png",
    "pikachu.png",
    "meowth.png",
    "megaman.png",
    "yoshi.png",
    "uva.png",
    "velocimetro.png",
    "moto.png",
    "moeda.png",
    "melancia.png",
    "lua.png",
    "laco.png",
    "esqueleto.png",
    "coxa.png",
    "chave.png",
    "cerveja.png",
    "castelo.png",
    "bolo.png"
];

// Calcula quantas peças terão
const totalPecas = dificuldade * dificuldade;
const totalPares = totalPecas / 2;

// aleatoriza o array de imagens
let imagensEscolhidas = imagensDisponiveis.sort(() => Math.random() - 0.5);

// Seleciona apenas o número necessário de imagens
imagensEscolhidas = imagensEscolhidas.slice(0, totalPares);

// Duplica o array de imagens e coloca dentro do array baralho 
let baralho = [...imagensEscolhidas, ...imagensEscolhidas];

// Aleatoriza as imagens para os pares não ficarem juntos
baralho.sort(() => Math.random() - 0.5);

// Cria as peças cada uma com sua imagem
baralho.forEach(imgNome => {
    const peca = document.createElement("div");
    peca.classList.add("pecas");

    const carta = document.createElement("div");
    carta.classList.add("carta");

    const verso = document.createElement("div");
    verso.classList.add("carta-verso");

    const frente = document.createElement("div");
    frente.classList.add("carta-frente");
    const img = document.createElement("img");
    img.src = `./imagens/pecas/${imgNome}`;
    frente.appendChild(img);

    carta.appendChild(frente);
    carta.appendChild(verso);
    peca.appendChild(carta);
    pecasContainer.appendChild(peca);

});

// Adiciona a barra de progresso se o modo for contra o tempo --------------------------------------
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

        barra.value -= dificuldade == 2 ? 100/10 : dificuldade == 4 ? 100/50 : dificuldade == 6 ? 100/150 : 100/300;

        if (verificaVitoria() === 1) jogoAtivo = false;
        else if (barra.value <= 0) {
            jogoAtivo = false;
            exibirVitoria(2); // Perdeu
            clearInterval(intervalo);
        }
    }, 1000);
}

//------------------------------------------------------------------------------------------------------

// Lógica de revelação e comparação
const pecas = document.querySelectorAll(".pecas");
let primeiraPeca = null;
let segundaPeca = null;
let bloqueado = false;

function verificaPecas(e) {
    // validacao inicial
    const pecaClicada = e.currentTarget;
    if (pecaClicada === primeiraPeca) return;
    if (bloqueado) return;

    
    if(trapacaAtiva === true){
        trapacaJogar(pecaClicada);
    }

    else if(trapacaAtiva === false){
        revelarPeca(pecaClicada);
    }

    // atribuir primeira peca
    if (!primeiraPeca) {
        primeiraPeca = pecaClicada;
        return;
    }

    // atribuir segunda peca
    segundaPeca = pecaClicada;
    bloqueado = true;

    const valorPrimeira = getPecaValue(primeiraPeca);
    const valorSegunda = getPecaValue(segundaPeca);

    if(trapacaAtiva === true) {
        if(valorPrimeira === valorSegunda){
            console.log("TRAPACA jogador ACERTOU a combinacao");
            
            primeiraPeca.classList.add("mesma-peca");
            segundaPeca.classList.add("mesma-peca");

            primeiraPeca.querySelector(".carta-frente").classList.remove("amarelo");
            segundaPeca.querySelector(".carta-frente").classList.remove("amarelo");

            let aux;
            aux = primeiraPeca.querySelector(".carta-frente");
            aux.classList.add("verde");
            aux = segundaPeca.querySelector(".carta-frente");
            aux.classList.add("verde");

            resetarSelecao();
        }else{
            console.log("TRAPACA jogador ERROU a combinacao");

            let aux;
            aux = primeiraPeca.querySelector(".carta-frente");
            aux.classList.add("vermelho");
            aux = segundaPeca.querySelector(".carta-frente");
            aux.classList.add("vermelho");

            // chama resetarSelecao junto com a remoção do efeito'
            
            setTimeout(() => {
                primeiraPeca.querySelector(".carta-frente").classList.remove("vermelho");
                segundaPeca.querySelector(".carta-frente").classList.remove("vermelho");
                primeiraPeca.querySelector(".carta-frente").classList.remove("amarelo");
                segundaPeca.querySelector(".carta-frente").classList.remove("amarelo");

                resetarSelecao(); // só depois que termina o vermelho
            }, 1000);
        }
    }else if(trapacaAtiva === false){

        if (valorPrimeira === valorSegunda) {
            primeiraPeca.classList.add("mesma-peca");
            segundaPeca.classList.add("mesma-peca");
            resetarSelecao();
        } else {//here trapaca
            setTimeout(() => { // espera 1 segundo antes de virar de volta
                virarCarta(primeiraPeca);
                virarCarta(segundaPeca);
                resetarSelecao();
            }, 1000);
        }
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

    virarCarta(peca); 

    movimentosCount++;
    movimentos.textContent = Math.floor(movimentosCount / 2);
}

function trapacaJogar(peca) {
    if (movimentosCount === 0) {
        if (modo === "classico") {
            iniciarTempo();
        } else if (modo === "tempo") {
            iniciarBarraProgresso();
            iniciarTempo();
        }
    }
    
    const frente = peca.querySelector(".carta-frente");
    frente.classList.add("amarelo");

    movimentosCount++;
    movimentos.textContent = Math.floor(movimentosCount / 2);
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

// -------------------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------------
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
                <img src="./imagens/estrelaVitoria.gif" alt="Estrela de Vitória" class="estrela-vitoria">
                <p>Tempo: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}
                <br>Movimentos: ${movimentosCount}
                <br>Modo: ${tituloModo.textContent}
                <br>Dificuldade: ${dificuldade_texto}
                <br>Data: ${obterDataAtual()}</p>
                <button onclick="resetarJogo()">Jogar Novamente</button>
            `;
            sair.innerHTML = `<a href="config_jogo.php">Menu</a>`;
            sair.classList.add("sair");
            // salvar partida
            salvarDados();

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
                <img src="./imagens/triste.gif" alt="Cara Triste" class="triste-derrota">
                <p>Tempo: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}
                <br>Movimentos: ${movimentosCount}
                <br>Modo: ${tituloModo.textContent}
                <br>Dificuldade: ${dificuldade_texto}
                <br>Data: ${obterDataAtual()}</p>
                <button onclick="resetarJogo()">Jogar Novamente</button>
            `;
            sair.innerHTML = `<a href="config_jogo.php">Menu</a>`;
            sair.classList.add("sair");
            // salvar partida quando perder
            salvarDados();
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

//--------------------------------------------------------------------------------------------------------------------
function resetarJogo() {
    location.reload();
}

// Envia os dados da partida para o servidor (salvar_partida.php)
async function salvarDados() {
    // Mapear dificuldade (2->1, 4->2, 6->3, 8->4)
    let dif = dificuldade === 2 ? 'F' : dificuldade === 4 ? 'M' : dificuldade === 6 ? 'D' : 'E';

    const movimentosDB = Math.floor(movimentosCount / 2);
    const tempoTotal = typeof segundos === 'number' ? segundos : (min * 60 + sec);
    const trapacaFlag = trapacaUsada ? 1 : 0;
    const modoFlag = modo === 'classico' ? 1 : 2;

    const payload = {
        dificuldade: dif,
        movimentos: movimentosDB,
        tempo: tempoTotal,
        trapaca: trapacaFlag,
        modo: modoFlag
    };

    if (currentUser && currentUser.logged && currentUser.id) {
        payload.id_usuario = currentUser.id;
    }

    const resp = await fetch('BD/salvar_partida.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!resp.ok) {
        console.warn('salvarDados: resposta HTTP', resp.status);
        return;
    }

    const j = await resp.json();
    if (j.success) {
        console.log('Partida salva com sucesso');
    } else {
        console.warn('Falha ao salvar partida:', j.message || j);
    }
}

// Trapaça

// Seleciona o checkbox
const checkboxTrapaca = document.getElementById("meuCheckbox");

let trapacaAtiva = false;
let trapacaUsada = false;

checkboxTrapaca.addEventListener("change", (e) => {
    if (e.target.checked) {
        ativarModoTrapaca();
        trapacaUsada = true;
    } else {
        desativarModoTrapaca();
    }
});

function ativarModoTrapaca() {
    trapacaAtiva = true;
    const pecas = document.querySelectorAll(".pecas");

    console.log('trapaca:', trapacaAtiva);

    if (primeiraPeca) virarCarta(primeiraPeca);
    if (segundaPeca) virarCarta(segundaPeca);
    resetarSelecao();

    pecas.forEach(peca => {
        if (peca.classList.contains("mesma-peca")) {
            return; // não vira se já foi acertada
        }

        virarCarta(peca);
    });
}

function desativarModoTrapaca() {
    trapacaAtiva = false;
    resetarSelecao();
    const pecas = document.querySelectorAll(".pecas");

    console.log('trapaca:', trapacaAtiva);

    pecas.forEach(peca => {

        if (peca.querySelector(".carta-frente").classList.contains("amarelo") || peca.querySelector(".carta-frente").classList.contains("verde")) {
            setTimeout(() => {
                peca.querySelector(".carta-frente").classList.remove("amarelo", "verde");
            }, 300);
        }

        if (peca.classList.contains("mesma-peca")) {
            return; // não vira se já foi acertada
        }

        virarCarta(peca);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const checkboxTrapaca = document.getElementById("meuCheckbox");
    if (checkboxTrapaca) {
        checkboxTrapaca.checked = false;
    }

    trapacaAtiva = false;
    // carrega usuário da sessão (se existir)
    loadCurrentUser();
});

// Previne o arrastar das imagens
document.addEventListener("dragstart", function(e) {
  e.preventDefault();
});