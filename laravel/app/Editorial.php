<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Editorial extends Model
{
    protected $table = 'editorials';
    protected $fillable = ['nombre','direccion','provincia','url','alerta','msgAlerta',
                           'tipoAlerta','telefono'];
}
