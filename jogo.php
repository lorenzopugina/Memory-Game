<?php require 'BD/verificaSessao.php'; ?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Pixel Memory</title>

    <link rel="stylesheet" href="CSS/global.css">
    <link rel="stylesheet" href="CSS/jogo.css">
    <script src="Script/global.js"></script>
    
</head>

<body>
    <header class="roxo">
        <div id="Menu_usuario">
            <img id="img1" src="imagens/profile_circle_icon_242774.png" alt="Ícone de perfil">
        </div>
        <div class="titulo">
            <h1>Pixel Memory</h1>
            <p id="Modo">CLÁSSICO</p>
        </div>
        <div id="Menu_ranking">
            <img id="img2" src="imagens/worldgrid_80392.png" alt="Ícone de ranking">
        </div>
    </header>

    <div id="subMenu_Usuario" class="subMenu">
        <ul>
        <li><a href="historico.php">Histórico</a></li>
        <li><a href="alterar_config_usuario.php">Configurações da Conta</a></li>
        <li><a href="index.php">Sair</a></li>
        </ul>
    </div>

    <div id="subMenu_Ranking" class="subMenu">
        <ul>
        <li><a href="ranking.php">Ranking</a></li>
        <li><a href="config_jogo.php">Configurações do Jogo</a></li>
        </ul>
    </div>

    <main>
        <div class="jogo-tela">
            <div class="topo">
                <div class="tempo">
                    00:00
                </div>   
                
                <div class="movimentos">
                    Movimentos: <span id="numMovimentos">0</span>
                </div>
            </div>

            <div class="campo">
                <div class="desistir">
                    <a href="#" onclick="desistir_jogo()">Desistir</a>
                </div> 
            </div>
        </div>

        <div class="trapaca">
            <label for="meuCheckbox">Trapaça</label>
            <input type="checkbox" id="meuCheckbox">
        </div>

    </main>
    <script src="Script/jogo.js"></script>
</body>

</html>