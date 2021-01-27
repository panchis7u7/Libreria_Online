<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenerosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('generos')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($categoria)
    {
        return DB::table('libros')
        ->select('libros.*', 'editoriales.nombre', 'autores.nombre')
        ->join('autor_escribe_libro as aut', 'aut.id_libro','=', 'libros.id_libro')
        ->join('autores','autores.id_autor','=','aut.id_autor')
        ->join('editorial_publica_libro as edi', 'edi.id_libro', '=', 'libros.id_libro')
        ->join('editoriales','editoriales.id_editorial','=','edi.id_editorial')
        ->join('generos', 'generos.id_genero', '=', 'libros.id_genero')
        ->where('generos.genero', '=', $categoria)
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
