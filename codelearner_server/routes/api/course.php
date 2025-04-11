<?php

use App\Http\Controllers\CourseController;

// API That available to the public 

Route::apiResource('/',CourseController::class)
    ->parameter('','course')
    ->except('store', 'update');

