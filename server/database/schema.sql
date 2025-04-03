-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
    -- Removed trailing comma
);

-- Table des classes
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE  
);

-- Table des personnages
CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    class_id INT,
    name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    level INT DEFAULT 1 CHECK(level BETWEEN 1 AND 200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- Table des catégories d'items
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Table des items
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category_id INT,
    level_required INT NOT NULL CHECK(level_required BETWEEN 1 AND 200),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Table de liaison entre personnages et items (un personnage peut avoir plusieurs items, et un item peut être utilisé par plusieurs personnages)
CREATE TABLE Inventory (
    character_id INT,
    item_id INT,
    PRIMARY KEY (character_id, item_id),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- insert données table utilisateur
INSERT INTO users (username, password, email) 
VALUES 
('user1', 'hashed_password1', 'user1@example.com'),  
('user2', 'hashed_password2', 'user2@example.com'),  
('user3', 'hashed_password3', 'user3@example.com'),  
('user4', 'hashed_password4', 'user4@example.com'),  
('user5', 'hashed_password5', 'user5@example.com');

-- insert données table classes
INSERT INTO classes (name) VALUES 
('Féca'),
('Osamodas'),
('Énutrof'),
('Sram'),
('Xélor'),
('Écaflip'),
('Éniripsa'),
('Iop'),
('Cra'),
('Sadida'),
('Sacrieur'),
('Panda');

-- insert données table personnages 

INSERT INTO characters (user_id, class_id, name, gender, level) VALUES  
(1, 1, 'Dark-Sram', 'Male', 50),  
(2, 3, 'Elya-Wynn', 'Female', 120),  
(3, 5, 'Ragnar-Feca', 'Male', 80),
(1, 2, 'Rengoku', 'Male', 145),
(2, 3, 'Shinobu', 'Female', 67),
(3, 1, 'Tanjiro', 'Male', 189),
(4, 4, 'Nezuko', 'Female', 23),
(5, 2, 'Tengen', 'Male', 176),
(1, 1, 'Muichiro', 'Male', 94),
(2, 4, 'Kanae', 'Female', 37),
(3, 2, 'Sanemi', 'Male', 158),
(4, 3, 'Mitsuri', 'Female', 80),
(5, 1, 'Obanai', 'Male', 12),
(4, 2, 'Luna-Eniripsa', 'Female', 65),  
(5, 4, 'Guts-Iop', 'Male', 150),  
(1, 6, 'Mystique-Xelor', 'Female', 99),  
(2, 7, 'Aqua-Sadida', 'Female', 72),  
(3, 8, 'Titan-Panda', 'Male', 110),  
(4, 9, 'Zéphyr-Cra', 'Male', 134),  
(5, 10, 'Selena-Sacrieur', 'Female', 200);  

-- Ajout des catégories
INSERT INTO categories (name) 
VALUES 
('Arme'),
('Amulette'),
('Anneau'),
('Ceinture'),
('Bottes'),
('Coiffe'),
('Dofus'),
('Cape'),
('Bouclier'),
('Familier'),
('Monture'),
('Trophée');

-- Ajout des items
INSERT INTO items (name, category_id, level_required) 
VALUES 
('Marteau du Bouftou', 1, 10),
('Amulette du Bouftou', 2, 3),
('Anneau de Bouze le Clerc', 3, 10),
('Ceinture du Bouftou', 4, 20),
('Boufbottes', 5, 10),
('Coiffe du Bouftou', 6, 10),
('Cape Bouffante', 8, 10),
('Épée du Bandit', 1, 15),
('Arc Ecologique', 1, 30),
('Amulette du Hibou', 2, 12),
('Anneau du Scarabosse Doré', 3, 40),
('Ceinture Tortue', 4, 50),
('Bottes du Craqueleur', 5, 35),
('Chapeau du Piou Bleu', 6, 5),
('Dofus Emeraude', 7, 100),
('Cape du Tofu Fou', 8, 25),
('Bouclier du Bwork', 9, 45),
('Minifoux', 10, 60),
('Dragodinde Dorée', 11, 100),
('Trophée Vigoureux', 12, 80);

-- insert données character_items
-- Correction: Les IDs de character doivent être ajustés car il y a maintenant 20 personnages
-- Ajout d'une mise à jour des IDs pour les références dans les associations
INSERT INTO inventory (character_id, item_id) VALUES  
(11, 1),  -- Dark-Sram utilise le Marteau du Bouftou
(11, 3),  -- Il porte aussi l'Anneau de Bouze le Clerc
(12, 2),  -- Elya-Wynn porte l'Amulette du Bouftou
(12, 7),  -- Et une Cape Bouffante
(13, 6),  -- Ragnar-Feca a la Coiffe du Bouftou
(13, 8),  -- Il manie l'Épée du Bandit (corrigé de 9 qui est l'Arc Écologique)
(14, 2),  -- Luna-Eniripsa utilise l'Amulette du Bouftou
(14, 12), -- Et la Ceinture Tortue
(15, 9),  -- Guts-Iop utilise l'Arc Ecologique (pour le fun) (corrigé de 10 qui est l'Amulette du Hibou)
(15, 15), -- Il a aussi un Dofus Emeraude (corrigé de 14 qui est le Chapeau du Piou Bleu)
(16, 5),  -- Mystique-Xelor porte les Boufbottes
(16, 16), -- Et une Cape du Tofu Fou (corrigé de 15 qui est le Dofus Emeraude)
(17, 4),  -- Aqua-Sadida a la Ceinture du Bouftou (corrigé de 8)
(17, 11), -- Et l'Anneau du Scarabosse Doré (corrigé de 13)
(18, 17), -- Titan-Panda porte un Bouclier du Bwork (corrigé de 11)
(18, 18), -- Et possède un Minifoux (corrigé de 16)
(19, 4),  -- Zéphyr-Cra a une Ceinture du Bouftou
(19, 19), -- Et une Dragodinde Dorée (corrigé de 17)
(20, 20); -- Selena-Sacrieur porte un Trophée Vigoureux (corrigé de 18)