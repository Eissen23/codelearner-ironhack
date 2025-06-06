<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Http\ControllerHelper\AssetHelper;

use App\Models\Course;
use App\Models\Organization;

use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(?Organization $org = null)
    {
        //
        $courses = AssetHelper::getOrgCoursePaginator(request(), $org);

        return [
            'courses_page' => $courses,
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
            'name' => 'required|string',
            'description' => 'required',
            'short_description' => 'required|string',
            'duration' => 'integer',
            'fee' => 'numeric|nullable',
            'currency' => 'string|nullable',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = time() . '_course_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('courses', $filename, 'public');
        }

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
        $belong = request()->input('is_belong', false);
        //
        $org = $belong === 'true' ? $course->organization()->first() : null;

        return [
            "data" => $course,
            "belong_to" => $org
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

        $fields = $request->validate([
            'name' => 'string',
            'short_description' => 'string',
            'description' => 'nullable',
            'duration' => 'integer',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('logo')) {

            $logoPath = $course->getRawOriginal('logo');
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }

            $logo = $request->file('logo');
            $filename = time() . '_course_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('courses', $filename, 'public');
        }

        $course->update($fields);

        return [
            'message' => 'Course updated',
            'course' => $course,
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

        $logoPath = $course->getRawOriginal('logo');
        if ($logoPath && Storage::disk('public')->exists($logoPath)) {
            Storage::disk('public')->delete($logoPath);
        }

        $course->delete();

        return [
            'message' => 'Course deleted'
        ];
    }

    public function isOwn(Request $request, Course $course)
    {
        $user = $request->user();
        return ['role' => OrgPolicyHelper::userOwn($user, $course)];
    }
}
