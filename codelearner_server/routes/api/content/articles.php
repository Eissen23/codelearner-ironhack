<?php
use App\Http\Controllers\Content\ArticleController;


Route::apiResource('/', ArticleController::class)
    ->except('store')
    ->parameter('', 'article'); 