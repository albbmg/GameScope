<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use App\Models\VideoGame;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition()
    {
        return [
            'game_id' => VideoGame::factory(),
            'user_id' => User::factory(),
            'text' => $this->faker->paragraph,
            'rating' => $this->faker->randomFloat(1, 0, 5),
        ];
    }
}
