<?php
use App\Http\Controllers\User\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::get('/login', 'login');
    Route::delete('/logout', 'logout')->middleware('auth:sanctum');
});

// ORG
Route::prefix('orgs')->group(base_path('routes/api/company/org.php'));

// Course
Route::prefix('courses')->group(base_path('routes/api/company/course.php'));

// Problem-sets
Route::prefix('problem-sets')->group(base_path('routes/api/company/problemset.php'));

// Article
Route::prefix('articles')->group(base_path('routes/api/content/articles.php'));

// Problem 
Route::prefix('problems')->group(base_path('routes/api/content/problem.php'));

// Solution
Route::prefix('solutions')->group(base_path('routes/api/content/solution.php'));