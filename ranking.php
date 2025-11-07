<!DOCTYPE html>
<!-- ranking.php-->
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Ranking Global</title>

    <link rel="stylesheet" href="CSS/global.css">
    <link rel="stylesheet" href="CSS/ranking.css">
    <script src="Script/global.js"></script>
    <script src="Script/ranking.js"></script>
    <?php require 'BD/conexao.php'; ?>
</head>

<body>
    <header class="roxo">
        <div id="Menu_usuario">
            <img id="img1" src="imagens/profile_circle_icon_242774.png" alt="Ícone de perfil">
        </div>        
        <h1>Pixel Memory</h1>
        <p>RANKING GLOBAL</p>
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
        <li><a href="config_jogo.html">Configurações do Jogo</a></li>
        </ul>
    </div>

    <div class="roxo background">
        <select class="filtro" id="Dificuldade" onclick="filtrarRanking(this.value)">
            <option value="todas">Todos</option>
            <option value="facil">2 X 2</option>
            <option value="medio">4 X 4</option>
            <option value="dificil">6 X 6</option>
            <option value="extremo">8 X 8</option>
        </select>
        
        <div class="tabela"> 

            <div class="linha cabecalho"> 
                <div>RANK</div>
                <div>USERNAME</div>
                <div>ESTILO</div>
                <div>TEMPO(s)</div>
                <div>JOGADAS</div>
                <div>TABULEIRO</div>
            </div>

            <?php
                require 'BD/verifica_sessao.php';
                

                $facilStmt = $conn->prepare("SELECT * FROM partida WHERE dificuldade = 1 ORDER BY movimentos ASC, tempo ASC");
                $facilStmt->execute();
                $partidasFaceis = $facilStmt->fetchAll(PDO::FETCH_ASSOC);

                $medioStmt = $conn->prepare("SELECT * FROM partida WHERE dificuldade = 2 ORDER BY movimentos ASC, tempo ASC");
                $medioStmt->execute();
                $partidasMedias = $medioStmt->fetchAll(PDO::FETCH_ASSOC);

                $dificilStmt = $conn->prepare("SELECT * FROM partida WHERE dificuldade = 3 ORDER BY movimentos ASC, tempo ASC");
                $dificilStmt->execute();
                $partidasDificeis = $dificilStmt->fetchAll(PDO::FETCH_ASSOC);

                $extremoStmt = $conn->prepare("SELECT * FROM partida WHERE dificuldade = 4 ORDER BY movimentos ASC, tempo ASC");
                $extremoStmt->execute();
                $partidasExtremos = $extremoStmt->fetchAll(PDO::FETCH_ASSOC);

                $usuarioStmt = $conn->prepare("SELECT * FROM usuarios");
                $usuarioStmt->execute();
                $usuarios = $usuarioStmt->fetchAll(PDO::FETCH_ASSOC);
            ?>

            <script>
                function filtrarRanking(modo) {
                    limparTabela();
                    const partidas = modo=="todas"? <?php echo json_encode(array_merge($partidasExtremos, $partidasDificeis, $partidasMedias, $partidasFaceis)); ?> :
                                modo=="facil" ? <?php echo json_encode($partidasFaceis); ?> :
                                modo=="medio" ? <?php echo json_encode($partidasMedias); ?> :
                                modo=="dificil" ? <?php echo json_encode($partidasDificeis); ?> :
                                <?php echo json_encode($partidasExtremos); ?>;
                    const usuarios = <?php echo json_encode($usuarios); ?>;
                    exibirRanking(partidas, "todas", usuarios);
                }
            </script>
            
        </div>
    </div>

    <a href="config_jogo.html" class="rosa" id="voltar">Voltar</a>

</body>

</html>