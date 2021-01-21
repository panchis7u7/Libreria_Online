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
            $table->bigIncrements('id_libro');
            $table->string('isbn')->unique();
            $table->date('anio_publicacion');
            $table->string('descripcion');
            $table->string('titulo');
            $table->float('precio_fisico',8,2);
            $table->float('precio_electronico',8,2);
            $table->string('tamanio');
            $table->date('fecha_impresion');
            $table->string('lugar_impresion');
            $table->string('url');
            /*$table->integer('stock');
            $table->foreignId('id_editorial')->references('id_editorial')->on('editoriales')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('id_autor')->references('id_autor')->on('autores')
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('id_almacen')->references('id_almacen')->on('almacenes')
            ->onDelete('cascade')->onUpdate('cascade');*/
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
