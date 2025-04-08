<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        
        $articles = Article::all();

        return [
            "articles"=> $articles,

        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $fields = $request->validate([
            'name' => 'required|max:255',
            'content' => 'required',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //

        return [
            "data"=>$article
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
