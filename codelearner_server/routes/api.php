<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::get('/login', 'login');
    Route::delete('/logout', 'logout')->middleware('auth:sanctum');
});

// ORG
Route::prefix('orgs')->group(base_path('routes/api/org.php'));

// Article
Route::prefix('articles')->group(base_path('routes/api/articles.php'));

// Course
Route::prefix('courses')->group(base_path('routes/api/course.php'));

// Problem-sets
Route::prefix('problem-sets')->group(base_path('routes/api/problemset.php'));

// Problem 
Route::prefix('problems')->group(base_path('routes/api/problem.php'));
