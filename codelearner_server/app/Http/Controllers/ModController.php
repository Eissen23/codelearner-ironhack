<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use App\Models\Moderator
;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class ModController extends Controller implements HasMiddleware
{   
    public static function middleware(){
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    public function  getModerators(Organization $organization){
        $moderators = Moderator::where("org_id", $organization->id)
            ->all();
        return $moderators;
    }

    /**
     * Display a listing of moderator from choosen org.
     */
    public function showModInOrg(Request $request, Organization $org)
    {   
        //show the moderator in user chosen organization
        // Log::info('OrgPolicy modify method called', ['org'=>$org, 'user' => $request->user()]);

        Gate::authorize("listing", $org);
        
        $users = $org->users()
            ->select(
                'users.full_name',
                'users.email',
                'users.account_name',
                'moderators.role',
                'moderators.created_at as joined_at'
            )
            ->get()
            ->toArray();
        
        return [
            "moderators" => $users,
        ];
    }

    public function addModerator(Request $request, Organization $org){
        
    }
}
