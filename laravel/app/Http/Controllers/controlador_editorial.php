<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Editorial;

class controlador_editorial extends Controller
{
    public function getEditorial(){
        $editorial = Editorial::all();
        print_r($editorial);
    }
    public function nuevaEditorial(Request $request){
        

        $editorial = Editorial::create([
            'nombre' => $request['nombre'],
            'direccion' => $request['direccion'],
            'provincia' => $request['provincia'],
            'url' => $request['url'],
            'alerta' => $request['alerta'],
            'msgAlerta' => $request['msgAlerta'],
            'tipoAlerta' => $request['tipoAlerta'],
            'telefono' => $request['telefono'],   
        ]
       
        );
        echo "1";
    }
    
    public function editEditorial($id, Request $req){
        $editorial = Editorial::find($id);
        $editorial->nombre = $req['nombre'];
        $editorial->direccion = $req['direccion'];
        $editorial->provincia = $req['provincia']
        $editorial->url = $req['url']
        $editorial->alerta = $req['alerta']
        $editorial->msgAlerta = $req['msgAlerta']
        $editorial->tipoAlerta = $req['tipoAlerta']
        $editorial->telefono = $req['telefono']
        $editorial->save(); 
        
    }
    public function borrarEditorial($id){
        $editorial = Editorial::find($id);
        $editorial->delete();
    }
}
