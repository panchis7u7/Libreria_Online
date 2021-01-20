<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_libro',
        'isbn',
        'anio_publicacion',
        'descripcion',
        'titulo',
        'precio_fisico',
        'precio_electronico',
        'tamanio',
        'fecha_impresion',
        'lugar_impresion'
    ];
}
