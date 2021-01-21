<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    public $timestamps = false;

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
    /*
    return [
        'isbn' => $this->faker->unique()->regexify('[A-Za-z0-9]{15}'),
        'anio_publicacion' => $this->faker->date('Y-m-d','now'),
        'descripcion'=> $this->faker->str_random(20),
        'titulo' => $this->faker->str_random(20),
        'precio_fisico' => $this->faker->randomFloat(3, 0, 1000),
        'precio_electronico' => $this->faker->randomFloat(3, 0, 1000),
        'tamanio' => $this->faker->str_random(4),
        'fecha_impresion' => $this->faker->date('Y-m-d','now'),
        'lugar_impresion' => $this->faker->regexify('[A-Za-z0-9]{10}'),
    ];*/
}
