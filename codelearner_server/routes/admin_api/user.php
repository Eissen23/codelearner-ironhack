<?php

use App\Http\Controllers\User\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;


Route::controller(UserController::class)->group(function () {
    Route::get('/','index');
    Route::put('/update','update'); //Update self
    Route::get('/info', 'show');
    Route::get('/info/{user}','show');
    Route::delete('/del/{user}','destroy');
});

Route::get('/info', function (){
    return 'admin';
});

Route::post('/login', [AuthController::class, 'login'])->name("admin.login");
Route::post('/register', [AuthController::class, 'register'])->name("admin.register");
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');