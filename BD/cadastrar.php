<?php
    require 'conexao.php';

    $cpf = $_POST['cpf'] ?? '';
    $username = $_POST['username'] ?? '';

    if(verificaCPF($cpf)){
        // CPF já cadastrado
        echo "  <script>
                    alert('CPF já cadastrado!'); 
                    window.location.href = '../cadastro.php';
                </script>";
        exit;
    } 

    if(verificaApelido($username)){
        // Apelido já cadastrado
        echo "  <script>
                    alert('Apelido já cadastrado, tente outro!'); 
                    window.location.href = '../cadastro.php';
                </script>";
        exit;
    }

    $nome = $_POST['nome'] ?? '';
    $data_nascimento = $_POST['data_nascimento'] ?? NULL;
    $telefone = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // Validação dos campos obrigatórios
    if (!$nome || !$cpf || !$username || !$senha) {
        echo "  <script>
                    alert('Preencha os campos obrigatórios'); 
                    window.location.href = '../cadastro.php';
                </script>";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, dataNasc, CPF, telefone, email, apelido, senha)
                                    VALUES (:nome, :data, :cpf, :telefone, :email, :apelido, :senha)");

    $stmt->execute([
        ':nome' => $nome,
        ':data' => $data_nascimento,
        ':cpf' => $cpf,
        ':telefone' => $telefone,
        ':email' => $email,
        ':apelido' => $username,
        ':senha' => $senha
    ]);

    echo "  <script>
                alert('Cadastrado com sucesso!'); 
                window.location.href = '../index.php';
            </script>";
    exit;
    

    function verificaCPF($cpf):bool{
        global $conn;

        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE CPF = :cpf");
        $stmt->execute([':cpf' => $cpf]);

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    function verificaApelido($username):bool{
        global $conn;

        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE apelido = :username");
        $stmt->execute([':username' => $username]);

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
?>
