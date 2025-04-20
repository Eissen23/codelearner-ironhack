<?php

namespace App\Policies;

use App\Models\ProblemSet;
use App\Models\User;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class ProblemSetPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function modify(User $user, ProblemSet $problemSet)
    {
        if(OrgPolicyHelper::userCanPost($user, $problemSet)){
            return Response::allow();
        }

        return Response::deny("You cant post this problem sets");
    }
}
