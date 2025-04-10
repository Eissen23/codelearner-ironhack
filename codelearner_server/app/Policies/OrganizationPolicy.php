<?php

namespace App\Policies;

use App\Models\Moderator;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;


class OrganizationPolicy 
{

    public function  getMod(Organization $organization, User $user){
        $moderator = Moderator::where("org_id", $organization->id)
            ->where("user_id", $user->id)
            ->first();
        return $moderator;
    }


    public function orgHead(User $user, Organization $organization)
    {   
        $moderator = $this->getMod($organization, $user);

        if (!$moderator) {
            return Response::deny('You dont have authority to this.', 403);
        }
        if ($moderator->role !== 'OrgHead') {
            return Response::deny('You dont have enough clearance authority to this',403);
        }

        return Response::allow();
    }

    public function moderator(User $user, Organization $organization){
        // Log::info('OrgPolicy modify method called', ['user_id' => $user->id, 'org_id' => $organization->id]);
        
        $moderator = $this->getMod($organization, $user);

        if (!$moderator && $moderator->role === 'Pending') {
            return Response::deny('You dont have authority to this.', 403);
        }

        return Response::allow();
    }

}
