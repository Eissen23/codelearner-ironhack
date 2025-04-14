<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\Course;
use App\Models\User;

class PolicyHelper
{
    public static function userCanPost(User $user, Course $course)
    {
        $org = $course->organization()->pluck('organizations.id')->first();

        $user_org = $user->organizations()->pluck('organizations.id')->toArray();

        return in_array($org, $user_org);
    }

    public static function userCanModify(User $user, Article $article){
        $moderator =  $article->moderator()->first();
        return $user->id == $moderator->user_id;
    }

}