<?php

namespace App\Http\ControllerHelper;

class UtilitiesHelper
{
    public static function getTrueImgUrl(string $fullUrl)
    {
        $path = parse_url($fullUrl, PHP_URL_PATH);

        $storagePath = str_replace('/storage/', '', $path);

        return $storagePath;
    }
}