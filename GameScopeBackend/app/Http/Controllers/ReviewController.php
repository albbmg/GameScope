<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:video_games,id',
            'text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'publication_date' => 'required|date'
        ]);

        $review = Review::create($validated);
        return response()->json($review, 201);
    }

    public function show($id)
    {
        return Review::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->all());
        return response()->json($review, 200);
    }

    public function destroy($id)
    {
        Review::destroy($id);
        return response()->json(null, 204);
    }
}