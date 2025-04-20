<?php

use App\Http\Controllers\Content\ArticleController;
use App\Http\Controllers\Organization\CourseController;
use App\Http\Controllers\Organization\UserCourseController;
use App\Models\UserCourse;

// API That available to the public 

Route::apiResource('/',CourseController::class)
    ->parameter('','course')
    ->except('store');

Route::controller(ArticleController::class)->group(function(){
    Route::post("{course}/add-article", 'store');
    Route::get('{course}/list-articles', 'index');
});

Route::controller(UserCourseController::class)->group(function(){
    Route::get('{course}/enrolled-users', 'index');
    Route::post('{course}/enroll', 'store');
    Route::delete('{course}/unenroll', 'destroy');
});