<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserSubmission;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class UserSubmissionPolicy
{
    public function view(User $user, UserSubmission $submission)
    {   

        // if user is the owner of the submission
        if($submission->user_id === $user->id) {
            return Response::allow();
        }
        // if they are the moderator of the problem
        elseif(OrgPolicyHelper::userCanPost($user, $submission->problem()->first()->problemSet)) {
            return Response::allow();
        }
        return Response::deny('You do not own this submission.');
    }

    public function modify(User $user, UserSubmission $submission)
    {
        if($submission->user_id === $user->id) {
            return Response::allow();
        }elseif(OrgPolicyHelper::userCanPost($user, $submission->problem()->first())) {
            return Response::allow();
        }
        return Response::deny('You do not own this submission.');
    }

    public function create_solution(User $user, UserSubmission $submission)
    {
        if($submission->user_id === $user->id) {
            return Response::allow();
        }
        return Response::deny('You do not own this submission.');
    }

}
