<?php

namespace App\Http\Controllers;

use App\Models\Comparison;
use Illuminate\Http\Request;

class ComparisonController extends Controller
{
    public function index()
    {
        return Comparison::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id1' => 'required|exists:video_games,id',
            'game_id2' => 'required|exists:video_games,id',
            'details' => 'required|string'
        ]);

        $comparison = Comparison::create($validated);
        return response()->json($comparison, 201);
    }

    public function show($id)
    {
        return Comparison::findOrFail($id);
    }

    public function destroy($id)
    {
        Comparison::destroy($id);
        return response()->json(null, 204);
    }
}