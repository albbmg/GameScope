<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('video_games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('developer');
            $table->string('genre');
            $table->string('platform');
            $table->year('release_year');
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('video_games');
    }
};
