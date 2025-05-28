<?php
use App\Http\Controllers\Organization\CourseController;
use App\Http\Controllers\Organization\ModController;
use App\Http\Controllers\Organization\OrgController;
use App\Http\Controllers\Organization\ProblemSetController;

// Asume all of these method got middleware() in them


/**
 * Control the org
 */

Route::apiResource('/', OrgController::class)->parameter('','org');
Route::controller(OrgController::class)->group(function() {
    Route::get('/{org}/allow','isOwn');
});

/**
 * Use the moderator controller 
 */

Route::prefix('/{org}')->controller(ModController::class)->group(function () {
    Route::get('/mods', 'showModInOrg' );
    Route::get('/mods/{id}','showMod');
    Route::post('/join-mod','joinOrg');
    Route::delete('/leave','leaveOrg');
    Route::put('/mods/{id}','changeMod');
});

/**
 * Use the course controller 
 */
 
Route::prefix('/{org}')->controller(CourseController::class)->group( function () {
    Route::get('/courses-in-org','index');
    Route::post('/add-course','store');
});


/**
 * Use the problem set controller
 */

 Route::prefix('/{org}')->controller(ProblemSetController::class)->group( function () {
    Route::post('add-problem-set','store');
    Route::get('/problem-sets','index');
});