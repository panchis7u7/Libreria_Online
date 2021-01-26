<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlmacenesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('almacenes')
        ->select('almacenes.*', 'localidades.nombre as localidad', 'provincias.nombre as provincia')
        ->join('localidades', 'localidades.id_localidad', '=', 'almacenes.id_localidad')
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

            $id_almacen = DB::table('almacenes')->insertGetId(array(
            'nombre' => $request->input('nombre'),
            'direccion' => $request->input('direccion'),
            'telefono' => $request->input('telefono'),
            'id_localidad' => $id_localidad
            ));

            DB::commit();
            return response()->json(['id_almacen' => $id_almacen, 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_almacen' => '-1', 'status' => 'Insercion Fallida!', 'status_code' => '-1', 'error' => $e, 'id_provincia' => $id_provincia]);
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
        DB::beginTransaction();
        try {
            DB::table('almacenes')
            ->where('id_almacen',$id)
            ->update(array(
                'nombre' => $request->input('nombre'),
                'direccion' => $request->input('direccion'),
                'telefono' => $request->input('telefono'),
            ));

            DB::table('localidades')
            ->where('id_localidad',$request->input('id_localidad'))
            ->update(array(
                'nombre' => $request->input('localidad')
            ));

            DB::commit();
            return response()->json(['id_autor' => $id, 'status' => 'Actualizacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_autor' => '-1', 'status' => 'Actualizacion Fallida!', 'status_code' => '-1', 'error' => $e, 'id' => $id]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            DB::table('almacenes')
            ->where('id_almacen',$id)
            ->delete();

            DB::commit();
            return response()->json(['id_almacen' => $id, 'status' => 'Eliminacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_almacen' => '-1', 'status' => 'Eliminacion Fallida!', 'status_code' => '-1', 'error' => $e, 'id' => $id]);
        }
    }
}
