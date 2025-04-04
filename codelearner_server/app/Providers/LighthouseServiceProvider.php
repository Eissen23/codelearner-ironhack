<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class LighthouseServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(
            config_path('lighthouse.php'), 'lighthouse'
        );
    }

    public function boot()
    {
        // You can add any additional Lighthouse-specific boot logic here
    }
}