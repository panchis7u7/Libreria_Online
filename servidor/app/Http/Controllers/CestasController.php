<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CestasController extends Controller
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

            $id_cliente = DB::table('clientes')->insertGetId(array(
            'nombre' => $request->input('nombre'),
            'apellidos' => $request->input('apellidos'),
            'direccion' => $request->input('direccion'),
            'email' => $request->input('email'),
            'telefono' => $request->input('telefono'),
            'contrasena' => Crypt::encryptString($request->input('contrasena')),
            'id_localidad' => $id_localidad
            ));

            DB::commit();
            return response()->json(['id_cliente' => $id_cliente, 'status' => 'Insercion Exitosa!', 'redirect' => '/main', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_cliente' => '-1', 'status' => 'Insercion Fallida!', 'redirect' => '/main', 'status_code' => '-1', 'error' => $e]);
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
