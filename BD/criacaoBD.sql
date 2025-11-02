
-- Primeiro crie o BD executando esse comando
CREATE DATABASE memorygame


-- depois de criar o BD, execute esse script para criar as tabelas
USE memorygame;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    dataNasc DATE,
    CPF CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(70) NOT NULL,
    apelido VARCHAR(15) NOT NULL,
    senha VARCHAR(35) NOT NULL
);

CREATE TABLE partida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    dificuldade CHAR(1) NOT NULL,
    movimentos int,
    tempo int not null,
    trapaca BOOLEAN DEFAULT FALSE,
    dataPartida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

