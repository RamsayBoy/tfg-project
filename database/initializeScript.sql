-- --------------------------------------------------------
-- DATABASE
-- --------------------------------------------------------
DROP DATABASE IF EXISTS tfgdb;

CREATE DATABASE tfgdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE tfgdb;

-- --------------------------------------------------------
-- TABLES
-- --------------------------------------------------------
CREATE TABLE `role`(
	id			INT UNSIGNED	AUTO_INCREMENT,
    `name`      VARCHAR(16)     NOT NULL,
    
	PRIMARY KEY(id)
);

CREATE TABLE `user`(
	id			INT UNSIGNED	AUTO_INCREMENT,
    email		VARCHAR(256)	NOT NULL UNIQUE,
    `password`  VARCHAR(64)     NOT NULL,        -- TODO: Check size (use 64 max. in the client due to limitations in certain hashing algorithms)
    `role`      INT UNSIGNED,
    
	PRIMARY KEY(id),
    
    FOREIGN KEY(`role`)	REFERENCES `role`(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- --------------------------------------------------------
-- DATA
-- --------------------------------------------------------
INSERT INTO `role`(`name`)
VALUES
    ('admin');

INSERT INTO `user`(email, `password`, `role`)
VALUES
    ('admin1@tfg.es', 'admin1pass', (SELECT id FROM `role` WHERE `name` = 'admin')),
    ('user1@tfg.es', 'user1pass', NULL),
    ('user2@tfg.es', 'user2pass', NULL);
