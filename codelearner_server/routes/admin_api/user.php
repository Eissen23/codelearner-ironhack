<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::controller(AuthController::class)->group(function () {
    Route::get('/register', 'register');
    Route::get('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/','index');
    Route::get('/{user}/info','show');
    Route::put('/{user}/update','update');
    Route::delete('/{user}/del','destroy');
});


Route::get('/info', function (){
    return 'user';
});