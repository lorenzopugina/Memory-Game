<!DOCTYPE html>
<!--config_jogo.php--> 
<?php
    require 'BD/verifica_sessao.php';
?>

<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configurações</title>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/config_jogo.css">
    <script src="Script/global.js"></script>
    <script src="Script/configJogo.js"></script>
</head>

<body>
    <header class="roxo"> 
        <div id="Menu_usuario">
            <img id="img1" src="imagens/profile_circle_icon_242774.png" alt="Ícone de perfil">
        </div>
        
        <div id="central-text">
            <h1>Pixel Memory</h1>
        </div>

        <div id="Menu_ranking">
            <img id="img2" src="imagens/worldgrid_80392.png" alt="Ícone de ranking">
        </div>
    </header>

    <div id="subMenu_Usuario" class="subMenu">
        <ul>
        <li><a href="historico.html">Histórico</a></li>
        <li><a href="alterar_config_usuario.html">Configurações da Conta</a></li>
        <li><a href="Index.html">Sair</a></li>
        </ul>
    </div>

    <div id="subMenu_Ranking" class="subMenu">
        <ul>
        <li><a href="ranking.php">Ranking</a></li>
        <li><a href="config_jogo.html">Configurações do Jogo</a></li>
        </ul>
    </div>

    <main>
        <div class="bloco_superior">
            <h2>CONFIGURAÇÕES DA PARTIDA</h2>
        </div>

        <div class="bloco_config">

            <label for="Dificuldade">DIFICULDADE</label>    
            <select class="opcoes" id="Dificuldade">
                <option value="2">2 X 2</option>
                <option value="4">4 X 4</option>
                <option value="6">6 X 6</option>
                <option value="8">8 X 8</option>
            </select>

            <label for="Modo">MODO</label>    
            <select class="opcoes" id="Modo">
                <option value="classico">CLÁSSICO</option>
                <option value="tempo">CONTRA O TEMPO</option>
            </select>

            <div class="jogar" onclick="iniciarJogo()"> 
                INICIAR
            </div>
        
        </div>
    </main>

</body>
