CREATE DATABASE IF NOT EXISTS libreria;
USE libreria;

CREATE TABLE `Libros` (
  `id_libro` int(11) NOT NULL,
  `isbn` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `anio_publicacion` date NOT NULL,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `titulo` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `precio_fisico` double NOT NULL,
  `precio_electronico` double NOT NULL,
  `tamanio` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_impresion` date NOT NULL,
  `lugar_impresion` varchar(100) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

INSERT INTO Libros VALUES (1, '12121jdsj2', '2008-7-04', 'No hay nada.', 'La verdad', 29.99, 19.99, '30mb', '2008-9-10', 'Mexico');
SELECT * FROM Libros;
