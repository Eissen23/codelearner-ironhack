<?php

namespace App\Policies\PolicyHelper;

use App\Models\User;
use App\Models\Article;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use App\Models\Course;
use App\Models\UserCourse;

class ContentPolicyHelper{

    public static function getUserCourse(Course $course, User $user){
        $user_course = UserCourse::where("course_id", $course->id)
            ->where("user_id", $user->id)
            ->first();
        return $user_course;
    }

    public static function userCanModify(User $user, Article $article){
        $moderator =  $article->moderator()->first();
        return ($user->id == $moderator->user_id) && in_array($moderator->role, OrgPolicyHelper::MODERATOR_ROLE);
    }

    public static function isUserInCourse(User $user, Course $course){
        $user_course = self::getUserCourse($course, $user);
        return !empty($user_course);
    }
}