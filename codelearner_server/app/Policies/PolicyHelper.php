<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\Course;
use App\Models\ProblemSet;
use App\Models\User;
use App\Models\Organization;
use App\Models\Moderator;

//Seperate these helper later
class PolicyHelper
{   
    const OrgHead = 'OrgHead';
    const MODERATOR_ROLE = ['Moderator', 'OrgHead'];
    const UNAUTHORIZED_ROLE = ['Pending', 'Rejected'];

    // Get moderator 
    public static function getMod(Organization $organization, User $user){
        $moderator = Moderator::where("org_id", $organization->id)
            ->where("user_id", $user->id)
            ->first();
        return $moderator;
    }


    // TODO: Might bite me in the ass later but worth
    public static function userCanPost(User $user, Course|ProblemSet $asset)
    {   
        $org = $asset->organization()->first();

        $moderator = self::getMod($org, $user );

        return $moderator ? in_array($moderator->role, self::MODERATOR_ROLE) : false;
    }

    public static function userCanModify(User $user, Article $article){
        $moderator =  $article->moderator()->first();
        return ($user->id == $moderator->user_id) && in_array($moderator->role, self::MODERATOR_ROLE);
    }

    public static function isSuperAdmin(User $user){
        return $user->is_super_admin;
    }
}