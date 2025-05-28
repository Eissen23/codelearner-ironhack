<?php

namespace App\Policies;

use App\Models\Organization;
use App\Models\User;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class OrganizationPolicy 
{

    public function orgHead(User $user, Organization $organization)
    {   
        // Log::info('OrgPolicy orghead method called', ['user_id' => $user->id, 'org_id' => $organization->id]);

        if(!$user || !$organization) {
            return Response::deny('Either user or org is null');
        }

        $moderator = OrgPolicyHelper::getMod($organization, $user);

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
        if(!$user || !$organization) {
            return Response::deny('Either user or org is null');
        }

        $moderator = OrgPolicyHelper::getMod($organization, $user);

        if (!$moderator && $moderator->role === 'Pending') {
            return Response::deny('You dont have authority to this.', 403);
        }

        return Response::allow();
    }

    public function join (User $user, Organization $organization) {
        if(!$user || !$organization) {
            return Response::deny('Either user or org is null');
        }

        $moderator = OrgPolicyHelper::getMod($organization, $user);

        if ($moderator) {
            return Response::deny('User already in  org', 403);
        }
        
        return Response::allow();
    }
}
