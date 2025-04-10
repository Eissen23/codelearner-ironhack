<?php
use App\Http\Controllers\ModController;
use App\Http\Controllers\OrgController;

Route::apiResource('/', OrgController::class)->parameter('','org');

Route::controller(ModController::class)->group(function () {
    Route::get('/{org}/mods', 'showModInOrg' );
    Route::get('/{org}/mods/{id}','showMod');

    Route::post('/{org}/join-mod','joinOrg');
    Route::delete('/{org}/leave','leaveOrg');
    Route::put('/{org}/mods/{id}','changeMod');
});