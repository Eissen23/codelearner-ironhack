<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OwnerController extends Controller implements HasMiddleware
{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }


    public function getYourOrg(Request $request)
    {
        $organizations = $request->user()
            ->organizations()
            ->get()
            ->groupBy('pivot.role');

        return [
            'org_managed' => $organizations->get('OrgHead', collect()),
            'org_mod' => $organizations->get('Moderator', collect()),
            'org_pending' => $organizations->get('Pending', collect()), // or whatever your third role is
            'org_reject' => $organizations->get('Reject', collect()), // or whatever your third role is
        ];
    }

    public function getYourOrgSpec(Request $request)
    {
        $as_role = $request->input('as_role', null);

        $org = [];
        if (!$as_role) {
            $org = $request->user()->organizations()->get();
        } else {
            $org = $request->user()->organizations()->wherePivot('role', $as_role)->get();
        }

        return $org;
    }

    public function getYourCourseEnroll(Request $request)
    {
        $course = $request->user()->courses()->get();
        return $course;
    }
    public function getYourCourseModerator(Request $request)
    {
        $course = $request->user()->managedOrganizations()->with('courses')->get()->pluck('courses')->flatten();
        return $course;
    }

    public function getYourProblemModerator(Request $request)
    {
        $problemSets = $request->user()->managedOrganizations()->with('problemSets')->get()->pluck('problemSets')->flatten();
        return $problemSets;
    }

    public function getYourSubmission(Request $request)
    {
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