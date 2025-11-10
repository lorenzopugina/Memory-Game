<?php
require 'conexao.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

// Ler JSON do corpo (front envia JSON)
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// fallback se foi enviado via form (application/x-www-form-urlencoded)
if (!$data) $data = $_POST;

// Prioriza id da sessão (mais seguro)
$id_usuario = null;
if (isset($_SESSION['usuario_id'])) {
    $id_usuario = (int) $_SESSION['usuario_id'];
}

$apelido = isset($data['apelido']) ? trim($data['apelido']) : null;
if (empty($id_usuario) && isset($data['id_usuario']) && !empty($data['id_usuario'])) {
    $id_usuario = intval($data['id_usuario']);
}

$dificuldade = isset($data['dificuldade']) ? intval($data['dificuldade']) : null;
$movimentos = isset($data['movimentos']) ? intval($data['movimentos']) : null;
$tempo = isset($data['tempo']) ? intval($data['tempo']) : null;
$trapaca = isset($data['trapaca']) ? intval($data['trapaca']) : 0;
$modo = isset($data['modo']) ? intval($data['modo']) : null;

// validações básicas
if (empty($id_usuario) && empty($apelido)) {
    echo json_encode(['success' => false, 'message' => 'Usuário não informado']);
    exit;
}

if ($dificuldade === null || $movimentos === null || $tempo === null || $modo === null) {
    echo json_encode(['success' => false, 'message' => 'Dados da partida incompletos']);
    exit;
}

// se não temos id_usuario, resolve pelo apelido
if (empty($id_usuario) && !empty($apelido)) {
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE apelido = :apelido LIMIT 1");
    $stmt->execute([':apelido' => $apelido]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Apelido não encontrado']);
        exit;
    }
    $id_usuario = intval($user['id']);
}

try {
    $stmt = $conn->prepare("INSERT INTO partida (id_usuario, dificuldade, movimentos, tempo, trapaca, modo) VALUES (:id_usuario, :dificuldade, :movimentos, :tempo, :trapaca, :modo)");
    $stmt->execute([
        ':id_usuario' => $id_usuario,
        ':dificuldade' => $dificuldade,
        ':movimentos' => $movimentos,
        ':tempo' => $tempo,
        ':trapaca' => $trapaca,
        ':modo' => $modo
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

?>
