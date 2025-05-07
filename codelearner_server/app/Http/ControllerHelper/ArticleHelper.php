<?php

namespace App\Http\ControllerHelper;

class ArticleHelper{
    public static function getSubArticlePaginator($request, $chapterArticle)
    {
        $perPage = $request->input('per_page', 10);
        $articles = $chapterArticle->subArticle()->paginate($perPage);
        return $articles;
    }

}