<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'full_name'=>'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create($fields); 
        $token = $user->createToken(request('name')); 
        
        return [
            'token'=> $token->plainTextToken,
            'user'=> $user,
        ];
    }
    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || Hash::check($request->passowrd , $user->password)) {
            return [
                'message' => 'The provided credentials are incorrect.'
            ];
        }

        $token = $user->createToken($user->name);
        return [
            'token'=> $token->plainTextToken,
            'user'=> $user
        ];

    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => 'You have logged out'
        ];
    }
}
