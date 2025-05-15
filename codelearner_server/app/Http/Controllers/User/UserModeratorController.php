<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserModeratorController extends Controller implements HasMiddleware{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    public function getCourseToPost (Request $request) {
        $course = $request->user()->organizations()->with('courses')->get()->pluck('courses')->flatten();
        return $course;
    }
    public function getProblemSetToAdd (Request $request) {
        $course = $request->user()->organizations()->with('problemSets')->get()->pluck('problemSets')->flatten();
        return $course;
    }
}