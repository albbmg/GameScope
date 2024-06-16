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
        $users = User::all();

        $games = VideoGame::all();

        if ($users->isEmpty() || $games->isEmpty()) {
            throw new \Exception('No users or games found in the database. Please run the UserSeeder and VideoGameSeeder first.');
        }

        foreach ($games as $game) {
            $numReviews = rand(1, 5);
            for ($i = 0; $i < $numReviews; $i++) {
                $user = $users->random();
                Review::create([
                    'game_id' => $game->id,
                    'user_id' => $user->id,
                    'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    'rating' => rand(1, 5),
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }
    }
}
