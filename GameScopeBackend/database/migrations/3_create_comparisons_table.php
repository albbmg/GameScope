<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comparisons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id1')->constrained('video_games');
            $table->foreignId('game_id2')->constrained('video_games');
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('comparisons');
    }
    
};
