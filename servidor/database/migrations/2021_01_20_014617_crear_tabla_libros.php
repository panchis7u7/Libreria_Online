<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaLibros extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('libros', function (Blueprint $table) {
            $table->id('id_libro');
            $table->string('isbn');
            $table->date('anio_publicacion');
            $table->string('descripcion');
            $table->string('titulo');
            $table->float('precio_fisico',8,2);
            $table->float('precio_electronico',8,2);
            $table->string('tamanio');
            $table->date('fecha_impresion');
            $table->string('lugar_impresion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('libros');
    }
}
