<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('autores',"controlador_autores@getAutores" );
Route::post('api/nuevo/autor', 'controlador_autores@nuevoAutor') ;
Route::post('api/ediar/autor/{id}', 'controlador_autores@editAutor');
Route::post('api/borrar/autor/{id}', 'controlador_autores@borrar');
Route::post('api/nuevo/libro/{id}', 'controlador_libros@nuevoLibro');
Route::post('api/editar/libro/{id}', 'controlador_autores@editLibro');
Route::post('api/borrar/libro/{id}', 'controlador_autores@borrarLibro');
Route::post('api/nueva/editorial/{id}', 'controlador_editorial@nuevaEditorial');
Route::post('api/editar/editorial/{id}', 'controlador_editorial@editEditorial');
Route::post('api/borrar/editorial/{id}', 'controlador_editorial@borrarEditorial');



