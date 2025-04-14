<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
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
        if(PolicyHelper::userCanPost($user, $course)){
            return Response::allow();
        }

        return Response::deny("This user cannot post article in this course");
    }

}


