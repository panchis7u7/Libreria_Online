CREATE DATABASE IF NOT EXISTS Libreria;
USE Libreria;
#DROP DATABASE IF EXISTS Libreria;

CREATE TABLE IF NOT EXISTS localidades (
id_localidad INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS editoriales (
id_editorial INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(100), 
direccion VARCHAR(200), 
telefono INT(10), 
url VARCHAR(200), 
id_localidad INT NOT NULL,
FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS provincias (
id_provincia INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(200), 
id_localidad INT NOT NULL, 
FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS almacenes (
id_almacen INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
direccion VARCHAR(200), 
telefono INT(10), 
stock INT(10),
id_localidad INT NOT NULL,
id_libro INT NOT NULL,
FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientes (
id_cliente INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(100), 
apellidos VARCHAR(100),      
direccion VARCHAR(200), 
email VARCHAR(50), 
telefono int(10), 
id_localidad INT NOT NULL, 
FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS autores (
id_autor INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(100), 
apellidos VARCHAR(100), 
direccion VARCHAR(200), 
telefono INT(10), 
url VARCHAR(200), 
id_localidad INT NOT NULL, 
FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS libros (
id_libro INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
isbn VARCHAR(30) UNIQUE NOT NULL, 
anio_publicacion DATE, 
descripcion VARCHAR(200), 
titulo VARCHAR(100), 
precio_fisico DOUBLE, 
precio_electronico DOUBLE, 
tamanio VARCHAR(10), 
fecha_impresion DATE, 
lugar_impresion VARCHAR(200), 
url VARCHAR(200), 
portada VARCHAR(200),
id_editorial INT NOT NULL, 
id_autor INT NOT NULL, 
FOREIGN KEY (id_editorial) REFERENCES editoriales(id_editorial) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY (id_autor) REFERENCES autores(id_autor) ON UPDATE CASCADE ON DELETE CASCADE, 
);

CREATE TABLE IF NOT EXISTS cestas (
id_cesta INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
fecha_compra DATETIME, 
cantidad INT,  
id_libro INT NOT NULL, 
id_cliente INT NOT NULL, 
FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON UPDATE CASCADE ON DELETE CASCADE
);