<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoGameController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ComparisonController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PendingController;

Route::get('/video-games', [VideoGameController::class, 'index']);
Route::get('/video-games/{id}', [VideoGameController::class, 'show']);
Route::get('/search', [VideoGameController::class, 'search']);
Route::get('/filters', [VideoGameController::class, 'getFilters']); // Nueva ruta
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

    Route::post('/favorites/add', [FavoriteController::class, 'add']);
    Route::post('/favorites/remove', [FavoriteController::class, 'remove']);
    Route::get('/favorites/status', [FavoriteController::class, 'status']);

    Route::post('/pending/add', [PendingController::class, 'add']);
    Route::post('/pending/remove', [PendingController::class, 'remove']);
    Route::get('/pending/status', [PendingController::class, 'status']);

    Route::get('/user/profile', [UserController::class, 'getProfile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::post('/user/profile-image', [UserController::class, 'uploadProfileImage']);

    Route::post('/video-games/rate', [VideoGameController::class, 'rate']);

    Route::get('/favorites', [FavoriteController::class, 'getFavorites']); 
    Route::get('/pending', [VideoGameController::class, 'getPendingGames']);

    Route::get('/user-reviews', [ReviewController::class, 'getUserReviews']);

    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
