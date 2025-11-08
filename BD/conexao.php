<?php
    $sname = "localhost";
    $uname = "root";
    $pwd = "";
    $dbname = "memorygame";

    try {
        $conn = new PDO("mysql:host=$sname;dbname=memorygame", $uname, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
    

    session_name('minha_sessao_app'); // opcional
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,          // cookie de sessão (apaga ao fechar navegador)
        'path' => '/',
        'domain' => $_SERVER['HTTP_HOST'],
        'secure' => $secure,      // cookie somente via HTTPS
        'httponly' => true,       // não acessível via JS
        'samesite' => 'Lax',      // Lax é comum; ajustar se necessário
    ]);
    session_start();

?>