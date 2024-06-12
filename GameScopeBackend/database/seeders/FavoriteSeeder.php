<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\User;
use App\Models\VideoGame;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    public function run()
    {
        // Eliminar todos los registros de la tabla favorite_video_games
        Favorite::query()->delete();

        // Asegúrate de que existan usuarios y videojuegos antes de crear favoritos
        $users = User::all();
        $videoGames = VideoGame::all();

        foreach ($users as $user) {
            foreach ($videoGames->random(5) as $videoGame) {
                Favorite::create([
                    'user_id' => $user->id,
                    'video_game_id' => $videoGame->id,
                ]);
            }
        }
    }
}
