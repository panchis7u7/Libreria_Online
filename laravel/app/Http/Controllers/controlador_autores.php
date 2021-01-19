<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Autor;

class controlador_autores extends Controller
{
    public function getAutores(){
        $autores = Autor::all();
        print_r($autores);
    }
    public function nuevoAutor(Request $request){
        

        $autor = Autor::create([
            'nombre' => $request['nombre'],
            'apellidos' => $request['apellidos'],
            'direccion' => $request['direccion'],
            'localidad' => $request['localidad'],
            'provincia' => $request['provincia'],
            'url' => $request['url'],
            'telefono' => $request['telefono'],
            'alerta' => $request['alerta'],
            'msgAlerta' => $request['msgAlerta'],
            'tipoAlerta'=> $request['tipoAlerta'],
        ]
        );
        echo "1";
    }
    
    public function editAutor($id, Request $req){
        $autor = Autor::find($id);
        $autor->nombre = $req['nombre'];
        $autor->apellidos = $req['apellidos'];
        $autor->direccion = $req['direccion'];
        $autor->localidad = $req['localidad'];
        $autor->provincia = $req['provincia'];
        $autor->url = $req['url'];
        $autor->telefono = $req['telefono'];
        $autor->alerta = $req['alerta'];
        $autor->msgAlerta = $req['msgAlerta'];
        $autor->tipoAlerta = $req['tipoAlerta'];
        $autor->save(); 
        
    }
    public function borrar($id){
        $autor = Autor::find($id);
        $autor->delete();
    }
}
