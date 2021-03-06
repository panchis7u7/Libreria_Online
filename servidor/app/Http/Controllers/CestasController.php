<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CestasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('cestas')
        ->select('cestas.id_cesta', 'libros.*')
        ->join('cesta_contiene_libro as c', 'c.id_cesta', '=', 'cestas.id_cesta')
        ->join('libros', 'libros.id_libro', '=', 'c.id_libro')
        ->whereNotNull('cestas.fecha_compra')
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

            $id_cliente = DB::table('clientes')
            ->select('id_cliente')
            ->where('email', '=', $request->input('email'))
            ->get();

            $cestas = DB::table('cestas')
            ->select('id_cesta')
            ->whereNull('cestas.fecha_compra')
            ->where('cestas.id_cliente', '=', $id_cliente[0]->id_cliente)
            ->get();

            DB::table('cestas')
            ->where('id_cesta',$cestas[0]->id_cesta)
            ->update(array(
                'fecha_compra' => $request->input('fecha_compra')
            ));

            $id_cesta = DB::table('cestas')->insertGetId(array(
                'id_cliente' => $id_cliente[0]->id_cliente,
            ));

            DB::commit();
            return response()->json(['id_cesta' => $id_cesta[0]->id_cesta, 'tipo' => 'success', 'status' => 'Compra exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_cesta' => '-1', 'tipo' => 'danger', 'status' => 'Actualizacion Fallida!', 'status_code' => '-1', 'error' => $e]);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function carrito(Request $request)
    {
        DB::beginTransaction();
        try {

            $id_cesta = DB::table('cestas')
            ->select('cestas.id_cesta')
            ->join('clientes', 'clientes.id_cliente', '=', 'cestas.id_cliente')
            ->whereNull('fecha_compra')
            ->where('email', '=', $request->input('email'))
            ->get();

            DB::table('cesta_contiene_libro')->insert(array(
                'id_cesta' => $id_cesta[0]->id_cesta,
                'id_libro' => $request->input('id_libro'),
                'cantidad' => $request->input('cantidad'),
                'tipo' => $request->input('tipo')
            ));

            DB::commit();
            return response()->json(['id_cesta' => $id_cesta, 'tipo' => 'success', 'status' => 'Libro añadido al carrito!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_cesta' => $id_cesta, 'tipo' => 'danger', 'status' => 'Error!, no se añadio el libro', 'status_code' => '-1', 'error' => $e]);
        }
    }

    public function getCarrito(Request $request)
    {
        return DB::table('libros')
        ->select('libros.*', 'autores.nombre', 'autores.apellidos', 'c.id_cesta', 'c.id_libro', 'c.tipo')
        ->join('autor_escribe_libro as a', 'a.id_libro', '=', 'libros.id_libro')
        ->join('autores', 'autores.id_autor', '=', 'a.id_autor')
        ->join('cesta_contiene_libro as c', 'c.id_libro', '=', 'libros.id_libro')
        ->join('cestas', 'cestas.id_cesta', '=', 'c.id_cesta')
        ->join('clientes', 'clientes.id_cliente', '=', 'cestas.id_cliente')
        ->where('clientes.email', '=', $request->input('email'))
        ->whereNull('cestas.fecha_compra')
        ->get();
    }

    public function getHistorial(Request $request){

        try {
            $id_cliente = DB::table('clientes')
            ->select('id_cliente')
            ->where('email', '=', $request->input('email'))
            ->get();

            $cestas = DB::table('cestas')
            ->select('id_cesta', 'fecha_compra')
            ->whereNotNull('cestas.fecha_compra')
            ->where('cestas.id_cliente', '=', $id_cliente[0]->id_cliente)
            ->get();
            
            $libros_cesta = DB::table('cestas')
            ->select('cestas.id_cesta', 'libros.*')
            ->join('cesta_contiene_libro as c', 'c.id_cesta', '=', 'cestas.id_cesta')
            ->join('libros', 'libros.id_libro', '=', 'c.id_libro')
            ->whereNotNull('cestas.fecha_compra')
            ->where('cestas.id_cliente', '=', $id_cliente[0]->id_cliente)
            ->get();
            
            return response()->json(['cestas' => $cestas, 'libros' => $libros_cesta, 'status' => 'Historial Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['status' => 'Historial Fallido!', 'status_code' => '-1', 'cestas' => $cestas[0]->id_cesta, 'error' => $e]);
        }
    }

    public function removerLibro(Request $request){
        try {
            DB::table('cesta_contiene_libro')
            ->where('id_cesta', '=', $request->input('id_cesta'))
            ->where('id_libro', '=', $request->input('id_libro'))
            ->delete();

            return response()->json(['id_libro' => $request->input('id_libro'), 'tipo' =>'success', 'status' => 'Eliminacion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e) {
            return response()->json(['id_libro' => '-1', 'tipo' =>'danger', 'status' => 'Eliminacion Fallida!', 'status_code' => '-1', 'error' => $e]);
        }
    }
}
