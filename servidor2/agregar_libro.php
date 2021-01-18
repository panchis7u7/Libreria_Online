<?php

$autor = $_POST['autor'];
$editorial = $_POST['editorial'];
$titulo = $_POST['titulo'];
$año_public = $_POST['año_public'];
$descripcion = $_POST['descripcion'];
$isbn = $_POST['isbn'];



//Conectando con la base de datos de la librería
$servidor = "localhost";
$usuario = "root";
$clave = "";
$base = "libreria";
$conexion = mysqli_connect($servidor, $usuario, $clave, $base);
if (!$conexion) {
    echo "<h2>Error al establecer conexión con el servidor!!!</h2>";
    exit;
}

$sql = "INSERT INTO `libros` (`id_libro`, `isbn`, `titulo`, `anio_publicacion`, `descripcion`) VALUES (NULL, '$isbn', '$titulo', '$año_public', 
'$descripcion')";

if( mysqli_query($conexion,$sql)){
    echo '<div class="alert alert-success" role="alert">
					  Libro Registrado!
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
					</div>';
}else{
    echo '<div class="alert alert-danger" role="alert">
					  Ocurrió un error, Intenta de nuevo!
					  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
					</div>';
}

