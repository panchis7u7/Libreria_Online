<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models\Cliente;
use Illuminate\Support\Facades\Crypt;

class ClientesController extends Controller
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
            $id_autor = DB::table('clientes')->insertGetId(array(
            'nombre' => $request->input('nombre'),
            'apellidos' => $request->input('apellidos'),
            'direccion' => $request->input('direccion'),
            'email' => $request->input('email'),
            'telefono' => $request->input('telefono'),
            'contrasena' => Crypt::encrypt($request->input('contrasena')),
            'url' => $request->input('url'),
            'id_localidad' => $id_localidad
            ));

            DB::commit();
            return response()->json(['id_autor' => $id_autor, 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_autor' => '-1', 'status' => 'Insercion Fallida!', 'status_code' => '-1', 'error' => $e, 'id_provincia' => $id_provincia]);
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

    ////////////////////////////////////////////////
    //                 Consultas                  //
    ////////////////////////////////////////////////

    /**
     * Store a password for the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){
        try {
            DB::table('clientes')
            ->where('id_autor',$id)
            ->delete();
            return response()->json(['id_autores' => $id, 'status' => 'Eliminacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            return response()->json(['id_autores' => '-1', 'status' => 'Eliminacion Fallida!', 'status_code' => '-1', 'error' => $e, 'id' => $id]);
        }
    }
}
