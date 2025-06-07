<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

class AdminController extends Controller
{
    public function index()
    {
        // Read the JSON file from storage
        $json = Storage::disk('local')->get('routes.json');
        
        $utf8_content = mb_convert_encoding($json, 'UTF-8', 'UTF-16LE');
        // Remove BOM if present
        $utf8_content = str_replace("\xEF\xBB\xBF", '', $utf8_content);
        $routes = json_decode($utf8_content, true);

        return view('codelearner_server', compact('routes'));
    }
}
