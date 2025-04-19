<?php

use App\Http\Controllers\Content\ProblemController;

Route::controller(ProblemController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{problem}', 'show');
    Route::put('/{problem}', 'update');
    Route::delete('/{problem}', 'destroy');
});