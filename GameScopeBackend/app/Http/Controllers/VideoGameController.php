<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VideoGame;

class VideoGameController extends Controller
{
    public function index()
    {
        return VideoGame::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'developer' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'release_year' => 'required|integer'
        ]);

        $game = VideoGame::create($validatedData);

        return response()->json($game, 201);
    }

    public function show(VideoGame $game)
    {
        return $game;
    }

    public function update(Request $request, VideoGame $game)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'developer' => 'sometimes|required|string|max:255',
            'genre' => 'sometimes|required|string|max:255',
            'platform' => 'sometimes|required|string|max:255',
            'release_year' => 'sometimes|required|integer'
        ]);

        $game->update($validatedData);

        return response()->json($game);
    }

    public function destroy(VideoGame $game)
    {
        $game->delete();

        return response()->json(null, 204);
    }
}

