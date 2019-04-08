-- Drops the bamazon_DB if it exists currently --
DROP DATABASE IF EXISTS bamazon_DB;
-- Creates the "bamazon_DB" database --
CREATE DATABASE bamazon_DB;
-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_DB
;
-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

-- insert product description to db--
INSERT INTO products (product_name, department, price, quantity)
VALUES ("SDXC UHSII 64GB Card", "media", 75.99, 100);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("HDCAM SR 64min Tape", "media", 125.99, 1000);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("Panasonic GH5s", "cameras", 1799.99, 500);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("Sony A7S III", "cameras", 1899.99, 10);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("Canon EOS R", "cameras", 1935.99, 90);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("HDMI 2.0 30ft MM", "cables", 30.99, 100);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("XLR 50ft MF", "cables", 39.99, 750);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("Devialet Phantom Gold Speaker", "audio", 2499.99, 50);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("Audio Technica Turntable", "audio", 299.99, 50);

INSERT INTO products (product_name, department, price, quantity)
VALUES ("LG OLED 55 B8A", "displays", 1699.99, 16);