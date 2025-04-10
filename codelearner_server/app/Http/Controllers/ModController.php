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

    public function  getModerators(String $org_id){
        $moderators = Moderator::where("org_id", $org_id)
            ->all();
        return $moderators;
    }

    public function  getModerator(String $org_id, String $user_id){
        $moderator = Moderator::where("org_id", $org_id)
            ->where("user_id", $user_id)
            ->first();
        return $moderator;
    }

    /**
     * Display a listing of moderator from choosen org.
     */
    public function showModInOrg(Request $request, Organization $org)
    {   
        //show the moderator in user chosen organization
        // Log::info('OrgPolicy modify method called', ['org'=>$org, 'user' => $request->user()]);

        Gate::authorize("moderator", $org);
        
        $users = $org->users()
            ->select(
                'users.id',
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

    // TODO: This section is untested

    public function joinOrg(Request $request, Organization $org){
        $user = $request->user();
        //  Log::info('Join Org Called', ['org'=>$org, 'user' => $user]);
        if (!$user || !$org){
            return [
                'message' => 'Fail to register user.id or org.id'
            ];
        }

        $mod = Moderator::create(['user_id' =>$user->id, 'org_id' => $org->id,'role' => 'Pending']);

        return [
            'message' => 'Your submission is pending',
            'submission' => $mod 
        ];
    }


    public function showMod(Request $request, Organization $org, String $id){
        Gate::authorize("moderator", $org);

        $mod = $this->getModerator($org->id, $id);
        $user = $mod->user()->select('full_name', 'account_name', 'email')->get;
        return [
            'moderator' => $mod,
            'user'=> $user,
        ];
    }

    public function changeMod(Request $request, Organization $org, String $id){
        Gate::authorize('orgHead', $org);
        $mod = $this->getModerator($org->id, $id);

        $status = $request->validate([
            'role' => 'required|string',
        ]);
        switch ($request->input('role')) {
            case 'OrgHead':
                break;
            case 'Moderator':
                break;
            default:{
                $mod->delete();
                return [
                    'message'=> 'Request denied'
                ];      
            }
        }

        $mod->update($status);
        return [
            'message'=> 'Update success',
            'role'=> $mod,
        ];
    }
    public function leaveOrg(Request $request, Organization $org) {
        Gate::authorize('moderator', $org);
        $user = $request->user();

        $mod = $this->getModerator($org->id, $user->id);
        $mod->delete();

        return [
            'message' => 'Leave successfull'  
        ];
    }

}
