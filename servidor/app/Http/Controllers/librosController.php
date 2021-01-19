<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 
use App\Libro

class librosController extends Controller
{
    public function index() {
        $libros = DB::table('Libros')->get();
        print_r($libros);
    }
    public function addLibro(Request $request){
        
    }
}
