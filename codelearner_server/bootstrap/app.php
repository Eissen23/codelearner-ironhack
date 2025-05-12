<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->prefix('admin_api')
                ->group( function () {
                    Route::prefix('account')
                        ->group([
                            __DIR__.'/../routes/admin_api/user.php',
                    ]);
                    Route::prefix('orgs')
                        ->group([
                            __DIR__.'/../routes/admin_api/orgs.php',
                    ]);
                });
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
