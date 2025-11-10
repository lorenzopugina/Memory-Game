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

    if (element['resultado']=='W') {
        linha.classList.add("vitoria");
    }
    else {
        linha.classList.add("derrota");
    }

    linha.innerHTML = `
        <div>${element['dataPartidaFormatada']}</div>
        <div>${element['modo']==1? 'Clássico' : 'Contra o Tempo'}</div>
        <div>${formatarTempo(element['tempo'])}</div>
        <div>${element['movimentos']}</div>
        <div>${element['dificuldade' ]==1 ? '2x2' : element['dificuldade']==2 ? '4x4' : element['dificuldade']==3 ? '6x6' : '8x8'}</div>
    `;
    tabela.appendChild(linha);
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const sec = segundos % 60;
  return `${min}min${sec.toString().padStart(2, "0")}`;
}