<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    public $timestamps = true;

    protected $fillable = [
        'user_id', 'game_id', 'content', 'rating'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videoGame()
    {
        return $this->belongsTo(VideoGame::class, 'game_id');
    }
}