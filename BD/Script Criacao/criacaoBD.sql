-- Primeiro crie o BD executando esse comando
CREATE DATABASE memorygame;



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
    modo CHAR(1) NOT NULL,
    venceu BOOLEAN DEFAULT FALSE,
    dataPartida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nome, dataNasc, CPF, telefone, email, apelido, senha)
VALUES 
('Bernaros Mendes', '2000-05-15', '12345678901', '(11) 99999-0001', 'bernardo@mail.com', 'bernas', 'senha123'),
('Marina Souza', '1995-10-22', '23456789012', '(21) 98888-0002', 'marina@mail.com', 'mari_s', 'marina!2024'),
('Carlos Almeida', '1988-03-09', '34567890123', '(31) 97777-0003', 'carlos@mail.com', 'calmeida', 'c@rlos88'),
('Juliana Costa', '1999-07-30', '45678901234', '(41) 96666-0004', 'juliana@mail.com', 'ju_c', 'ju99pass'),
('Felipe Torres', '2002-12-12', '56789012345', '(51) 95555-0005', 'felipe@mail.com', 'felipet', 'ftorres#12');

INSERT INTO partida (id_usuario, dificuldade, movimentos, tempo, trapaca, modo, venceu)
VALUES
(1, 'F', 85, 300, FALSE, 'N', TRUE),
(2, 'M', 120, 480, FALSE, 'T', FALSE),
(3, 'D', 160, 250, FALSE, 'N', TRUE),
(4, 'F', 90, 360, FALSE, 'T', TRUE),
(5, 'M', 110, 400, FALSE, 'N', TRUE),
(1, 'M', 95, 340, FALSE, 'T', FALSE),
(2, 'D', 170, 310, TRUE, 'N', TRUE),
(3, 'F', 80, 290, FALSE, 'T', TRUE),
(4, 'M', 105, 430, FALSE, 'N', FALSE),
(5, 'E', 165, 280, TRUE, 'T', TRUE),
(1, 'D', 75, 310, FALSE, 'N', TRUE),
(2, 'F', 88, 295, FALSE, 'T', TRUE),
(3, 'M', 100, 370, FALSE, 'N', TRUE),
(4, 'D', 70, 320, FALSE, 'T', TRUE),
(5, 'E', 192, 350, FALSE, 'N', TRUE);

