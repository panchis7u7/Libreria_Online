<?php

namespace Database\Factories;

use App\Models\Libro;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LibroFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Libro::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'isbn' => $this->faker->unique()->regexify('[A-Za-z0-9]{15}'),
            'anio_publicacion' => $this->faker->date('Y-m-d','now'),
            'descripcion'=> Str::random(20),
            'titulo' => Str::random(20),
            'precio_fisico' => $this->faker->randomFloat(3, 0, 1000),
            'precio_electronico' => $this->faker->randomFloat(3, 0, 1000),
            'tamanio' => Str::random(4),
            'fecha_impresion' => $this->faker->date('Y-m-d','now'),
            'lugar_impresion' => $this->faker->regexify('[A-Za-z0-9]{10}'),
        ];
    }
}
