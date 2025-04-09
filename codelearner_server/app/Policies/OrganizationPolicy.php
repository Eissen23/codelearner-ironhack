<?php

namespace App\Policies;

use App\Models\Moderator;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;


class OrganizationPolicy 
{
    public function modify(User $user, Organization $organization)
    {   
        $moderator = Moderator::where('user_id', '=',$user->id)
            -> where('org_id','=', $organization->id)
            ->first();
        if (!$moderator) {
            return Response::deny('You dont have authority to this.', 403);
        }
        if ($moderator->role !== 'OrgHead') {
            return Response::deny('You dont have enough clearance authority to this',403);
        }

        return Response::allow();
        
    }

}
