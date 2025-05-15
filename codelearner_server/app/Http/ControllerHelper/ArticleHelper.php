<?php

namespace App\Http\ControllerHelper;
use App\Models\Moderator;
use Request;
use App\Models\Article;

class ArticleHelper{
    public static function getSubArticlePaginator(Request $request, Article $chapterArticle)
    {
        $perPage = $request->input('per_page', 10);
        $articles = $chapterArticle->subArticle()->paginate($perPage);
        return $articles;
    }

    public static function getAuthor(Article $article) {
        $mod =  $article->moderator()->first() ;
        $user =  $mod->user()->first();

        return $user;
    }
}