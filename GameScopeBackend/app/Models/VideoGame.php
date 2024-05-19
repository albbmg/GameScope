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
        'name', 'description', 'developer', 'genre', 'platform', 'release_year', 'image', 'rating', 'graphics', 'gameplay', 'story'
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
}
