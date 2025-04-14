<?php

use App\Http\Controllers\ProblemSetController;


Route::apiResource('/',ProblemSetController::class)
    ->parameter('','problemSet')
    ->except('store');

