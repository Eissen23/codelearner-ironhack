<?php

use App\Models\Moderator;
use App\Models\Organization;
use App\Models\User;

class PolicyHelper
{
    public static function isOrgHead(User $user, Organization $org){
        if (empty($user) || empty($org)){
            return false;
        }
        
        $moderator = Moderator::where('user_id',$user->id)
            ->where('org_id',$org->id)
            ->first();
        
        if (!$moderator && $moderator->role !== 'OrgHead') {
            return false;
        }

        return true;
    }

}