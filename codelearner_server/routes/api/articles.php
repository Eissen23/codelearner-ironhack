<?php
use App\Http\Controllers\ArticleController;


Route::apiResource('/', ArticleController::class)
    ->except('store')
    ->parameter('', 'article'); 