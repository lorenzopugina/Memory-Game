<?php require 'BD/verificaSessao.php'; ?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Historico</title>

  <link rel="stylesheet" href="CSS/global.css">
  <link rel="stylesheet" href="CSS/historico.css">
  <script src="Script/global.js"></script>
  <script src="Script/historico.js"></script>
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
      <?php echo "{$_SESSION['usuario_username']}"; ?>
    </div>
    
    <div class="tabela">
      <div class="linha cabecalho text-center">
        <div>DATA</div>
        <div>ESTILO</div>
        <div>TEMPO (s)</div>
        <div>JOGADAS</div>
        <div>TABULEIRO</div>
      </div>

      <?php
        $stmt = $conn->prepare("SELECT *, DATE_FORMAT(dataPartida, '%d/%m/%Y %H:%i') AS dataPartidaFormatada FROM partida WHERE id_usuario = {$_SESSION['usuario_id']} ORDER BY dataPartida DESC");
        $stmt->execute();
        $partidas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      ?>

      <script>
        const partidas = <?php echo json_encode($partidas); ?>;
        exibirHistorico(partidas);
      </script>

    </div>
  </div>

  <a href="config_jogo.php" class="rosa voltar flex-center">Voltar</a>
</body>
</html>
