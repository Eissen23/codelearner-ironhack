<?php
use App\Http\Controllers\Content\ArticleController;
use App\Http\Controllers\Content\SubArticleController;


Route::apiResource('/', ArticleController::class)
    ->except('store')
    ->parameter('', 'article'); 

Route::controller(SubArticleController::class)->group(function (){
    Route::get('/{article}/sub_articles', 'index');
    Route::get('/{article}/sub_articles/{sub_article}', 'show');
    Route::post('/{article}/add_to_chapter', 'store');
});

