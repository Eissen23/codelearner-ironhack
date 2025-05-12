<?php
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\OwnerController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::delete('/logout', 'logout')->middleware('auth:sanctum');
    Route::get('/user', 'getUser')->middleware('auth:sanctum');
    Route::get('/info-detail', 'getInfoDetail')->middleware('auth:sanctum');
});

// User
Route::prefix('member')->controller(OwnerController::class)->group( function () {
    Route::get('/your-orgs', 'getYourOrg');
    Route::get('/enrolled', 'getYourCourseEnroll');
    Route::get('/modrated-course', 'getYourCourseModerator');
    Route::get('/submission', 'getYourSubmission');
});

// ORG
Route::prefix('orgs')->group(base_path('routes/api/company/org.php'));

// Course
Route::prefix('courses')->group(base_path('routes/api/company/course.php'));

// Problem-sets
Route::prefix('problem-sets')->group(base_path('routes/api/company/problemset.php'));

// Article
Route::prefix('articles')->group(base_path('routes/api/content/articles.php'));
Route::prefix('sub_articles')->group(base_path('routes/api/content/sub_article.php'));

// Problem 
Route::prefix('problems')->group(base_path('routes/api/content/problem.php'));

// Solution
Route::prefix('solutions')->group(base_path('routes/api/content/solution.php'));