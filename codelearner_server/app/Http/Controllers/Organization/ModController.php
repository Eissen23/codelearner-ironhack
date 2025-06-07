<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Http\ControllerHelper\AssetHelper;
use App\Http\ControllerHelper\ModeratorHelper;

use App\Models\Organization;
use App\Models\Moderator;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

use App\Http\ControllerHelper;

class ModController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    /**
     * Display a listing of moderator from choosen org.
     */
    public function showModInOrg(Request $request, Organization $org)
    {
        //show the moderator in user chosen organization
        // Log::info('OrgPolicy modify method called', ['org'=>$org, 'user' => $request->user()]);
        Gate::authorize("moderator", $org);

        $users = AssetHelper::getOrgModeratorPaginator($request, $org);

        return [
            "moderators" => $users['moderators'],
            "pending" => $users['pending'],
        ];
    }


    public function joinOrg(Request $request, Organization $org)
    {
        Gate::authorize('join', $org);
        $user = $request->user();
        if (!$user || !$org) {
            return response()->json([
                'message' => 'Fail to register user.id or org.id'
            ], 400);
        }

        $mod = Moderator::create(['user_id' => $user->id, 'org_id' => $org->id, 'role' => 'Pending']);
        return [
            'message' => 'Your submission is pending',
            'submission' => $mod
        ];
    }


    public function showMod(Request $request, Organization $org, string $id)
    {
        Gate::authorize("moderator", $org);

        $mod = ModeratorHelper::getModerator($org->id, $id);
        $user = $mod->user()->select('full_name', 'account_name', 'email')->get();
        return [
            'moderator' => $mod,
            'user' => $user,
        ];
    }

    public function changeMod(Request $request, Organization $org, string $id)
    {
        Gate::authorize('orgHead', $org);
        $mod = ModeratorHelper::getModerator($org->id, $id);

        $status = $request->validate([
            'role' => 'required|string',
        ]);
        switch ($status['role']) {
            case 'OrgHead':
                break;
            case 'Moderator':
                break;
            default: {
                $mod->delete();
                return [
                    'message' => 'Denied the mod request'
                ];
            }
        }

        $mod->update($status);
        return [
            'message' => 'Update success',
            'role' => $mod->role,
        ];
    }
    public function leaveOrg(Request $request, Organization $org)
    {
        Gate::authorize('moderator', $org);
        $user = $request->user();

        $mod = ModeratorHelper::getModerator($org->id, $user->id);
        $mod->delete();

        return [
            'message' => 'Leave successfull'
        ];
    }

}
