<?php
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\OwnerController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserModeratorController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::prefix('user')->controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::put('/update', 'update');
});

Route::controller(AuthController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('/verify-token', 'validateToken');
    Route::delete('/logout', 'logout');
    Route::get('/user', 'getUser');
    Route::get('/info-detail', 'getInfoDetail');
});

// User
Route::prefix('member')->controller(OwnerController::class)->group( function () {
    Route::get('/your-orgs', 'getYourOrg');
    Route::get('/enrolled', 'getYourCourseEnroll');
    Route::get('/modrated-course', 'getYourCourseModerator');
    Route::get('/modrated-problemset', 'getYourProblemModerator');
    Route::get('/submission', 'getYourSubmission');
    Route::get('/orgs-spec', 'getYourOrgSpec');
});

Route::prefix('mod')->controller(UserModeratorController::class)->group(function() {
    Route::get('/your-courses', 'getCourseToPost');
    Route::get('/your-problemset', 'getProblemSetToAdd');
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

// Submission
Route::prefix('submissions')->group(base_path('routes/api/content/submission.php'));

// Solution
Route::prefix('solutions')->group(base_path('routes/api/content/solution.php'));