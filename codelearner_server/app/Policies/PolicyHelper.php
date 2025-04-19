<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\Course;
use App\Models\ProblemSet;
use App\Models\User;

class PolicyHelper
{   

    // TODO: Might bite me in the ass later but worth
    public static function userCanPost(User $user, Course|ProblemSet $asset)
    {   
        $org = $asset->organization()->pluck('organizations.id')->first();

        $user_org = $user->organizations()->pluck('organizations.id')->toArray();

        return in_array($org, $user_org);
    }

    public static function userCanModify(User $user, Article $article){
        $moderator =  $article->moderator()->first();
        return $user->id == $moderator->user_id;
    }

    public static function isSuperAdmin(User $user){
        return $user->is_super_admin;
    }
}