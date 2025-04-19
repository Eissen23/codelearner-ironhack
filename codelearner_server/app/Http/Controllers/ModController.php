<?php

namespace App\Http\Controllers;

use App\Http\ControllerHelper\AssetHelper;
use App\Http\ControllerHelper\ModeratorHelper;
use App\Models\Organization;
use App\Models\Moderator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

use App\Http\ControllerHelper;

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
        // TODO: check if the user is a moderator of the org
        Gate::authorize("moderator", $org);
        
        $users = AssetHelper::getOrgModeratorPaginator($request, $org);
        
        return [
            "moderators" => $users,
        ];
    }


    public function joinOrg(Request $request, Organization $org){
        $user = $request->user();
        if (!$user || !$org){
            return response()->json( [
                'message' => 'Fail to register user.id or org.id'
            ], 400);
        }

        $mod = Moderator::create(['user_id' =>$user->id, 'org_id' => $org->id,'role' => 'Pending']);
        return [
            'message' => 'Your submission is pending',
            'submission' => $mod 
        ];
    }


    public function showMod(Request $request, Organization $org, String $id){
        Gate::authorize("moderator", $org);

        $mod = ModeratorHelper::getModerator($org->id, $id);
        $user = $mod->user()->select('full_name', 'account_name', 'email')->get();
        return [
            'moderator' => $mod,
            'user'=> $user,
        ];
    }

    public function changeMod(Request $request, Organization $org, String $id){
        Gate::authorize('orgHead', $org);
        $mod = ModeratorHelper::getModerator($org->id, $id);

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

        $mod = ModeratorHelper::getModerator($org->id, $user->id);
        $mod->delete();

        return [
            'message' => 'Leave successfull'  
        ];
    } 

}
