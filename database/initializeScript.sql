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
    `roleId`      INT UNSIGNED,
    
	PRIMARY KEY(id),
    
    FOREIGN KEY(`roleId`)	REFERENCES `role`(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE class(
    id              INT UNSIGNED    AUTO_INCREMENT,
    `date`          DATETIME        NOT NULL UNIQUE,
    duration        TIME            NOT NULL,
    numMaxClients   INT UNSIGNED    NOT NULL,
    teacherId       INT UNSIGNED    NOT NULL,
    
    PRIMARY KEY(id),
    
    FOREIGN KEY(teacherId)	REFERENCES `user`(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- --------------------------------------------------------
-- DATA
-- --------------------------------------------------------
INSERT INTO `role`(`name`)
VALUES
    ('admin');

INSERT INTO `user`(email, `password`, `roleId`)
VALUES
    ('admin1@tfg.es', 'admin1pass', (SELECT id FROM `role` WHERE `name` = 'admin')),
    ('user1@tfg.es', 'user1pass', NULL),
    ('user2@tfg.es', 'user2pass', NULL);

INSERT INTO class(`date`, duration, numMaxClients, teacherId)
VALUES
    (
        DATE_SUB(NOW(), INTERVAL 1 DAY),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 30 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 30 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 60 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 60 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 90 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 90 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 120 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        NOW(),
        CAST(ADDDATE(NOW(), INTERVAL 30 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(NOW(), INTERVAL 30 MINUTE),
        CAST(ADDDATE(NOW(), INTERVAL 60 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(NOW(), INTERVAL 60 MINUTE),
        CAST(ADDDATE(NOW(), INTERVAL 90 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(NOW(), INTERVAL 90 MINUTE),
        CAST(ADDDATE(NOW(), INTERVAL 120 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(NOW(), 1),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 30 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 30 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 60 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 60 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 90 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 90 MINUTE),
        CAST(ADDDATE(ADDDATE(NOW(), 1), INTERVAL 120 MINUTE) AS TIME),
        8,
        (SELECT id FROM `role` WHERE `name` = 'admin')
    );
