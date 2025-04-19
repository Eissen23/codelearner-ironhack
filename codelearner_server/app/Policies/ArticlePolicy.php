<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use App\Policies\PolicyHelper;

class ArticlePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function modify(User $user, Article $article) {
        if(PolicyHelper::userCanModify($user, $article)){
            return Response::allow();
        }

        return Response::deny('User dont have authority for this');
    }
}
