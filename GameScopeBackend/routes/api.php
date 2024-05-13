<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoGameController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ComparisonController;
use App\Http\Controllers\AdministratorController;

Route::apiResource('users', UserController::class);
Route::apiResource('videogames', VideoGameController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('comparisons', ComparisonController::class);
Route::apiResource('administrators', AdministratorController::class);
