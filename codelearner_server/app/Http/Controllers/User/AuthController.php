<?php

namespace App\Http\Controllers\User;

use App\Http\ControllerHelper\AuthHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $fields = $request->validate([
            'account_name' => 'required|string',
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create($fields);
        $tokenData = AuthHelper::createDeviceToken($user, $request);

        return response()->json([
            'token' => $tokenData['token'],
            'device_name' => $tokenData['device_name'],
            'user' => $user,
        ]);

    }
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);
        $user = User::where('email', '=', $request->email)->first();

        // If user dont exist and password is not correct
        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 400);
        }

        // Generate device identifier
        $tokenData = AuthHelper::createDeviceToken($user, $request);


        return response()->json($tokenData);
    }

    public function validateToken(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'message' => 'Token not provided.'
            ], 400);
        }

        $user = $request->user();


        if (!$user) {
            return response()->json([
                'message' => 'Invalid token.'
            ], 401);
        }

        return [
            'message' => 'Token is valid.',
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'You have logged out'
        ];
    }

    public function getUser(Request $request)
    {
        return $request->user();
    }

    public function getInfoDetail(Request $request)
    {
        $user = $request->user()->load('organizations', 'courses');

        $user->submissions = $user->userSubmissions()->get();
        return $user;
    }
}
