<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use App\Policies\PolicyHelper\ContentPolicyHelper;
use Illuminate\Auth\Access\Response;

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
        if(ContentPolicyHelper::userCanModify($user, $article)){
            return Response::allow();
        }

        return Response::deny('User dont have authority for this');
    }

    public function chapter(User $user, Article $article) {
        if($article->type == "chapter"){
            return Response::allow();
        }

        return Response::deny('Only chapter articles can be modified');
    }
}
