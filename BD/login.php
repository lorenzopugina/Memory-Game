<?php
// BD/login.php
require 'autenticar.php';

$username = $_POST['username'] ?? '';
$senha = $_POST['senha'] ?? '';

if (!$username || !$senha) {
    echo "<script>alert('Preencha todos os campos!'); window.location.href = '../index.php';</script>";
    exit;
}

if (autenticarUsuario($username, $senha)) {
    echo "<script>alert('Login realizado com sucesso!'); window.location.href = '../jogo.php';</script>";
} else {
    echo "<script>alert('Usuário ou senha incorretos!'); window.location.href = '../index.php';</script>";
}
?>