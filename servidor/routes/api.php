<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Libro;

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

Route::resource('libros', 'App\Http\Controllers\LibrosController');

Route::get('/basic', 'App\Http\Controllers\LibrosController@getBasic');

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