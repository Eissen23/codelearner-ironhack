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

    public function getModOrg (Request $request){
        $org = $request->user()->moderatedOrg()->get();
        return $org;
    }

    public function getCourseToPost (Request $request) {
        $course = $request->user()->moderatedOrg()->with('courses')->get()->pluck('courses')->flatten();
        return $course;
    }
    public function getProblemSetToAdd (Request $request) {
        $course = $request->user()->moderatedOrg()->with('problemSets')->get()->pluck('problemSets')->flatten();
        return $course;
    }
}