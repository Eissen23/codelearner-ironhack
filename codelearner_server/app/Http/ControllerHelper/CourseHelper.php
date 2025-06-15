<?php

namespace App\Http\ControllerHelper;

use App\Models\Article;
use App\Models\Course;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Http\Request;

class CourseHelper{
    
    public static function getUserCourse(User $user, Course $course)
    {
        $user_course = UserCourse::where('user_id', $user->id)->where('course_id', $course->id)->firstOrFail();
        return $user_course;
    }
    public static function getArticlePagination(Request $request, ?Course $course = null) 
    {
        $perPage = $request->input('per_page', 10);
        $articles = $course ? $course->articles() : Article::query();
        return $articles->with('subArticles')->paginate($perPage);
    }

    // For the course UserCourse class
    public static function getEnrolledPagination(Request $request, Course $course)
    {
        $perPage = $request->input('per_page', 10);
        $users = $course->users()->paginate($perPage);
        return $users;
    }

}