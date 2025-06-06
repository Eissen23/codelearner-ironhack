<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Models\Organization;
use App\Models\Moderator;

use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class OrgController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
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
            'name' => 'required|string|max:50',
            'contact_email' => 'required|string|email',
            'description' => 'required|max:255',
            'website' => 'nullable|url:http,https',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = time() . '_org_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('orgs', $filename, 'public');
        }

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
        // $orgData = $org->toArray();
        // $orgData['logo'] = $org->logo ? url(Storage::url($org->logo)) : null;
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
            'name' => 'string|max:50',
            'contact_email' => 'string|email',
            'description' => 'max:255',
            'website' => 'nullable|url:http,https',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = time() . '_org_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('orgs', $filename, 'public');
        }


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

        if (Storage::disk('public')->exists($org->logo)) {
            Storage::disk('public')->delete($org->logo);
        }

        $org->delete();

        return [
            'message' => 'Delete organization successfully',
        ];
    }

    public function isOwn(Request $request, Organization $org)
    {
        $mod = OrgPolicyHelper::getMod($org, $request->user());
        if (!$mod) {
            return ['role' => 'UNAUTHORIZE'];
        }

        return ['role' => $mod->role];
    }
}
