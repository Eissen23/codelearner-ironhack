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
use Illuminate\Support\Facades\Log;

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

        //Create an solution article 
        $field_solution_article = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string|nullable',
            'solution' => 'required',
            'language' => 'required|integer',
        ]);
        
        if($field_solution_article['name'] == null) {
            $field_solution_article['name'] = "Solution for {$problem->name}";
        }

        $field_solution_article['problem_id'] = $problem->id;

        $solution_article = SolutionArticle::create($field_solution_article);

        return [
            'solution_articles' => $solution_article
        ];
    }

    public function show(SolutionArticle $solution_article)
    {
        //
        $solution_article->load('problem');

        return [
            'data' =>  $solution_article,
        ];
    }

    public function update(Request $request, SolutionArticle $solution_article)
    {
        //
        Gate::authorize('modify', $solution_article);

        $fields = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string|nullable',
            'solution' => 'string',
            'language' => 'integer',
        ]);

        $solution_article->update($fields);

        return [
            'message' => 'Solution article updated successfully',
            'data' => $solution_article,        
        ];
    }

    public function destroy(SolutionArticle $solution_article)
    {
        //
        Gate::authorize('modify', $solution_article);

        $solution_article->delete();

        return [
            'message' => 'Solution article deleted successfully',
        ];
    }
}