<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    public $incrementing = true;

    protected $table = 'libros';
    protected $primaryKey = 'id_libro';
    protected $keyType = 'int';

    protected $fillable = [
        'isbn',
        'anio_publicacion',
        'descripcion',
        'titulo',
        'precio_fisico',
        'precio_electronico',
        'tamanio',
        'fecha_impresion',
        'lugar_impresion',
        'url',
    ];
}
