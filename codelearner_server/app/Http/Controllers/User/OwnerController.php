<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OwnerController extends Controller implements HasMiddleware{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    public function getYourOrg(Request $request) {
        $org = $request->user()->organizations()->get();
        return $org;
    }
    public function getYourCourseEnroll(Request $request) {
        $course = $request->user()->courses()->get();
        return $course;
    }
    public function getYourCourseModerator(Request $request) {
        $course = $request->user()->managedOrganizations()->with('courses')->get()->pluck('courses')->flatten();
        return $course;
    }

    public function getYourProblemModerator(Request $request) {
        $problemSets = $request->user()->managedOrganizations()->with('problemSets')->get()->pluck('problemSets')->flatten();
        return $problemSets;
    }

    public function getYourSubmission(Request $request) {
        $submission = $request->user()->userSubmissions()->get();
        return $submission;
    }
    // public function getYourSolution(Request $request) {
    //     $request->user()->submissions()->get();
    //     return [
    //         $
    //     ]
    // }

}