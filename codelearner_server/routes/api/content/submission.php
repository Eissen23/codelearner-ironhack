<?php

use App\Http\Controllers\User\UserSubmissionController;

Route::controller(UserSubmissionController::class)->group(function () {
    Route::get('/{userSubmission}', 'show'); // good
    Route::get('/', 'index');
});