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
    `roleId`    INT UNSIGNED,
    teacherId   INT UNSIGNED,
    
	PRIMARY KEY(id),
    
    FOREIGN KEY(`roleId`)	REFERENCES `role`(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY(teacherId)	REFERENCES `user`(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
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
INSERT INTO `role`(id, `name`)
VALUES
    (1, 'user'),
    (2, 'admin');

INSERT INTO `user`(id, email, `password`, `roleId`, teacherId)
VALUES
    (1, 'admin1@tfg.es', 'admin1pass', 2, NULL),
    (2, 'user1@tfg.es', 'user1pass', 1, 1),
    (3, 'user2@tfg.es', 'user2pass', 1, 1);

INSERT INTO class(`date`, duration, numMaxClients, teacherId)
VALUES
    (
        DATE_SUB(NOW(), INTERVAL 1 DAY),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 30 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 60 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 90 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        NOW(),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(NOW(), INTERVAL 30 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(NOW(), INTERVAL 60 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(NOW(), INTERVAL 90 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(NOW(), 1),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 30 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 60 MINUTE),
        '00:30:00',
        8,
        1
    ),
    (
        ADDDATE(ADDDATE(NOW(), 1), INTERVAL 90 MINUTE),
        '00:30:00',
        8,
        1
    );
