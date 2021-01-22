CREATE DATABASE IF NOT EXISTS Libreria;
USE Libreria;
#DROP DATABASE IF EXISTS Libreria;

CREATE TABLE IF NOT EXISTS provincias (
	id_provincia INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS localidades (
	id_localidad INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(60),
	id_provincia INT NOT NULL,
	FOREIGN KEY (id_provincia) REFERENCES provincias (id_provincia) ON DELETE CASCADE ON UPDATE CASCADE
);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
CREATE TABLE IF NOT EXISTS libros (
	id_libro INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	isbn VARCHAR(30) UNIQUE NOT NULL, 
	anio_publicacion DATE, 
	descripcion VARCHAR(120), 
	titulo VARCHAR(60), 
	precio_fisico DOUBLE, 
	precio_electronico DOUBLE, 
	tamanio VARCHAR(10), 
	fecha_impresion DATE, 
	lugar_impresion VARCHAR(60), 
	url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS clientes (
	id_cliente INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60), 
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS autores (
	id_autor INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60),
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	url VARCHAR(200), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

=======
CREATE TABLE IF NOT EXISTS libros (
	id_libro INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	isbn VARCHAR(30) UNIQUE NOT NULL, 
	anio_publicacion DATE, 
	descripcion VARCHAR(120), 
	titulo VARCHAR(60), 
	precio_fisico DOUBLE, 
	precio_electronico DOUBLE, 
	tamanio VARCHAR(10), 
	fecha_impresion DATE, 
	lugar_impresion VARCHAR(60), 
	url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS clientes (
	id_cliente INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60), 
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS autores (
	id_autor INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60),
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	url VARCHAR(200), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

>>>>>>> 60bb9f950091d865827903bb9618dad5c895fbff
=======
CREATE TABLE IF NOT EXISTS libros (
	id_libro INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	isbn VARCHAR(30) UNIQUE NOT NULL, 
	anio_publicacion DATE, 
	descripcion VARCHAR(120), 
	titulo VARCHAR(60), 
	precio_fisico DOUBLE, 
	precio_electronico DOUBLE, 
	tamanio VARCHAR(10), 
	fecha_impresion DATE, 
	lugar_impresion VARCHAR(60), 
	url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS clientes (
	id_cliente INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60), 
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS autores (
	id_autor INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	apellidos VARCHAR(60),
	direccion VARCHAR(80), 
	email VARCHAR(30), 
	telefono VARCHAR(12), 
	url VARCHAR(200), 
	id_localidad INT NOT NULL, 
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

>>>>>>> cdbd2aa71b9e4186c4c01e0f2fd24c8e8117f77e
CREATE TABLE IF NOT EXISTS editoriales (
	id_editorial INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(40), 
	direccion VARCHAR(80), 
	telefono VARCHAR(12), 
	url VARCHAR(200), 
	id_localidad INT NOT NULL,
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS almacenes (
	id_almacen INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	direccion VARCHAR(80), 
	telefono VARCHAR(12), 
	id_localidad INT NOT NULL,
	FOREIGN KEY (id_localidad) REFERENCES localidades(id_localidad) ON UPDATE CASCADE ON DELETE CASCADE
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> f32ff01ef97f087f8c831720d71970a331f411cc
=======
>>>>>>> 60bb9f950091d865827903bb9618dad5c895fbff
=======
>>>>>>> cdbd2aa71b9e4186c4c01e0f2fd24c8e8117f77e
);

CREATE TABLE IF NOT EXISTS cestas (
	id_cesta INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	fecha_compra DATETIME, 
	id_cliente INT NOT NULL, 
	FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cesta_contiene_libro (
	id_cesta INT NOT NULL,
	id_libro INT NOT NULL,
	cantidad INT DEFAULT 1,
	PRIMARY KEY (id_cesta, id_libro),
	FOREIGN KEY (id_cesta) REFERENCES cestas(id_cesta) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS autor_escribe_libro (
	id_autor INT NOT NULL,
    id_libro INT NOT NULL,
    PRIMARY KEY (id_autor, id_libro),
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS editorial_publica_libro (
	id_editorial INT NOT NULL,
    id_libro INT NOT NULL,
    PRIMARY KEY (id_editorial, id_libro),
    FOREIGN KEY (id_editorial) REFERENCES editoriales(id_editorial) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS almacen_almacena_libro (
	id_almacen INT NOT NULL,
    id_libro INT NOT NULL,
<<<<<<< HEAD
    PRIMARY KEY (id_almacen, id_libro),
    FOREIGN KEY (id_almacen) REFERENCES almacenes(id_almacen) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE ON UPDATE CASCADE
);
=======
    stock INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (id_almacen, id_libro),
    FOREIGN KEY (id_almacen) REFERENCES almacenes(id_almacen) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE ON UPDATE CASCADE
);
>>>>>>> cdbd2aa71b9e4186c4c01e0f2fd24c8e8117f77e
