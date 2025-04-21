<?php

namespace App\Policies;

use App\Models\Problem;
use App\Models\User;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class ProblemPolicy
{
    public function modify(User $user, Problem $problem): Response
    {
        // check if user belong in the organzation that the problem belongs to
        $problemSet = $problem->problemSet()->first();
        if(OrgPolicyHelper::userCanPost($user, $problemSet)){
            return Response::allow();
        }
        return Response::deny('You do not have permission to modify this problem.');

    }

    public function view_solution(User $user, Problem $problem){
        // check if user belong in the organzation that the problem belongs to
        $problemSet = $problem->problemSet()->first();
        if(OrgPolicyHelper::userCanPost($user, $problemSet)){
            return Response::allow();
        }

        return Response::deny('You do not have permission to view this solution.');
    }
}
