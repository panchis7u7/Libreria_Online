<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $table = 'autors';
    protected $fillable = ['nombre','apellidos','direccion','localidad','provincia','url',
                           'telefono','alerta','msgAlerta','tipoAlerta'];
}

