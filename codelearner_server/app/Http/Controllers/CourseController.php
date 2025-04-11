<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class CourseController extends Controller implements HasMiddleware
{   
    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index', 'show','indexFromOrg'])
        ] ;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $course = Course::all();

        return [
            'courses' => $course 
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function indexFromOrg(Organization $org)
    {
        //
        $courses = $org->courses()->get();

        return [
            'courses' => $courses 
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Organization $org)
    {
        //
        Gate::authorize('OrgHead', $org);
        $fields = $request->validate([
            'name'=> 'required|string',
            'description' => 'required',
            'short_description'=> 'required|string',
            'duration' => 'integer',
        ]);

        $fields['org_id'] = $org->id;

        $course = Course::create($fields);

        return [
            'course' => $course,
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
        return [
            "data" => $course,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
        $org = $course->organization()->first();

        Gate::authorize('orgHead', $org);

        $field = $request->validate([
            'name' => 'string',
            'short_description' => 'string',
            'description'=> 'nullable',
            'duration' => 'integer'
        ]);

        $course->update($field);

        return [
            'message' => 'Course updated',
            'course'=> $course,
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
        $org = $course->organization()->first();
        Gate::authorize('orgHead', $org);

        $course->delete();

        return [
            'message' => 'Course deleted'
        ];
    }
}
