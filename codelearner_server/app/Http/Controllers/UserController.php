<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(){
        return  [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    //need a policy for each and every of these user

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();

        return [
            "users"=> $users,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // No need to use it
    }

    /**
     * Display the specified resource.
     */
    public function show(?User $user=null, Request $request)
    {
        //

        $data = $user ? $user : $request->user();

        return [
            "user"=> $data,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ?User $user): void
    {
        //
        // $updated_user =$user ? $user:$request->user();
        // $fields = $request->validate([
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
