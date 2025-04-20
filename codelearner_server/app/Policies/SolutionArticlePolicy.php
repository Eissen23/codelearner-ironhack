<?php

namespace App\Policies;

use App\Models\SolutionArticle;
use App\Models\User;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Auth\Access\Response;

class SolutionArticlePolicy
{
    public function modify(User $user, SolutionArticle $solutionArticle): Response
    {   
        $problemSet = $solutionArticle->problem()->first()->problemSet()->first();
        if(OrgPolicyHelper::userCanPost($user, $problemSet))
        {
            return Response::allow();
        }

        return Response::deny('You do not have permission to modify this solution article.');
    }
}
