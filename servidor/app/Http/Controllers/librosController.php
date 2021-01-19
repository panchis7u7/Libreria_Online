<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 

class librosController extends Controller
{
    public function index() {
        $libros = DB::table('Libros')->get();
        print_r($libros);
    }
}
