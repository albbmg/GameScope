<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comparison;

class ComparisonController extends Controller
{
    public function index()
    {
        return Comparison::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'game_id1' => 'required|exists:video_games,id',
            'game_id2' => 'required|exists:video_games,id',
            'details' => 'required|string',
        ]);

        $comparison = Comparison::create($validatedData);

        return response()->json($comparison, 201);
    }

    public function show(Comparison $comparison)
    {
        return $comparison;
    }

    public function update(Request $request, Comparison $comparison)
    {
        $validatedData = $request->validate([
            'game_id1' => 'sometimes|required|exists:video_games,id',
            'game_id2' => 'sometimes|required|exists:video_games,id',
            'details' => 'sometimes|required|string',
        ]);

        $comparison->update($validatedData);

        return response()->json($comparison);
    }

    public function destroy(Comparison $comparison)
    {
        $comparison->delete();

        return response()->json(null, 204);
    }
}
