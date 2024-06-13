<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:video_games,id',
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:10'
        ]);

        $review = Review::create([
            'user_id' => Auth::id(),
            'game_id' => $validated['game_id'],
            'content' => $validated['content'],
            'rating' => $validated['rating']
        ]);

        return response()->json($review, 201);
    }

    public function show($id)
    {
        return Review::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $this->authorize('update', $review);
        $review->update($request->all());

        return response()->json($review, 200);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $this->authorize('delete', $review);
        $review->delete();

        return response()->json(null, 204);
    }

    public function getUserReviews()
    {
        $userId = Auth::id();
        return Review::where('user_id', $userId)->get();
    }
}
