<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libro;

class controlador_libros extends Controller
{
    public function getLibro(){
        $libros = Libro::all();
        print_r($libros);
    }
    public function nuevolibro(Request $request){
        

        $libros = Libro::create([
            'isbn' => $request['isbn'],
            'anio_publicacion' => $request['anio_publicacion'],
            'descripcion' => $request['descripcion'],
            'titulo' => $request['titulo'],
            'precio_fisico' => $request['precio_electronico'],
            'tamanio' => $request['tamanio'],
            'fecha_impresion' => $request['fecha_impresion'],
            'lugar_impresion' => $request['lugar_impresion'],   
        ]
        );
        echo "1";
    }
    
    public function editLibro($id, Request $req){
        $libros = Libro::find($id);
        $libros->isbn = $req['isbn'];
        $libros->anio_publicacion = $req['anio_publicacion'];
        $libros->descripcion = $req['descripcion']
        $libros->titulo = $req['titulo']
        $libros->precio_fisico = $req['precio_fisico']
        $libros->tamanio = $req['tamanio']
        $libros->fecha_impresion = $req['fecha_impresion']
        $libros->lugar_impresion = $req['lugar_impresion']
        $libros->save(); 
        
    }
    public function borrarLibro($id){
        $libros = Libro::find($id);
        $libros->delete();
    }
}
