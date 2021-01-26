<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Libro;
use App\Models\Editor;
use App\Models\Autor;
use App\Models\Almacen;
use App\Models\Cliente;
use App\Models\Carrito;

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

//API para Editoriales GET, POST, UPDATE
Route::resource('editoriales', 'App\Http\Controllers\EditorialesController');

//API para Autores GET, POST, UPDATE
Route::resource('autores', 'App\Http\Controllers\AutoresController');

//API para Almacenes GET, POST, UPDATE
Route::resource('almacenes', 'App\Http\Controllers\AlmacenesController');

//API para registrar usuarios o clientes.
Route::resource('clientes', 'App\Http\Controllers\ClientesController');

//Api para iniciar session.
Route::post('login', 'App\Http\Controllers\ClientesController@login');

//API para registrar las cestas.
Route::resource('cestas', 'App\Http\Controllers\CestasController');

//API para insertar libros al carrito.
Route::post('carrito', 'App\Http\Controllers\CestasController@carrito');

//API para obtener informacion de los libros en base al usuario.
Route::post('getCarritos', 'App\Http\Controllers\CestasController@getCarrito');