<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $gameId = $request->query('game_id');

        if ($gameId) {
            return Review::with('user', 'videoGame')->where('game_id', $gameId)->get();
        }

        return Review::with('user', 'videoGame')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:video_games,id',
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5'
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
        return Review::with('user', 'videoGame')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $user = Auth::user();

        if ($user->id !== $review->user_id && !$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->update($request->all());

        return response()->json($review, 200);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $user = Auth::user();

        if ($user->id !== $review->user_id && !$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(null, 204);
    }

    public function getUserReviews()
    {
        $userId = Auth::id();
        return Review::with('videoGame')->where('user_id', $userId)->get();
    }

    public function search(Request $request)
    {
        $query = Review::query();

        if ($request->has('searchQuery')) {
            $query->where('content', 'like', '%' . $request->input('searchQuery') . '%');
        }

        if ($request->has('userId')) {
            $query->where('user_id', $request->input('userId'));
        }

        return response()->json($query->with('user', 'videoGame')->get());
    }
}
