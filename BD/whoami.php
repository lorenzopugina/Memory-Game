<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (isset($_SESSION['usuario_id']) && !empty($_SESSION['usuario_id'])) {
    echo json_encode([
        'logged' => true,
        'id' => (int) $_SESSION['usuario_id'],
        'apelido' => $_SESSION['usuario_username'] ?? null
    ]);
} else {
    echo json_encode(['logged' => false]);
}

?>
