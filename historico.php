<!DOCTYPE html>
<!-- historico.php -->
<?php
    require 'BD/verifica_sessao.php';
?>

<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Historico</title>

  <link rel="stylesheet" href="CSS/global.css">
  <link rel="stylesheet" href="CSS/historico.css">
  <script src="Script/global.js"></script>
</head>



<body>
  <div class="header flex-center">
    <img src="imagens/historico.png" alt="Ícone de histórico">
    <h1 class="text-center">Pixel Memory</h1>
  </div>

  <div class="amarelo historico flex-center">
    <h3>Histórico</h3>
  </div>

  <div class="roxo background">
    <div class="roxo username">
      <p>UserName</p>
    </div>
    
    <div class="tabela">
      <div class="linha cabecalho text-center">
        <div>DATA</div>
        <div>ESTILO</div>
        <div>TEMPO (s)</div>
        <div>JOGADAS</div>
        <div>TABULEIRO</div>
      </div>

      <div class="linha text-center">
        <div>16/02/25</div>
        <div>Classico</div>
        <div>20</div>
        <div>10</div>
        <div>8x8</div>
      </div>
      <div class="linha text-center">
        <div>15/02/25</div>
        <div>Classico</div>
        <div>88</div>
        <div>8</div>
        <div>6x6</div>
      </div>
      <div class="linha text-center">
        <div>15/02/25</div>
        <div>Contra o Tempo</div>
        <div>980</div>
        <div>99</div>
        <div>4x4</div>
      </div>
      <div class="linha text-center">
        <div>13/02/25</div>
        <div>Classico</div>
        <div>1</div>
        <div>2</div>
        <div>2x2</div>
      </div>
      <div class="linha text-center">
        <div>13/02/25</div>
        <div>Classico</div>
        <div>1</div>
        <div>2</div>
        <div>2x2</div>
      </div>
      <div class="linha text-center">
        <div>13/02/25</div>
        <div>Classico</div>
        <div>1</div>
        <div>2</div>
        <div>2x2</div>
      </div>
      <div class="linha text-center">
        <div>13/02/25</div>
        <div>Classico</div>
        <div>1</div>
        <div>2</div>
        <div>2x2</div>
      </div>
    </div>
  </div>

  <a href="config_jogo.html" class="rosa voltar flex-center">Voltar</a>
</body>
</html>
