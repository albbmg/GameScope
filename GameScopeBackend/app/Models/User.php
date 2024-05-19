<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'username', 'email', 'password', 'privacy_settings', 'role'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function comparisons()
    {
        return $this->hasMany(Comparison::class);
    }

    protected $casts = [
        'creation_date' => 'datetime',
    ];
}
