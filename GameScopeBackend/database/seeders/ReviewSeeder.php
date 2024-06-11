<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\VideoGame;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        // Obtener el primer usuario creado
        $user = User::first();
        
        // Obtener el primer videojuego creado
        $game = VideoGame::first();

        if ($user && $game) {
            Review::create([
                'game_id' => $game->id, // Usar el ID del primer juego
                'user_id' => $user->id, // Usar el ID del primer usuario
                'content' => 'Quos consequuntur et exercitationem ex. Aut repellat et sit sed animi. Iste vero voluptatibus tempora id dolore.',
                'rating' => 1.8,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        } else {
            // Lanzar una excepción si no hay usuarios o juegos creados
            throw new \Exception('No users or games found in the database. Please run the UserSeeder and VideoGameSeeder first.');
        }
    }
}
