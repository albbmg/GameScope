<?php

namespace App\Http\Controllers;

use App\Models\VideoGame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoGameController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 8);
        return VideoGame::with('reviews')->paginate($pageSize);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'developer' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $request->merge(['image' => $imageName]);
        }

        $videoGame = VideoGame::create($request->all());

        return response()->json($videoGame, 201);
    }

    public function show($id)
    {
        $videoGame = VideoGame::with('reviews')->findOrFail($id);

        // Calculate the average rating
        $averageRating = $videoGame->reviews()->avg('rating');
        $videoGame->average_rating = $averageRating; // No lo guardes, solo lo utilizas temporalmente

        return $videoGame;
    }

    public function update(Request $request, $id)
    {
        $videoGame = VideoGame::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'developer' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $request->merge(['image' => $imageName]);
        }

        $videoGame->update($request->all());

        return response()->json($videoGame, 200);
    }

    public function search(Request $request)
    {
        $query = VideoGame::query();

        if ($request->has('searchQuery')) {
            $query->where('name', 'like', '%' . $request->input('searchQuery') . '%');
        }

        if ($request->has('releaseYear')) {
            $query->where('release_year', $request->input('releaseYear'));
        }

        $videoGames = $query->get();

        return response()->json($videoGames);
    }

    public function destroy($id)
    {
        $videoGame = VideoGame::findOrFail($id);

        // Eliminar las reseñas asociadas al videojuego
        $videoGame->reviews()->delete();

        $videoGame->delete();

        return response()->json(null, 204);
    }

    public function addToFavorites(Request $request)
    {
        $user = Auth::user();
        $gameId = $request->input('game_id');

        $user->favorites()->attach($gameId);

        return response()->json(['message' => 'Juego añadido a favoritos']);
    }

    public function addToPending(Request $request)
    {
        $user = Auth::user();
        $gameId = $request->input('game_id');

        $user->pending()->attach($gameId);

        return response()->json(['message' => 'Juego añadido a pendientes']);
    }

    public function rate(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer|exists:video_games,id',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $game = VideoGame::findOrFail($request->input('game_id'));
        $newRating = $request->input('rating');
        $game->average_rating = ($game->average_rating * $game->rating_count + $newRating) / ($game->rating_count + 1);
        $game->rating_count++;
        $game->save();

        return response()->json(['message' => 'Rating updated successfully']);
    }

    public function getFavorites()
    {
        $user = Auth::user();
        return response()->json($user->favorites()->get());
    }

    public function getPendingGames()
    {
        $user = Auth::user();
        return response()->json($user->pending()->get());
    }
}

