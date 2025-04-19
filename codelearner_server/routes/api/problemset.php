<?php

use App\Http\Controllers\ProblemController;
use App\Http\Controllers\ProblemSetController;


Route::apiResource('/',ProblemSetController::class)
    ->parameter('','problemSet')
    ->except('store');

Route::controller(ProblemController::class)->group(function () {
    Route::get('/{problemSet}/problems', 'index');
    Route::post('/{problemSet}/add-problem', 'store');
});