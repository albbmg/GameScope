<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pending extends Model
{
    use HasFactory;

    protected $table = 'pending_video_games';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'video_game_id', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videoGame()
    {
        return $this->belongsTo(VideoGame::class, 'video_game_id');
    }
}