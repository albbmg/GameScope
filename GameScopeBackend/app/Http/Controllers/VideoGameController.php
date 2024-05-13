<?php

namespace App\Http\Controllers;

use App\Models\VideoGame;
use Illuminate\Http\Request;

class VideoGameController extends Controller
{
    public function index()
    {
        return VideoGame::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'developer' => 'required|max:255',
            'genre' => 'required|max:255',
            'platform' => 'required|max:255',
            'release_year' => 'required|digits:4'
        ]);

        $game = VideoGame::create($validatedData);
        return response()->json($game, 201);
    }

    public function show($id)
    {
        return VideoGame::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $game = VideoGame::findOrFail($id);
        $game->update($request->all());
        return response()->json($game, 200);
    }

    public function destroy($id)
    {
        VideoGame::destroy($id);
        return response()->json(null, 204);
    }
}
