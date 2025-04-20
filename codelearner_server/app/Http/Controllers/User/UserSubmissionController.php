<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Problem;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserSubmissionController extends Controller implements HasMiddleware
{   
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    //keep in mind that the data is only saved when 
    // user decided to submit not when run
    //only authorized user submission
    public function index(?Problem $problem = null)
    {
    }
   
}
