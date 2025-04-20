<?php

namespace App\Http\Controllers\Content;

use App\Http\ControllerHelper\ModeratorHelper;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Problem;

use App\Models\SolutionArticle;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class SolutionArticleController extends Controller implements HasMiddleware
{
    
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index']),
        ];
    }
    //
    public function index(Problem $problem)
    {
        //
        $solutionArticles = $problem->solutionArticles()->get();

        return [
            'solution_articles' => $solutionArticles,
        ];
    }

    public function store(Request $request ,Problem $problem)
    {
        // TODO: There haven been any problem set for these problems in the database
        Gate::authorize('modify', $problem);

        //Create an article and an solution article at the same time
        //Create the article
        $field_article = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',

        ]);
        $field_article['type'] = 'solution';
        $org_id = $problem->problemSet()->get(['org_id'])->first()->org_id;
        $user_id = $request->user()->id;

        $field_article['mod_id'] =  ModeratorHelper::getModerator($org_id, $user_id)->id;

        $article = Article::create($field_article);

        //Create the solution article
        $field_solution_article = $request->validate([
            'solution' => 'required',
            'language' => 'required|int',
        ]);

        $field_solution_article['problem_id'] = $problem->id;
        $field_solution_article['article_id'] = $article->id;

        $solution_article = SolutionArticle::create($field_solution_article);

        return [
            'solution_articles' => [
                'article' => $article,
                'solution' => $solution_article,
            ]
        ];
    }

    public function show(SolutionArticle $solution_article)
    {
        //
        $solution_article->load('article');

        return [
            'data' =>  $solution_article,
        ];
    }

    public function update(Request $request, SolutionArticle $solution_article)
    {
        //
        Gate::authorize('modify', $solution_article);

        $fields = $request->validate([
            'solution' => 'string',
            'language' => 'int',
        ]);

        $solution_article->update($fields);

        $article = $solution_article->article;
        $article_fields = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string|max:255',
            'content' => 'string',
        ]);
        $article->update($article_fields);

        return [
            'message' => 'Solution article updated successfully',
            'data' => $solution_article,        
        ];
    }

    public function destroy(SolutionArticle $solution_article)
    {
        //
        Gate::authorize('modify', $solution_article);

        $solution_article->article->delete();
        $solution_article->delete();

        return [
            'message' => 'Solution article deleted successfully',
        ];
    }
}