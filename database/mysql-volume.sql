DROP DATABASE IF EXISTS project_db;
CREATE DATABASE project_db;
USE project_db; 

CREATE TABLE users (
    firstname VARCHAR(30) NOT NULL DEFAULT '',
    lastname VARCHAR(30) NOT NULL DEFAULT '',
    email VARCHAR(30) NOT NULL DEFAULT '',
    phone BIGINT(30),
    pref_contact VARCHAR(30) NOT NULL DEFAULT '',
    referred_by VARCHAR(30) NOT NULL DEFAULT ''
) ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE products (
    id VARCHAR(255),
	category VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(500),
    price INT,
    img_main VARCHAR(255),
    img_b VARCHAR(255),
    img_c VARCHAR(255)
) ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE errors (
    error_code VARCHAR(3),
	response_msg VARCHAR(255)
) ENGINE=INNODB DEFAULT CHARSET=LATIN1;;


INSERT INTO products (id, category, name, description, price, img_main, img_b, img_c) 
VALUES ('1', 'longboards', 'DB', 'A cool looking longboard', 129.99, 'assets/images/featured-long.png', 'assets/images/featured-skate.jpg', 'assets/images/featured-snow.jpg'),
       ('2', 'skateboards', 'Santa Cruz', 'A cool looking skateboard', 99.99, 'assets/images/featured-skate.jpg', 'assets/images/featured-snow.jpg', 'assets/images/featured-surf.jpg'),
       ('3', 'snowboards', 'Jones', 'A cool looking snowboard', 299.99, 'assets/images/featured-snow.jpg', 'assets/images/featured-surf.jpg', 'assets/images/featured-long.png'),
       ('4', 'surfboards', 'Odysea', 'A cool looking surfboard', 399.99, 'assets/images/featured-surf.jpg', 'assets/images/featured-long.png', 'assets/images/featured-skate.jpg');
