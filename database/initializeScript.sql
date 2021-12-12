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
    `name`      VARCHAR(16),
    `lastName`  VARCHAR(32),
    email		VARCHAR(256)	NOT NULL UNIQUE,
    `password`  VARCHAR(64)     NOT NULL,        -- TODO: Check size (use 64 max. in the client due to limitations in certain hashing algorithms)
    `roleId`    INT UNSIGNED,
    
	PRIMARY KEY(id),
    
    FOREIGN KEY(`roleId`)	REFERENCES `role`(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE `client`(
    id          INT UNSIGNED    NOT NULL,
    teacherId   INT UNSIGNED    NOT NULL,
    
    PRIMARY KEY(id),
    
    FOREIGN KEY(id)	REFERENCES `user`(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(teacherId)	REFERENCES `user`(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- CREATE TABLE teacher => only when teacher has to have columns teacher only has (and not the clients)namelastName

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

CREATE TABLE client_class(
	client_id	INT UNSIGNED,
    class_id	INT UNSIGNED,
    
    PRIMARY KEY(client_id, class_id),
    
    FOREIGN KEY(client_id)	REFERENCES `client`(id)
		ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY(class_id)	REFERENCES class(id)
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

INSERT INTO `user`(id, `name`, lastName, email, `password`, `roleId`)
VALUES
    (1, 'Pedro', 'Jiménez', 'admin1@tfg.es', 'admin1pass', 2),
    (2, 'Leopoldo', 'Gallego Misca', 'user1@tfg.es', 'user1pass', 1),
    (3, 'Susana', 'Fuertes','user2@tfg.es', 'user2pass', 1);
    
INSERT INTO `client`(id, teacherId)
VALUES
    (2, 1),
    (3, 1);

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


-- Stored procedures
DELIMITER $$

CREATE PROCEDURE `sp_registerUser`(
    IN `name`       VARCHAR(16),
    IN lastName     VARCHAR(32),
    IN email        VARCHAR(256),
    IN `password`   VARCHAR(64),
    IN teacherId    INT
)
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    START TRANSACTION;
        INSERT INTO user(
            `name`,
            lastName,
            email,
            `password`,
            roleId)
        VALUES
            (`name`, lastName, email, `password`, 1); -- 1 is 'user' role
        
        INSERT INTO client(id, teacherId)
        VALUES(LAST_INSERT_ID(), teacherId);
        
    IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END $$

DELIMITER ;