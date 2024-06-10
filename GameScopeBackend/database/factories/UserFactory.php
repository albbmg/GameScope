<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static $password;

    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'password' => self::$password ?? (self::$password = Hash::make('password')),
            'username' => fake()->userName(),
            'privacy_settings' => 'public',
            'role' => 'user',
            'profile_image' => fake()->imageUrl(640, 480, 'people', true),
            'remember_token' => Str::random(10),
        ];
    }
}
