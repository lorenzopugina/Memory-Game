<!DOCTYPE html>
<!--index.php-->

<?php
// index.php
require 'BD/autenticar.php';
redirecionarSeLogado();
?>

<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Pixel Memory</title>
    <link rel="stylesheet" href="CSS/global.css">
    <link rel="stylesheet" href="CSS/index.css">
    <script src="Script/global.js"></script>
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
        <p> Faça Login para acessar</p>
        <p> informações da conta</p>
    </div>

    <div id="subMenu_Ranking" class="subMenu">
        <ul>
        <li><a href="ranking.php">Ranking</a></li>
        </ul>
    </div>

    <main id="main-login">
        <form class="roxo" method="post" action="BD/login.php">
            <h2>Login</h2>
            <input type="text" id="username" name="username" placeholder="Apelido" required>
            <input type="password" id="senha" name="senha" placeholder="Senha" required>
            <button type="submit" class="laranja-escuro">Entrar</button>
        </form>
        <div id="cadastre-se">
            <h3>Você é novo aqui?</h3>
            <a href="cadastro.php">Cadastre-se</a>
        </div>
    </main>
</body>


</html>