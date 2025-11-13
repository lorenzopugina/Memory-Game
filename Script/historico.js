function exibirHistorico(partidas) {
    partidas.forEach(element => {
        criarLinhaHistorico(element);
    });
}

function criarLinhaHistorico(element) {
    const tabela = document.querySelector(".tabela");
    const linha = document.createElement("div");
    linha.classList.add("linha");
    linha.classList.add("text-center");

    if (element['venceu']) {
        linha.classList.add("vitoria");
    }
    else {
        linha.classList.add("derrota");
    }

    if (element['trapaca']) {
        linha.classList.add("trapaca");
    }

    linha.innerHTML = `
        <div>${element['dataPartidaFormatada']}</div>
        <div>${element['modo']=='N'? 'Clássico' : 'Contra o Tempo'}</div>
        <div>${formatarTempo(element['tempo'])}</div>
        <div>${element['movimentos']}</div>
        <div>${element['dificuldade' ]=='F' ? '2x2' : element['dificuldade']=='M' ? '4x4' : element['dificuldade']=='D' ? '6x6' : '8x8'}</div>
    `;
    tabela.appendChild(linha);
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const sec = segundos % 60;
  return `${min}min${sec.toString().padStart(2, "0")}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const tabela = document.querySelector('.tabela');
  if (!tabela) return;
  const linhas = tabela.querySelectorAll('.linha:not(.cabecalho)');

    linhas.forEach(linha => {
    linha.addEventListener("click", () => {
    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhes-partida");
    detalhes.innerHTML = `
        <h3>Detalhes da partida:</h3>
            <div class="detalhes-conteudo">
                <p>Data: ${linha.children[0].textContent}</p>
                <p>Modo: ${linha.children[1].textContent}</p>
                <p>Tempo: ${linha.children[2].textContent}</p>
                <p>Movimentos: ${linha.children[3].textContent}</p>
                <p>Dificuldade: ${linha.children[4].textContent}</p>
                <p>Trapaceou? ${linha.classList.contains("trapaca") ? "Sim" : "Não"}</p>
                <p>Resultado: ${linha.classList.contains("vitoria") ? "Vitória" : "Derrota"}</p>
            </div>
        <button onclick="this.parentElement.remove()">Fechar</button>
    `;
    tabela.appendChild(detalhes);
    });
});

}); 

