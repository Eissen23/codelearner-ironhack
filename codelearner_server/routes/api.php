<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// route::apiResource('/user', UserController::class);

route::post('/register', [AuthController::class, 'register']);
route::post('/login', [AuthController::class, 'login']);
route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

route::apiResource('/user', UserController::class);

route::apiResource('/article', ArticleController::class) 
    ->except(['index','show'])
    ->middleware('auth:sanctum');
Route::get('/article', [ArticleController::class, 'index']);
Route::get('/article/{article}', [ArticleController::class, 'show']);