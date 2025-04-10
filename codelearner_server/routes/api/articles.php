<?php
use App\Http\Controllers\ArticleController;


Route::apiResource('/', ArticleController::class)->parameter('', 'article'); 