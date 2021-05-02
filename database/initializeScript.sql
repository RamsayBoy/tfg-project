-- --------------------------------------------------------
-- DATABASE
-- --------------------------------------------------------
DROP DATABASE IF EXISTS tfgdb;

CREATE DATABASE tfgdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE tfgdb;

-- --------------------------------------------------------
-- TABLES
-- --------------------------------------------------------
CREATE TABLE `user`(
	id			INT UNSIGNED	AUTO_INCREMENT,
    email		VARCHAR(256)	NOT NULL UNIQUE,
    `password`  VARCHAR(64)     NOT NULL,        -- TODO: Check size (use 64 max. in the client due to limitations in certain hashing algorithms)
    
	PRIMARY KEY(id)
);

INSERT INTO `user`(email, `password`)
VALUES
    ('user1@tfg.es', 'user1pass');
