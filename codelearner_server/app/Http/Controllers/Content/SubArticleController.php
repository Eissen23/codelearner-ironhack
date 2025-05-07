<?php

namespace App\Http\Controllers\Content;

use App\Http\ControllerHelper\ArticleHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
class SubArticleController extends Controller implements HasMiddleware
{   
    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index','show']),
        ];
    }

    //
    public function index(?Article $article){
        ArticleHelper::getSubArticlePaginator((request()), $article);
        return [
            "sub_articles"=> $article->subArticle()->get(),
        ];
    }

    public function show(Article $sub_article)
    {
        return [
            "sub_article"=> $sub_article,
        ];
    }

    public function store(Request $request, Article $article)
    {   
        Gate::authorize('chapter', $article);
        $fields = $request->validate([
            'name' => 'required|max:100',
            'description' => 'required|string|max:255',
            'content' => 'nullable',
        ]);

        $fields['article_id'] = $article->id;
        $fields['mod_id'] = $request->user()->id;

        $sub_article = Article::create($fields);
        return [
            "sub_article"=> $sub_article,
        ];
    }

    public function update(Request $request, Article $sub_article)
    {
        Gate::authorize('modify', $sub_article);

        $fields = $request->validate([
            'name' => 'required|max:100',
            'description' => 'required|string|max:255',
            'content' => 'nullable',
        ]);

        $sub_article->update($fields);
        return [
            "sub_article"=> $sub_article,
        ];
    }
    public function destroy(Article $sub_article)
    {
        Gate::authorize('modify', $sub_article);
        $sub_article->delete();
        return [
            "message"=> "Sub-article deleted successfully",
        ];
    }
}
