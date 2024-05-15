<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoGame extends Model
{
    protected $table = 'video_games';

    public $timestamps = false; // Desactivar timestamps si no los deseas

    protected $fillable = [
        'name', 'developer', 'genre', 'platform', 'release_year'
    ];

    // Relación uno a muchos con Review
    public function reviews()
    {
        return $this->hasMany(Review::class, 'game_id');
    }

    // Relación muchos a muchos con Comparison
    public function comparisons1()
    {
        return $this->hasMany(Comparison::class, 'game_id1');
    }

    public function comparisons2()
    {
        return $this->hasMany(Comparison::class, 'game_id2');
    }
}

