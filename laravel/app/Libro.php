<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    protected $table = 'libros';
    protected $fillable = ['isbn','anio_publicacion','descripcion','titulo','precio_fisico','precio_electronico',
                           'tamanio','fecha_impresion','lugar_impresion'];
}
