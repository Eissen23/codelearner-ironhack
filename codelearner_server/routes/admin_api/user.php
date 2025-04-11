<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::controller(UserController::class)->group(function () {
    Route::get('/','index');
    Route::put('/update','update')->middleware('auth:sanctum'); // TODO: Test later muchacho
    Route::get('/{user}/info','show');
    Route::delete('/{user}/del','destroy');
});


Route::get('/info', function (){
    return 'user';
});