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

            $id_cesta = DB::table('cestas')->select('cestas.id_cesta')
            ->join('clientes', 'clientes.id_cliente', '=', 'cestas.id_cliente')
            ->whereNull('fecha_compra')
            ->where('email', '=', $request->input('email'))
            ->get();

            DB::table('cesta_contiene_libro')->insert(array(
                'id_cesta' => $id_cesta[0]->id_cesta,
                'id_libro' => $request->input('id_libro'),
                'cantidad' => $request->input('cantidad'),
            ));

            DB::commit();
            return response()->json(['id_cesta' => $id_cesta, 'status' => 'Insercion Exitosa!', 'status_code' => '1']);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json(['id_cesta' => $id_cesta, 'status' => 'Insercion Fallida!', 'status_code' => '-1', 'error' => $e]);
        }
    }

    public function getcCarrito(Request $request)
    {
        return DB::table('libros')
        ->select('libros.*')
        ->join('cesta_contiene_libro', 'cesta_contiene_libro.id_libro', '=', 'libros.id_libro')
        ->join('cestas', 'cestas.id_cesta', '=', 'cesta_contiene_libro.id_cesta')
        ->join('clientes', 'clientes.id_cliente', '=', 'cestas.id_cliente')
        ->where('email', '=', $request->input('email'))
        ->get();
    }
}
