<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;
use Illuminate\Support\Facades\DB;

class LibrosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return Libro::all();
        return DB::table('libros')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $id = DB::table('libros')->insertGetId(array('isbn' => $request->input('isbn'),
            'anio_publicacion' => $request->input('anio_publicacion'),
            'descripcion' => $request->input('descripcion'),
            'titulo' => $request->input('titulo'),
            'precio_fisico' => $request->input('precio_fisico'),
            'precio_electronico' => $request->input('precio_electronico'),
            'tamanio' => $request->input('tamanio'),
            'fecha_impresion' => $request->input('fecha_impresion'),
            'lugar_impresion' => $request->input('lugar_impresion'),
            'portada' => $request->input('url')));
            DB::commit();
            return response()->json(['id_libro' => $id, 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_libro' => '-1', 'status' => 'Insercion Fallida!', 'status_code' => '-1']);
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
    //                 Consultas
    ////////////////////////////////////////////////

    public function getBasic(){
        return DB::table('libros')->select('titulo', 'precio_fisico', 'url')->get();
    }
}
