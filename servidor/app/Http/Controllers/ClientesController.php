<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return DB::table('autores')->get();
        return DB::table('clientes')->select('clientes.nombre','clientes.apellidos','clientes.direccion','clientes.email',
        'clientes.telefono', 'localidades.nombre as localidad', 'provincias.nombre as provincia')
        ->join('localidades', 'localidades.id_localidad', '=', 'clientes.id_localidad')
        ->join('provincias', 'provincias.id_provincia', '=', 'localidades.id_provincia')
        ->get();
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
                'contrasena' => Crypt::encryptString($request->input('contrasena')),
                'id_localidad' => $id_localidad
            ));

            DB::table('cestas')->insertGetId(array(
                'fecha_compra' => NULL,
                'id_cliente' => $id_cliente
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
        ->select('id_cliente', 'nombre', 'email', 'contrasena')
        ->where('email', '=', $request->input('email'))
        //->where('contrasena', '=', Crypt::encryptString($request->input('contrasena')))
        ->get();
        if(($result[0]->email != '') && (Crypt::decryptString($result[0]->contrasena) == $request->input('contrasena')))
        {
            return response()->json([
            'id_cliente' => $result[0]->id_cliente,
            'nombre' => $result[0]->nombre, 
            'email' => $result[0]->email, 
            'success' => true, 
            'redirect' => '/main', 
            'status' => 'Cliente encontrado', 
            'status_code' => 1]);
        } else {
            return response()->json(['cliente' => '-1', 'email' => $request->input('email'),'redirect' => '/', 'status' => 'Error al iniciar sesion!', 'status_code' => -1]);
        }
    }
}
