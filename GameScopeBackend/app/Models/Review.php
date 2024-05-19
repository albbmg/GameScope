<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    
    protected $table = 'reviews';

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'game_id', 'text', 'rating', 'publication_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(VideoGame::class, 'game_id');
    }

    protected $casts = [
        'publication_date' => 'datetime',
    ];
}
