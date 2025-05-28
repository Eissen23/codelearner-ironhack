<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Models\Course;
use App\Models\User;
use App\Models\UserCourse;

use App\Http\ControllerHelper\CourseHelper;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;    

class UserCourseController extends Controller implements HasMiddleware
{   
    public static function Middleware(){
        return [
            new Middleware('auth:sanctum')
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Course $course)
    {   
        // if user is in course allow to see enrolled users
        Gate::authorize('modify', $course);
        // Get the list of users enrolled in the course
        $users = CourseHelper::getEnrolledPagination(request(), $course);

        return [
           'users' => $users,
        ];
    }

    /**
     * Enroll a user in the course.
     * Store a newly created resource in storage.
     */

    public function store(Request $request, Course $course)
    {
        Gate::authorize('join', $course);

        $payment_id = 0;
        if($course->fee){
            // Handle payment logic here
            // For example, redirect to a payment gateway
            // $paymen_id = Payment::create($api);
            $payment_id = 0; // Placeholder for payment ID
        } 

        $fields = [
            'user_id' => $request->user()->id,
            'course_id' => $course->id,        
            'payment_id' => $payment_id,
        ];

        $userCourse = UserCourse::create($fields);

        return [
            'message' => 'User enrolled successfully',
            'user_course' => $userCourse,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Course $course)
    {
        Gate::authorize('leave', $course);

        $user = $request->user();

        $user_course = CourseHelper::getUserCourse($user, $course);
        $user_course->delete();

        return [
            'message' => 'Leave successfull'  
        ];
    }
}
