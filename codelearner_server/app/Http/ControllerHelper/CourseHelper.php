<?php

namespace App\Http\ControllerHelper;

use App\Models\Article;
use App\Models\Problem;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseHelper{
    public static function getArticlePagination(Request $request, ?Course $course = null) 
    {
        $perPage = $request->input('per_page', 10);
        $articles = $course ? $course->articles()->paginate($perPage) : Article::paginate($perPage);
        return $articles;
    }

    // For the course UserCourse class

}