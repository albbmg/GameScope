<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    protected $table = 'comparisons';

    public $timestamps = false; // Desactivar timestamps si no los deseas

    protected $fillable = [
        'game_id1', 'game_id2', 'details'
    ];

    // Relación muchos a uno con VideoGame
    public function game1()
    {
        return $this->belongsTo(VideoGame::class, 'game_id1');
    }

    public function game2()
    {
        return $this->belongsTo(VideoGame::class, 'game_id2');
    }
}

