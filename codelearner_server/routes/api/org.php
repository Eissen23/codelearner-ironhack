<?php
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModController;
use App\Http\Controllers\OrgController;

// Asume all of these method got middleware() in them
 
Route::apiResource('/', OrgController::class)->parameter('','org');

Route::prefix('/{org}')->controller(ModController::class)->group(function () {
    Route::get('/mods', 'showModInOrg' );
    Route::get('/mods/{id}','showMod');
    Route::post('/join-mod','joinOrg');
    Route::delete('/leave','leaveOrg');
    Route::put('/mods/{id}','changeMod');
});

Route::apiResource('/courses', CourseController::class)
    ->except('index', 'show', 'store');

Route::prefix('/{org}')->controller(CourseController::class)->group( function () {
    Route::get('/courses-in-org','indexFromOrg');
    Route::post('/add-course','store');
});