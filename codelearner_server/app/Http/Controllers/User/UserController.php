<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

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
    public function update(Request $request)
    {  
        
        $user = $request->user();
        if (!$user) {
            return response('Error user is null', 400);
        }

       $fields = $request->validate([
            'account_name' => 'sometimes|string|unique:users',
            'full_name' => 'sometimes|string|unique:users',
            'email' => 'sometimes|email|unique:users',
            'about' => 'string',
            'image_avatar' =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        if ($request->hasFile('image_avatar')) {

            $logoPath = $user->getRawOriginal('image_avatar');
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }

            $logo = $request->file('image_avatar');
            $filename = time() . '_user_avatar_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['image_avatar'] = $logo->storeAs('users_ava', $filename, 'public');
        }

        $user->update($fields);

        return [
            'message' => 'Update successfully',
            'data' => $user,
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {   
        Gate::authorize('admin', $user);

        $user->delete();
        //
    }
}
