<?php

namespace Database\Factories;

use App\Models\VideoGame;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoGameFactory extends Factory
{
    protected $model = VideoGame::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence,
            'developer' => $this->faker->company,
            'description' => $this->faker->sentence,
            'genre' => $this->faker->word,
            'platform' => $this->faker->randomElement(['PlayStation', 'Xbox', 'Nintendo', 'PC']),
            'release_year' => $this->faker->year,
            'image' => $this->faker->imageUrl(),
            'is_favorite' => $this->faker->boolean,
            'rating' => $this->faker->randomFloat(1, 0, 5),
            'graphics' => $this->faker->randomFloat(1, 0, 5),
            'gameplay' => $this->faker->randomFloat(1, 0, 5),
            'story' => $this->faker->randomFloat(1, 0, 5),
        ];
    }
}
