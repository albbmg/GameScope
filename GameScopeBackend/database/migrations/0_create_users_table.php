<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); 
            $table->string('last_name');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('username')->nullable();
            $table->string('privacy_settings')->nullable();
            $table->string('role')->default('user');
            $table->timestamps();
            $table->rememberToken();
        });
    }

    public function down() {
        Schema::dropIfExists('users');
    }
};
