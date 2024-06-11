<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pending;
use Illuminate\Support\Facades\Auth;

class PendingController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'video_game_id' => 'required|integer|exists:video_games,id',
        ]);

        // Verificar si el juego ya está en pendientes para este usuario
        $existingPending = Pending::where('user_id', Auth::id())
            ->where('video_game_id', $request->video_game_id)
            ->first();

        if ($existingPending) {
            return response()->json(['message' => 'Game already in pending'], 200);
        }

        $pending = Pending::create([
            'user_id' => Auth::id(),
            'video_game_id' => $request->video_game_id,
        ]);

        return response()->json(['message' => 'Added to pending'], 200);
    }

    public function remove(Request $request)
    {
        $request->validate([
            'video_game_id' => 'required|integer|exists:video_games,id',
        ]);

        Pending::where('user_id', Auth::id())
            ->where('video_game_id', $request->video_game_id)
            ->delete();

        return response()->json(['message' => 'Removed from pending'], 200);
    }

    public function status(Request $request)
    {
        $request->validate([
            'video_game_id' => 'required|integer|exists:video_games,id',
        ]);

        $isPending = Pending::where('user_id', Auth::id())
            ->where('video_game_id', $request->video_game_id)
            ->exists();

        return response()->json(['isPending' => $isPending], 200);
    }
}
