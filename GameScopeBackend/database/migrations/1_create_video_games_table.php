<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('video_games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('developer');
            $table->text('description');
            $table->string('genre');
            $table->string('platform');
            $table->year('release_year');
            $table->string('image')->nullable();
            $table->decimal('graphics', 3, 1)->default(0); 
            $table->decimal('gameplay', 3, 1)->default(0); 
            $table->decimal('story', 3, 1)->default(0); 
            $table->boolean('is_favorite')->default(false); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('video_games');
        Schema::enableForeignKeyConstraints();
    }
};
