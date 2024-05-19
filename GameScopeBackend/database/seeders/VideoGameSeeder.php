<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VideoGame;

class VideoGameSeeder extends Seeder
{
    public function run()
    {
        VideoGame::factory()->count(100)->create();
    }
}
