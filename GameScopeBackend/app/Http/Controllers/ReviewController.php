<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:video_games,id',
            'text' => 'required|string',
            'rating' => 'required|integer|min:1|max:10',
        ]);

        $review = Review::create($validatedData);

        return response()->json($review, 201);
    }

    public function show(Review $review)
    {
        return $review;
    }

    public function update(Request $request, Review $review)
    {
        $validatedData = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'game_id' => 'sometimes|required|exists:video_games,id',
            'text' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:10',
        ]);

        $review->update($validatedData);

        return response()->json($review);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(null, 204);
    }
}
