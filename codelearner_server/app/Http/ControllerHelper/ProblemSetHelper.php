<?php

namespace App\Http\ControllerHelper;

use App\Models\Problem;
use App\Models\ProblemSet;
use Illuminate\Http\Request;

class ProblemSetHelper 
{
    /**
     * Get the ProblemSet for the course.
     * @param Request $request
     * @param ProblemSet $problemSet
     *
     */
    public static function getOrgProblemSetPaginator(Request $request, ?ProblemSet $problemSet = null) {
        $perpage = $request->input('per_page', 10);
        $assets_data = $problemSet ? $problemSet->problems()->paginate($perpage) : Problem::paginate($perpage);

        return $assets_data;
    }
}