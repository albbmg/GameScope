<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Eliminar todos los registros de la tabla users y restablecer la clave primaria
        User::query()->delete();

        // Crear nuevos registros
        User::factory()->count(10)->create();
    }
}
