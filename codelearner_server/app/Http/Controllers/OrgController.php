<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Moderator;


use Illuminate\Support\Facades\Log;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class OrgController extends Controller implements HasMiddleware
{

    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except :['index', 'show']),
        ];
    }


    public function index()
    {
        //
        $orgs = Organization::all();
        return [
            "org" => $orgs
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $fields = $request->validate([
            'org_name' => 'required|string|max:50',
            'contact_email' => 'required|string|email',
            'description' => 'required|max:255',
            'website' => 'nullable|url:http,https',
            'logo' => 'nullable|image',
        ]);
        $organization = Organization::create($fields);

        $user_id = $request->user()->id;
        $moderator = Moderator::create([
            'user_id' => $user_id,
            'org_id' => $organization->id,
            'role' => 'OrgHead',
        ]);

        return [
            'organization' => $organization,
            'head' => $moderator,
        ];

    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $org)
    {
        // 
        // $organization = Organization::where('org_id', '=', $id)->first();

        return [
            "data" => $org,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organization $org)
    {
        Gate::authorize('orgHead', $org);

        $fields = $request->validate([
            'org_name' => 'string|max:50',
            'contact_email' => 'string|email',
            'description' => 'max:255',
            'website' => 'nullable|url:http,https',
            'logo' => 'nullable|image',
        ]);

        $org->update($fields);

        return [
            'message' => 'Update successfully',
            'data' => $org,
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $org)
    {
        //

        Gate::authorize('orgHead', $org);

        Moderator::where('org_id', $org->id)->delete();

        $org->delete();

        return [
            'message' => 'Delete organization successfully',
        ];
    }
}
