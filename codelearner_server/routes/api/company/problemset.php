<?php

use App\Http\Controllers\Content\ProblemController;
use App\Http\Controllers\Organization\ProblemSetController;


Route::apiResource('/',ProblemSetController::class)
    ->parameter('','problemSet')
    ->except('store');

Route::controller(ProblemController::class)->group(function () {
    Route::get('/{problemSet}/problems', 'index');
    Route::post('/{problemSet}/add-problem', 'store');
});