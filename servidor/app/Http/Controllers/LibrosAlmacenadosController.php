<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LibrosAlmacenadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('autores')
        ->select('libros.*', 'a.stock', 'autores.*')
        ->join('autor_escribe_libro as aut', 'aut.id_autor','=', 'autores.id_autor')
        ->join('libros', 'libros.id_libro', '=', 'aut.id_libro')
        ->join('almacen_almacena_libro as a', 'a.id_libro', '=', 'libros.id_libro')
        ->join('almacenes', 'almacenes.id_almacen', '=', 'a.id_almacen')
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

            DB::table('almacen_almacena_libro')->insert(array(
                'id_almacen' => $request->input('id_almacen'),
                'id_libro' => $request->input('id_libro'),
                'stock' => $request->input('stock')
            ));

            DB::commit();
            return response()->json(['status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['status' => 'Insercion Fallida!', 'status_code' => '-1', 'error' => $e]);
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
        return DB::table('autores')
        ->select('libros.*', 'a.stock', 'autores.*')
        ->join('autor_escribe_libro as aut', 'aut.id_autor','=', 'autores.id_autor')
        ->join('libros', 'libros.id_libro', '=', 'aut.id_libro')
        ->join('almacen_almacena_libro as a', 'a.id_libro', '=', 'libros.id_libro')
        ->join('almacenes', 'almacenes.id_almacen', '=', 'a.id_almacen')
        ->where('almacenes.id_almacen', '=', $id)
        ->get();
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
