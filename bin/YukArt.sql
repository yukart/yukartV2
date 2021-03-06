SET NAMES 'utf8' COLLATE 'utf8_general_ci';
DROP TABLE users;

CREATE TABLE users (
	id_user INTEGER NOT NULL AUTO_INCREMENT,
	login VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	email VARCHAR(100),
	isAdmin BOOLEAN DEFAULT FALSE,
	mailConfirmation INTEGER NOT NULL UNIQUE,
	isAccountConfirmed BOOLEAN DEFAULT FALSE,
	CONSTRAINT PK_USERS PRIMARY KEY (id_user)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE bridgeFavoriteMovie (
	login VARCHAR(20) NOT NULL UNIQUE,
	movie VARCHAR(100) NOT NULL,
	CONSTRAINT PK_USERS PRIMARY KEY (login,movie)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
-- INSERT INTO users (login, password, email, isAdmin) VALUES
-- ('Admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin@ok.fr', true),
-- ('Vik', 'vik', 'vik@vik.fr', true);

