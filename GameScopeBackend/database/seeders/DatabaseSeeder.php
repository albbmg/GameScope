<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            VideoGameSeeder::class,
            ReviewSeeder::class,
            ComparisonSeeder::class,
            FavoriteSeeder::class
        ]);
        
        User::factory()->create([
            'username' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
