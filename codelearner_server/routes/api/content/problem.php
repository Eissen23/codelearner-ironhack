<?php

use App\Http\Controllers\Content\ProblemController;
use App\Http\Controllers\Content\SolutionArticleController;

Route::controller(ProblemController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{problem}', 'show');
    Route::put('/{problem}', 'update');
    Route::delete('/{problem}', 'destroy');
});

Route::controller(SolutionArticleController::class)->group(function () {
    Route::get('/{problem}/solutions', 'index');
    Route::get('/solutions/{solution_article}', 'show');
    Route::post('/{problem}/add-solution', 'store');
    Route::put('/update-solutions/{solution_article}', 'update');
    Route::delete('/delete-solution/{solution_article}', 'destroy');
});