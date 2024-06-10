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
            'game_id' => 'required|integer|exists:video_games,id',
        ]);

        $pending = Pending::create([
            'user_id' => Auth::id(),
            'game_id' => $request->game_id,
        ]);

        return response()->json(['message' => 'Added to pending'], 200);
    }
}
