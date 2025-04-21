<?php

use App\Http\Controllers\User\UserSolutionController;
use App\Http\Controllers\User\PublishSolutionController;
use App\Http\Controllers\Content\SolutionArticleController;

//User solution route
Route::controller(UserSolutionController::class)->group(function () {
    Route::get('/your-solution', 'index'); // as user good
    Route::get('user-solution/{user_solution}', 'show'); // as user && mod good 
    Route::post('/make-solution/{userSubmission}', 'store'); // as user good
    Route::delete('/your-solution/{user_solution}', 'destroy'); // as user good
});


// Moderator and Orghead side
Route::prefix('mod')->controller(SolutionArticleController::class)->group(function () {
    Route::get('/{solution_article}', 'show'); 
    Route::put('/edit/{solution_article}', 'update');
    Route::delete('/del/{solution_article}', 'destroy');
});

// Publish user solution 
Route::controller(PublishSolutionController::class)->group(function () {
    Route::put('/publish/{user_solution}', 'publish'); 
    Route::put('/reject/{user_solution}', 'reject');
});