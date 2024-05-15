<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    public $timestamps = false; // Desactivar timestamps si no los deseas

    protected $fillable = [
        'username', 'email', 'password', 'privacy_settings', 'role'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    // Relación uno a muchos con Review
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    protected $casts = [
        'creation_date' => 'datetime',
    ];
}
