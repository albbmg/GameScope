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
        $request->validate([
            'game_id' => 'required|exists:video_games,id',
            'text' => 'required|string',
            'rating' => 'required|integer|min:1|max:10'
        ]);

        $review = Review::create(array_merge($request->all(), ['user_id' => Auth::id()]));

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
}
