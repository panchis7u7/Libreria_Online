<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Autor;
use Illuminate\Support\Facades\DB;

class AutoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $id_provincia = DB::table('provincias')->insertGetId(array(
                'nombre' => $request->input('localidad')
            ));

            $id_localidad = DB::table('localidades')->insertGetId(array(
                'nombre' => $request->input('provincia'),
                'id_provincia' => $request->input($id_provincia)
            ));

            $id_autor = DB::table('autores')->insertGetId(array('nombre' => $request->input('nombre'),
            'apellidos' => $request->input('apellidos'),
            'direccion' => $request->input('direccion'),
            'email' => $request->input('email'),
            'telefono' => $request->input('telefono'),
            'url' => $request->input('url'),
            'id_localidad' => $request->input($id_localidad)
            ));

            DB::commit();
            return response()->json(['id_autor' => $id_autor, 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_autor' => '-1', 'status' => 'Insercion Fallida!', 'status_code' => '-1']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
