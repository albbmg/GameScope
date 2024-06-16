<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoGame extends Model
{
    use HasFactory;

    protected $table = 'video_games';

    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'developer', 'genre', 'platform', 'release_year', 'image', 'graphics', 'gameplay', 'story'
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class, 'game_id');
    }

    public function comparisons1()
    {
        return $this->hasMany(Comparison::class, 'game_id1');
    }

    public function comparisons2()
    {
        return $this->hasMany(Comparison::class, 'game_id2');
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorite_video_games', 'video_game_id', 'user_id');
    }
}