<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function add(Request $request)
    {
        $user = Auth::user();
        $gameId = $request->input('game_id');

        if (!$user->favorites()->where('video_game_id', $gameId)->exists()) {
            $user->favorites()->attach($gameId);
        }

        return response()->json(['message' => 'Juego añadido a favoritos']);
    }

    public function remove(Request $request)
    {
        $user = Auth::user();
        $gameId = $request->input('game_id');

        $user->favorites()->detach($gameId);

        return response()->json(['message' => 'Juego eliminado de favoritos']);
    }

    public function status(Request $request)
    {
        $user = Auth::user();
        $gameId = $request->input('game_id');

        $isFavorite = $user->favorites()->where('video_game_id', $gameId)->exists();

        return response()->json(['isFavorite' => $isFavorite]);
    }

    public function getFavorites()
    {
        $user = Auth::user();
        return response()->json($user->favorites()->get());
    }
}