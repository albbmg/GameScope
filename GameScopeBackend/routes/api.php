<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoGameController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ComparisonController;

Route::get('/video-games', [VideoGameController::class, 'index']);
Route::get('/video-games/{id}', [VideoGameController::class, 'show']);
Route::get('/search', [VideoGameController::class, 'search']);
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/{id}', [ReviewController::class, 'show']);

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum')->name('user');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/video-games', [VideoGameController::class, 'store']);
    Route::put('/video-games/{id}', [VideoGameController::class, 'update']);
    Route::delete('/video-games/{id}', [VideoGameController::class, 'destroy']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::post('/comparisons', [ComparisonController::class, 'store']);
    Route::put('/comparisons/{id}', [ComparisonController::class, 'update']);
    Route::delete('/comparisons/{id}', [ComparisonController::class, 'destroy']);
});
