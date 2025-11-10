<?php
require_once 'conexao.php';

function autenticarUsuario($username, $senha) {
    
    global $conn;

    try {
        $stmt = $conn->prepare("SELECT id, apelido, senha FROM usuarios WHERE apelido = :username");
        $stmt->execute([':username' => $username]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!empty($usuario) && $usuario['senha'] == $senha) {
            // Login bem-sucedido
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_username'] = $usuario['apelido'];
            $_SESSION['logado'] = true;
            $_SESSION['ultimo_acesso'] = time();
            
            return true;
        }
        return false;
    } catch(PDOException $e) {
        error_log("Erro de autenticação: " . $e->getMessage());
        return false;
    }
}

function verificarSessao() {
    if (!isset($_SESSION['usuario_id']) || !$_SESSION['logado']) {
        return false;
    }
    
    // Verificar tempo de inatividade (opcional - 1 hora)
    $timeout = 3600;
    if (isset($_SESSION['ultimo_acesso']) && (time() - $_SESSION['ultimo_acesso']) > $timeout) {
        session_destroy();
        return false;
    }
    
    $_SESSION['ultimo_acesso'] = time();
    return true;
}

function redirecionarSeNaoLogado($paginaLogin = '../memory-game/index.php') {
    if (!verificarSessao()) {
        header('Location: ' . $paginaLogin);
        exit;
    }
}

function redirecionarSeLogado($paginaPrincipal = 'config_jogo.php') {
    if (verificarSessao()) {
        header('Location: ' . $paginaPrincipal);
        exit;
    }
}
?>
