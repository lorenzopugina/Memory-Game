<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Cadastro Pixel Memory</title>

    <link rel="stylesheet" href="CSS/global.css">
    <link rel="stylesheet" href="CSS/cadastro.css">
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
        <p> Cadastre-se para acessar informações </p> 
        <p>da conta</p> 
    </div>

    <div id="subMenu_Ranking" class="subMenu">
        <ul>
        <li><a href="ranking.php">Ranking</a></li>
        </ul>
    </div>

    <main id="main-cadastro">
        <form class="roxo" id="campos-cadastro" method="post" action="BD/cadastrar.php">
            <a href="Index.php"><img src="imagens/return.png" alt="botão de retorno"></a>
            <h2>Cadastro</h2>
            <input type="text" id="nome" name="nome" placeholder="Nome completo" required minlength="3" title="Mínimo 3 caracteres" required>
            <input type="text" id="data_nascimento" onfocus="(this.type='date')" onblur="(this.type='text')" name="data_nascimento" placeholder="Data de nascimento" required>
            <input type="text" id="cpf" name="cpf" placeholder="CPF" required pattern="\d{11}" title="Digite 11 números do CPF">
            <input type="tel" id="telefone" name="telefone" placeholder="Telefone" required pattern="\d{10,11}" title="Digite no formato DDD + número">
            <input type="email" id="email" name="email" placeholder="Email" required>
            <input type="text" id="username" name="username" placeholder="Apelido" required minlength="3" title="Mínimo 3 caracteres">
            <input type="password" id="senha" name="senha" placeholder="Senha" required minlength="6" title="Mínimo 6 caracteres">
            <button type="submit" class="laranja-escuro">Cadastrar</button>
        </form>
    </main>
    <script src="Script/validacao.js"></script>
    </body>

</html>