<?php
use App\Http\Controllers\Content\SubArticleController;

Route::controller(SubArticleController::class)->group(function(){
    Route::put('/{sub_article}', 'update');
    Route::delete('/{sub_article}', 'destroy');
});