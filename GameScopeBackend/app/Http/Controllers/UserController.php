<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getProfile()
    {
        return response()->json(Auth::user());
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'newPassword' => 'nullable|string|min:8|confirmed',
        ]);

        $user->first_name = $validatedData['firstName'];
        $user->last_name = $validatedData['lastName'];
        $user->phone = $validatedData['phone'];
        $user->email = $validatedData['email'];

        if ($request->filled('newPassword')) {
            $user->password = Hash::make($request->newPassword);
        }

        $user->save();

        return response()->json($user, 200);
    }

    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'profileImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = Auth::user();
        if ($request->hasFile('profileImage')) {
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            $path = $request->file('profileImage')->store('profile_images', 'public');
            $user->profile_image = $path;
            $user->save();
        }

        return response()->json(['imageUrl' => asset('storage/' . $path)]);
    }

    public function index()
    {
        return User::all();
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|string|in:admin,user'
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();
            $user->reviews()->delete();
            $user->delete();
            DB::commit();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al eliminar el usuario', 'error' => $e->getMessage()], 500);
        }
    }
}
