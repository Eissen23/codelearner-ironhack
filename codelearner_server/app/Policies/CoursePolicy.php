<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use App\Policies\PolicyHelper\ContentPolicyHelper;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use App\PoliciesPolicyHelper;
use Illuminate\Auth\Access\Response;
class CoursePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }


    public function modify(User $user, Course $course){
        if(OrgPolicyHelper::userCanPost($user, $course)){
            return Response::allow();
        }

        return Response::deny("This user cannot post article in this course");
    }

    public function join(User $user, Course $course){
        if(ContentPolicyHelper::isUserInCourse($user, $course)){
            return Response::deny('User already enrolled in this course');
        }

        return Response::allow();
    }

    public function leave(User $user, Course $course){
        if(ContentPolicyHelper::isUserInCourse($user, $course)){
            return Response::allow();
        }

        return Response::deny();
    }
}


