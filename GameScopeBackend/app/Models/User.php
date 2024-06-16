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
        'first_name', 'last_name', 'phone', 'email', 'password', 'privacy_settings', 'role', 'profile_image'
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

    public function favorites()
    {
        return $this->belongsToMany(VideoGame::class, 'favorite_video_games', 'user_id', 'video_game_id');
    }

    public function pending()
    {
        return $this->belongsToMany(VideoGame::class, 'pending_video_games');
    }

    protected $casts = [
        'creation_date' => 'datetime',
    ];

    public function getProfileImageAttribute($value)
    {
        if ($value) {
            return asset('storage/' . $value);
        } else {
            return asset('images/trabajo-fin-de-master-gamescope.png');
        }
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}