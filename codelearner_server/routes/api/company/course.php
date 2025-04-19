<?php

use App\Http\Controllers\Content\ArticleController;
use App\Http\Controllers\Organization\CourseController;

// API That available to the public 

Route::apiResource('/',CourseController::class)
    ->parameter('','course')
    ->except('store');

Route::controller(ArticleController::class)->group(function(){
    Route::post("{course}/add-article", 'store');
    Route::get('{course}/list-articles', 'index');
});