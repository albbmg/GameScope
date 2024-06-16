<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    use HasFactory;
    protected $table = 'comparisons';

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'game_id1', 'game_id2', 'details'
    ];

    public function game1()
    {
        return $this->belongsTo(VideoGame::class, 'game_id1');
    }

    public function game2()
    {
        return $this->belongsTo(VideoGame::class, 'game_id2');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}