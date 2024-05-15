<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';

    public $timestamps = false; // Desactivar timestamps si no los deseas

    protected $fillable = [
        'user_id', 'game_id', 'text', 'rating', 'publication_date'
    ];

    // Relación inversa con User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación inversa con VideoGame
    public function game()
    {
        return $this->belongsTo(VideoGame::class, 'game_id');
    }

    protected $casts = [
        'publication_date' => 'datetime',
    ];
}
