<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::query()->delete();

        User::create([
            'first_name' => 'Usuario',
            'last_name' => 'Usuario',
            'phone' => '123456789',
            'email' => 'usuario@usuario.com',
            'password' => bcrypt('usuario'),
            'username' => 'usuario',
            'privacy_settings' => 'public',
            'role' => 'user',
            'profile_image' => 'profile_images/trabajo-fin-de-master-gamescope.png',
            'remember_token' => \Str::random(10),
        ]);

        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'phone' => '987654321',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin'),
            'username' => 'admin',
            'privacy_settings' => 'public',
            'role' => 'admin',
            'profile_image' => 'profile_images/trabajo-fin-de-master-gamescope.png',
            'remember_token' => \Str::random(10),
        ]);

        User::factory()->count(10)->create([
            'profile_image' => '/assets/images/trabajo-fin-de-master-gamescope.png',
        ]);
    }
}
