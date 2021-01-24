<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Libro;
use App\Models\Autor;
use App\Models\Almacen;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::get('/libros', 'App\Http\Controllers\LibrosController@index');
//Route::post('/libros', 'App\Http\Controllers\LibrosController@store');
//Route::put('/libros', 'App\Http\Controllers\LibrosController@update');
//Route::delete('/libros', 'App\Http\Controllers\LibrosController@destroy');

//API para libros GET, POST, UPDATE
Route::resource('libros', 'App\Http\Controllers\LibrosController');

//API para Autores GET, POST, UPDATE
Route::resource('autores', 'App\Http\Controllers\AutoresController');

//API para Almacenes GET, POST, UPDATE
Route::resource('almacenes', 'App\Http\Controllers\AlmacenesController');


//API para registrar usuarios o clientes.
Route::resource('register', 'App\Http\Controllers\ClientesController');

//API para iniciar sesion.
Route::post('login', 'App\Http\Controllers\ClientesController@login');

//API para obtener informacion basica (resumida) de los libros.
Route::get('basic', 'App\Http\Controllers\LibrosController@getBasic');

Route::get('/posts', function () {
    $post = Libro::create([
        'id_libro' => 2,
        'isbn' => 'FGFG',
        'anio_publicacion' => '2008-08-08',
        'descripcion' => 'Alguna descripcion',
        'titulo' => 'Prueba',
        'precio_fisico' => 30.09,
        'precio_electronico' => 20.09,
        'tamanio' => '40mb',
        'fecha_impresion' => '2007-05-05',
        'lugar_impresion' => 'mexico'
    ]);
    return $post;
});

Route::get('/test', function () {
    return ['message' => 'hello'];
});

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 */