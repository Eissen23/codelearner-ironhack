<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::controller(UserController::class)->group(function () {
    Route::get('/','index');
    Route::get('/{user}/info','show');
    Route::put('/{user}/update','update');
    Route::delete('/{user}/del','destroy');
});


Route::get('/info', function (){
    return 'user';
});