<?php
     require 'conexao.php';
     $nome = $_POST['nome'] ?? '';
     $telefone = $_POST['telefone'] ?? '';
     $email = $_POST['email'] ?? '';
     $senha = $_POST['senha'] ?? '';

     $stmt = $conn->prepare("UPDATE usuarios SET nome = :nome, telefone = :telefone, email = :email, senha = :senha WHERE id = :id");
     $stmt->execute([
         ':nome' => $nome,
         ':telefone' => $telefone,
         ':email' => $email,
        ':senha' => $senha,
         ':id' => $_SESSION['usuario_id']
     ]);

    echo "  <script>
                alert('Dados atualizados com sucesso!'); 
                window.location.href = '../config_jogo.php';
            </script>";
?>   