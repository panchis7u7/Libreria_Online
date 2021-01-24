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

            $id_provincia = DB::table('provincias')->insertGetId(array(
                'nombre' => $request->input('provincia')
            ));

            $id_localidad = DB::table('localidades')->insertGetId(array(
                'nombre' => $request->input('localidad'),
                'id_provincia' => $id_provincia
            ));

            $id_cliente = DB::table('clientes')->insertGetId(array(
            'nombre' => $request->input('nombre'),
            'apellidos' => $request->input('apellidos'),
            'direccion' => $request->input('direccion'),
            'email' => $request->input('email'),
            'telefono' => $request->input('telefono'),
            'contrasena' => Crypt::encrypt($request->input('contrasena')),
            'id_localidad' => $id_localidad
            ));

            DB::commit();
            return response()->json(['id_cliente' => $id_cliente, 'status' => 'Insercion Exitosa!', 'redirect' => 'http://localhost:3000/main', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_cliente' => '-1', 'status' => 'Insercion Fallida!', 'redirect' => 'http://localhost:3000/error', 'status_code' => '-1', 'error' => $e, 'id_provincia' => $id_provincia]);
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
        $result = DB::table('clientes')
        ->select('id_cliente')
        ->where('contrasena', '=', $request->input('password'))
        ->delete();
        if($result == ''){
            return response()->json(['id_cliente' => '-1', 'status' => 'Cliente no encontrado', 'status_code' => '-1']);
        } else {
            return response()->json(['id_cliente' => $result, 'status' => 'Cliente encontrado', 'status_code' => '1']);
        }
    }
}
