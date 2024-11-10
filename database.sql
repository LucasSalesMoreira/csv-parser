CREATE TABLE login 
( 
 id SERIAL PRIMARY KEY,  
 name VARCHAR NOT NULL,  
 password VARCHAR NOT NULL,  
 role VARCHAR NOT NULL DEFAULT 'ADM',  
 created_at timestamp NOT NULL default current_timestamp,  
 updated_at timestamp NOT null default current_timestamp,  
 establishment_id INT
);

CREATE TABLE establishment
( 
 id SERIAL PRIMARY KEY,  
 name VARCHAR NOT NULL,  
 corporate_reason VARCHAR NOT NULL,  
 legal_document VARCHAR NOT NULL,  
 UNIQUE (corporate_reason,legal_document)
);

CREATE TABLE session 
( 
 id SERIAL PRIMARY KEY,  
 token VARCHAR NOT NULL,  
 created_at timestamp NOT NULL default current_timestamp,  
 login_id INT NOT NULL,  
 UNIQUE (token,login_id)
);
  

CREATE TABLE product 
( 
 id SERIAL PRIMARY KEY,  
 code VARCHAR NOT null,  
 manufacturer_code VARCHAR,  
 description VARCHAR(200) NOT NULL,  
 purchase_value FLOAT,  
 cost_value FLOAT,  
 price FLOAT NOT NULL,  
 UNIQUE (code)
);
 
CREATE TABLE supplier 
( 
 id SERIAL PRIMARY KEY,  
 corporate_reason VARCHAR(200) NOT NULL,  
 name VARCHAR(200) NOT NULL,  
 address VARCHAR(250),  
 phone VARCHAR(20),  
 district VARCHAR(50),  
 city VARCHAR(50),  
 state VARCHAR(50),  
 cep VARCHAR(20),  
 legal_document VARCHAR(14) NOT NULL,  
 representative VARCHAR(200)  
); 

CREATE TABLE product_supplier 
( 
 id SERIAL PRIMARY KEY,  
 product_id INT NOT NULL,  
 supplier_id INT NOT NULL 
); 

CREATE TABLE sale 
( 
 id SERIAL PRIMARY KEY,  
 value FLOAT NOT NULL,  
 login_id INT NOT NULL,  
 client_id INT NOT NULL
); 

CREATE TABLE address 
( 
 id SERIAL PRIMARY KEY,  
 number VARCHAR(5) NOT NULL,  
 district VARCHAR(50) NOT NULL,  
 city VARCHAR(50) NOT NULL,  
 state VARCHAR(50) NOT NULL,  
 cep VARCHAR(20) NOT NULL,  
 street VARCHAR(100) NOT NULL,  
 establishment_id INT  
); 

CREATE TABLE cart 
( 
 id SERIAL PRIMARY KEY,  
 product_supplier_id INT,  
 sale_id INT NOT NULL  
); 

CREATE TABLE client 
( 
 id SERIAL PRIMARY KEY,  
 name VARCHAR(100) NOT NULL,  
 legal_document VARCHAR(14) NOT NULL,  
 number VARCHAR(20),  
 email VARCHAR(100),  
 UNIQUE (legal_document)
); 

ALTER TABLE login ADD FOREIGN KEY(establishment_id) REFERENCES establishment (id);
ALTER TABLE session ADD FOREIGN KEY(login_id) REFERENCES login (id);
ALTER TABLE product_supplier ADD FOREIGN KEY(product_id) REFERENCES product (id);
ALTER TABLE product_supplier ADD FOREIGN KEY(supplier_id) REFERENCES supplier (id);
ALTER TABLE sale ADD FOREIGN KEY(login_id) REFERENCES login (id);
ALTER TABLE sale ADD FOREIGN KEY(client_id) REFERENCES client (id);
ALTER TABLE address ADD FOREIGN KEY(establishment_id) REFERENCES establishment (id);
ALTER TABLE cart ADD FOREIGN KEY(product_supplier_id) REFERENCES product_supplier (id);
ALTER TABLE cart ADD FOREIGN KEY(sale_id) REFERENCES sale (id);


select * from cart;

