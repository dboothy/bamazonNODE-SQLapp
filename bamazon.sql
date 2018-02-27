DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_q INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Keurig Instant coffee maker", "kitchen", 112.99, 55);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Honda Civic Type R floormat", "automotive", 49.99, 43 );

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Stretch Armstrong action figure", "toys", 11.99, 112);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Gundam action figure", "toys", 18.99, 43);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("My Little Pony board game", "board games", 15.99, 39);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Terminator 2: Judgement Day", "home video", 19.99, 36);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Fender Electric Guitar, signature edition", "music equipment", 499, 13);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Yamaha Electric Keyboard with synths", "music equipment", 299, 23);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Bose headphones", "electronics", 199, 49);

INSERT INTO products (product_name, department_name, price, stock_q)
VALUES ("Science Starter Kit for kids!", "toys", 12.99, 47);

