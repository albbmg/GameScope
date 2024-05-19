<?php

namespace App\Http\Controllers;

use App\Models\Comparison;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComparisonController extends Controller
{
    public function index()
    {
        return Comparison::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'game_id1' => 'required|exists:video_games,id',
            'game_id2' => 'required|exists:video_games,id',
            'details' => 'nullable|string'
        ]);

        $comparison = Comparison::create(array_merge($request->all(), ['user_id' => Auth::id()]));

        return response()->json($comparison, 201);
    }

    public function show($id)
    {
        return Comparison::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $comparison = Comparison::findOrFail($id);
        $this->authorize('update', $comparison);
        $comparison->update($request->all());

        return response()->json($comparison, 200);
    }

    public function destroy($id)
    {
        $comparison = Comparison::findOrFail($id);
        $this->authorize('delete', $comparison);
        $comparison->delete();

        return response()->json(null, 204);
    }
}
