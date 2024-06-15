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
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => self::$password ?? (self::$password = Hash::make('password')),
            'username' => $this->faker->userName(),
            'privacy_settings' => 'public',
            'role' => 'user',
            'profile_image' => $this->faker->imageUrl(640, 480, 'people', true),
            'remember_token' => Str::random(10),
        ];
    }
}
