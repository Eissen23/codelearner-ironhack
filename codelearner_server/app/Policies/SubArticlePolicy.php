<?php

namespace App\Policies;

use App\Models\SubArticle;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use App\Policies\PolicyHelper\ContentPolicyHelper;

class SubArticlePolicy
{
    public function modify(User $user, SubArticle $sub_article)
    {
        $chapter_article = $sub_article->chapter()->first();
        if(ContentPolicyHelper::userCanModify($user, $chapter_article)){
            return Response::allow();
        }
        return Response::deny('User dont have authority for this');
    }
}
