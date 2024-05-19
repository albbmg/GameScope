<?php

namespace Database\Factories;

use App\Models\Comparison;
use App\Models\VideoGame;
use Illuminate\Database\Eloquent\Factories\Factory;

class ComparisonFactory extends Factory
{
    protected $model = Comparison::class;

    public function definition()
    {
        return [
            'game_id1' => VideoGame::factory(),
            'game_id2' => VideoGame::factory(),
            'details' => $this->faker->sentence,
        ];
    }
}
