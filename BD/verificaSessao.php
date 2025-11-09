<?php
    require 'autenticar.php';

    $paginaLogin = 'index.php';
    $paginaPrincipal = 'config_jogo.php';
    
    // se não estiver logado, volta para o login
    if (!verificarSessao()) {
        echo "  <script>
                    alert('Você não está logado');
                    window.location.href = 'index.php';
                </script>";
        exit;
    }

    // se já está logado e tentar acessar o login, redireciona para o jogo (evitar loop de verificação)
    $paginaAtual = basename($_SERVER['PHP_SELF']);
    if ($paginaAtual === 'index.php' && verificarSessao()) {
        header('Location: ' . $paginaPrincipal);
        exit;
    }
?>
