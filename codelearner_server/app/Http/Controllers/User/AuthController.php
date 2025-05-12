<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $fields = $request->validate([
            'account_name' => 'required|string',
            'full_name'=>'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create($fields); 
        $token = $user->createToken(request('account_name')); 
        
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
        $user = User::where('email', '=',$request->email)->first();
        
        // If user dont exist and password is not correct
        if (!$user || !Hash::check($request->password  , $user->password)) {
            
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 400);
        }

        $token = $user->createToken($user->account_name);
        return [
            'token'=> $token->plainTextToken,
        ];

    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => 'You have logged out'
        ];
    }

    public function getUser(Request $request){
        return $request->user();
    }

    public function getInfoDetail(Request $request){
        $user = $request->user()->load('organizations', 'courses');

        $user->submissions = $user->userSubmissions()->get();
        return $user;
    }
}
