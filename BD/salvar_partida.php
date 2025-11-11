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

$dificuldade = isset($data['dificuldade']) ? $data['dificuldade'] : null;
$movimentos = isset($data['movimentos']) ? intval($data['movimentos']) : null;
$tempo = isset($data['tempo']) ? intval($data['tempo']) : null;
$trapaca = isset($data['trapaca']) ? intval($data['trapaca']) : 0;
$modo = isset($data['modo']) ? $data['modo'] : null;
$vitoria = isset($data['venceu']) ? intval($data['venceu']) : 0;

try {
    $stmt = $conn->prepare("INSERT INTO partida (id_usuario, dificuldade, movimentos, tempo, trapaca, modo, venceu) VALUES (:id_usuario, :dificuldade, :movimentos, :tempo, :trapaca, :modo, :venceu)");
    $stmt->execute([
        ':id_usuario' => $id_usuario,
        ':dificuldade' => $dificuldade,
        ':movimentos' => $movimentos,
        ':tempo' => $tempo,
        ':trapaca' => $trapaca,
        ':modo' => $modo,
        ':venceu' => $vitoria
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

?>
