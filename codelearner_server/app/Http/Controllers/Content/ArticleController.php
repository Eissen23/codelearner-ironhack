<?php

namespace App\Http\Controllers\Content;


use App\Http\ControllerHelper\ArticleHelper;
use App\Http\Controllers\Controller;
use App\Http\ControllerHelper\CourseHelper;
use App\Models\Article;
use App\Models\Course;

use App\Http\ControllerHelper\ModeratorHelper;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class ArticleController extends Controller implements HasMiddleware
{   
    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index','show']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(?Course $course=null)
    {
        //
        $articles =CourseHelper::getArticlePagination(request(), $course);

        return [
            "articles"=> $articles,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Course $course)
    {   
        Gate::authorize('modify', $course);

        $fields = $request->validate([
            'name' => 'required|max:100',
            'description' => 'required|string|max:255',
            'content' => 'nullable',
            'chapter' => 'nullable',
            'type' => "required|string", 
            'tags' => "array"
        ]);

        $org_id =  $course->organization()->first()->id;
        $user_id = $request->user()->id;
        $fields['course_id'] = $course->id;
        
        if($fields['type'] != "chapter"){
            $mod_id = ModeratorHelper::getModerator($org_id, $user_id)->id;
            $fields['mod_id'] = $mod_id;
        }else{
            $fields['mod_id'] = 0;
        }

        $article = Article::create($fields);
        return [
            'article' => $article
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
        $belong = request()->input('is_belong', false);
        $needAuthor = request()->input('author', false);
        $course = $belong==='true' ? $article->course()->first() : "";
        $author = $needAuthor ? ArticleHelper::getAuthor($article) : "";

        $article->load('subArticles');
        return [
            "data"=>$article,
            "belong_to" => $course,
            "author" => $author,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
        Gate::authorize('modify', $article);
        $fields =  $request->validate([
            'name' => 'string|max:100',
            'description' => 'string|max:255',
            'content' => 'nullable',
            'type' => "string", 
            'tags' => "array",
        ]);

        $article->update($fields);

        return [
            'message' => "Update success",
            'article' => $article,
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
        Gate::authorize('modify', $article);

        $article->delete();

        return [
            'message' => "Article deleted"
        ];
    }
}
