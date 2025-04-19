<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;


Route::controller(UserController::class)->group(function () {
    Route::get('/','index');
    Route::put('/update','update'); //Update self
    Route::get('/info', 'show');
    Route::get('/info/{user}','show');
    Route::delete('/del/{user}','destroy');
});
