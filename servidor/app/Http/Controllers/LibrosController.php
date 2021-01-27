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
        return DB::table('autores')
        ->select('libros.*', 'autores.id_autor', 'autores.nombre as autor', 'generos.genero', 'editoriales.id_editorial', 'editoriales.nombre as editorial')
        ->join('autor_escribe_libro as e', 'e.id_autor', '=', 'autores.id_autor')
        ->join('libros', 'libros.id_libro', '=', 'e.id_libro')
        ->join('generos', 'generos.id_genero', '=', 'libros.id_genero')
        ->join('editorial_publica_libro as p', 'p.id_libro', '=', 'libros.id_libro')
        ->join('editoriales', 'editoriales.id_editorial', '=', 'p.id_editorial')
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

            $id_genero = DB::table('generos')
            ->select('id_genero')
            ->where('genero', '=', $request->input('categoria'))
            ->get();

            $id_libro = DB::table('libros')->insertGetId(array(
                'isbn' => $request->input('isbn'),
                'anio_publicacion' => $request->input('anio_publicacion'),
                'descripcion' => $request->input('descripcion'),
                'titulo' => $request->input('titulo'),
                'precio_fisico' => $request->input('precio_fisico'),
                'precio_electronico' => $request->input('precio_electronico'),
                'tamanio' => $request->input('tamanio'),
                'fecha_impresion' => $request->input('fecha_impresion'),
                'lugar_impresion' => $request->input('lugar_impresion'),
                'url' => $request->input('portada_url'),
                'id_genero' => $id_genero[0]->id_genero
            ));

            $id_autor = DB::table('autores')
            ->select('id_autor')
            ->where('nombre', '=', $request->input('autor'))
            ->get();

            $id_editorial = DB::table('editoriales')
            ->select('id_editorial')
            ->where('nombre', '=', $request->input('editorial'))
            ->get();

            DB::table('autor_escribe_libro')
            ->insert(array(
                'id_autor' => $id_autor[0]->id_autor,
                'id_libro' => $id_libro
            ));

            DB::table('editorial_publica_libro')
            ->insert(array(
                'id_editorial' => $id_editorial[0]->id_editorial,
                'id_libro' => $id_libro
            ));

            DB::commit();
            return response()->json(['id_libro' => $id_libro, 'tipo' =>'success', 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_libro' => '-1', 'tipo' =>'danger', 'status' => 'Insercion Fallida!', 'status_code' => '-1', 'Error: ' => $e]);
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
        return DB::table('libros')
        ->join('autor_escribe_libro', 'autor_escribe_libro.id_libro', '=', 'libros.id_libro')
        ->join('autores', 'autores.id_autor', '=', 'autor_escribe_libro.id_autor')
        ->where('autores.id_autor', '=', $id)
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
        DB::beginTransaction();
        try {

            $id_genero = DB::table('generos')
            ->select('id_genero')
            ->where('genero', '=', $request->input('categoria'))
            ->get();

            DB::table('libros')
            ->where('id_libro',$id)
            ->update(array(
                'isbn' => $request->input('isbn'),
                'anio_publicacion' => $request->input('anio_publicacion'),
                'descripcion' => $request->input('descripcion'),
                'titulo' => $request->input('titulo'),
                'precio_fisico' => $request->input('precio_fisico'),
                'precio_electronico' => $request->input('precio_electronico'),
                'tamanio' => $request->input('tamanio'),
                'fecha_impresion' => $request->input('fecha_impresion'),
                'lugar_impresion' => $request->input('lugar_impresion'),
                'url' => $request->input('portada_url'),
                'id_genero' => $id_genero[0]->id_genero
            ));
            DB::commit();
            return response()->json(['id_libro' => $id, 'tipo' =>'success', 'status' => 'Actualizacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_libro' => '-1', 'tipo' =>'danger', 'status' => 'Actualizacion Fallida!', 'status_code' => '-1', 'error' => $e, 'id' => $id]);
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
            DB::table('libros')
            ->where('id_libro',$id)
            ->delete();

            DB::commit();
            return response()->json(['id_libro' => $id, 'tipo' =>'danger', 'status' => 'Eliminacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_libro' => '-1', 'tipo' =>'danger', 'status' => 'Eliminacion Fallida!', 'status_code' => '-1', 'error' => $e, 'id' => $id]);
        }
    }

    ////////////////////////////////////////////////
    //                 Consultas                  //
    ////////////////////////////////////////////////

    public function getBasic(){
        return DB::table('libros')->select('titulo', 'precio_fisico', 'url')->get();
    }
}
