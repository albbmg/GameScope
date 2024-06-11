<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer|exists:video_games,id',
        ]);

        $favorite = Favorite::create([
            'user_id' => Auth::id(),
            'game_id' => $request->game_id,
        ]);

        return response()->json(['message' => 'Added to favorites'], 200);
    }

    public function remove(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer|exists:video_games,id',
        ]);

        Favorite::where('user_id', Auth::id())
            ->where('game_id', $request->game_id)
            ->delete();

        return response()->json(['message' => 'Removed from favorites'], 200);
    }

    public function status(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer|exists:video_games,id',
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
            ->where('game_id', $request->game_id)
            ->exists();

        return response()->json(['isFavorite' => $isFavorite], 200);
    }
}
