<?php

use App\Http\Controllers\Content\ProblemController;
use App\Http\Controllers\Content\SolutionArticleController;
use App\Http\Controllers\User\PublishSolutionController;
use App\Http\Controllers\User\UserSolutionController;
use App\Http\Controllers\User\UserSubmissionController;
use App\Models\UserSubmission;

Route::controller(ProblemController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{problem}', 'show');
    Route::put('/{problem}', 'update');
    Route::delete('/{problem}', 'destroy');
});


// Moderator and Orghead side
Route::controller(SolutionArticleController::class)->group(function () {
    Route::get('/{problem}/solutions', 'index');
    Route::post('/{problem}/add-solution', 'store');
});

// User side
// TODO: test these routes later
Route::controller(UserSubmissionController::class)->group(function () {
    Route::get('/{problem}/submissions', 'index'); // when open summission - good
    Route::get('/{problem}/submissions-as-mod', 'indexAsMod'); // when open summission listing - good
    Route::get('/submissions/{userSubmission}', 'show'); // good
    Route::post('/{problem}/submit', 'store');//good
});

// View publish through problem
Route::controller(PublishSolutionController::class)->group(function () {
    Route::put('{problem}/view-solution', 'view');
});