document.addEventListener("DOMContentLoaded", function() {
    filtrarRanking("todas");
});

function exibirRanking(partidas, modo, usuarios) {
    let contador = 1;
    partidas.forEach(element => {
        if (modo === "facil")
            if (Number(element['dificuldade'])==1)
                criarLinhaRanking(element, usuarios, contador++);
        if (modo === "medio")
            if (Number(element['dificuldade'])==2)
                criarLinhaRanking(element, usuarios, contador++);
        if (modo === "dificil")
            if (Number(element['dificuldade'])==3)
                criarLinhaRanking(element, usuarios, contador++);
        if (modo === "extremo")
            if (Number(element['dificuldade'])==4)
                criarLinhaRanking(element, usuarios, contador++);
        if (modo === "todas")
            criarLinhaRanking(element, usuarios, contador++);
    });
}

function criarLinhaRanking(element, usuarios, contador) {
    const tabela = document.querySelector(".tabela");
    const linha = document.createElement("div");
    linha.classList.add("linha");

    switch(contador) {
        case 1:
            linha.classList.add("primeiro-lugar");
            break;
        case 2:
            linha.classList.add("segundo-lugar");
            break;
        case 3:
            linha.classList.add("terceiro-lugar");
            break;
    }

    const usuario = usuarios.find(user => user['id'] === element['id_usuario']);

    linha.innerHTML = `
        <div>${contador}</div>
        <div>${usuario['apelido']}</div>
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

function limparTabela() {
    const tabela = document.querySelector(".tabela");
    const linhas = tabela.querySelectorAll(".linha:not(.cabecalho)");

    linhas.forEach(linha => linha.remove());
}