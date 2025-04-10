<?php

use Illuminate\Support\Facades\Route;

// ORG
Route::prefix('orgs')->group(base_path('routes/api/org.php'));
Route::prefix('articles')->group(base_path('routes/api/articles.php'));