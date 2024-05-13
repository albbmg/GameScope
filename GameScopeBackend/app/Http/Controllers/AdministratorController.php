<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    public function index()
    {
        return Administrator::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|max:255',
            'email' => 'required|email|unique:administrators,email',
            'password' => 'required|min:6'
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $administrator = Administrator::create($validated);
        return response()->json($administrator, 201);
    }

    public function show($id)
    {
        return Administrator::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $administrator = Administrator::findOrFail($id);
        $administrator->update($request->all());
        return response()->json($administrator, 200);
    }

    public function destroy($id)
    {
        Administrator::destroy($id);
        return response()->json(null, 204);
    }
}