<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserSolution;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class UserSolutionPolicy
{
    public function view(User $user, UserSolution $user_solution)
    {
        // check if user belong in the organzation that the problem belongs to
        $problem = $user_solution->userSubmission()->first()->problem()->first();
        $problemSet = $problem->problemSet()->first();
        if(OrgPolicyHelper::userCanPost($user, $problemSet)){
            return Response::allow();
        }

        // if the user is the owner of the solution 
        $user_submission = $user_solution->userSubmission()->first();
        if($user_submission->user_id == $user->id){
            return Response::allow();
        }

        return Response::deny('You do not have permission to view this solution.');
    }

    public function delete(User $user, UserSolution $user_solution){
        $owner_id = $user_solution->userSubmission()->first()->user_id;

        if ($user->id === $owner_id) {
            return Response::allow();
        }

        return Response::deny('You do not own this solution.');
    }

    // only the modertor of the problem set can publish the solution
    public function publish(User $user, UserSolution $user_solution) {
        $problem = $user_solution->userSubmission()->first()->problem()->first();
        $problemSet = $problem->problemSet()->first();

        if(OrgPolicyHelper::userCanPost($user, $problemSet)) {
            return Response::allow();
        }

        return Response::deny('You do not have permission to publish this solution.');
    }
}
