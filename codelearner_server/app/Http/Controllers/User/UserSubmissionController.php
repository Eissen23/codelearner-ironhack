<?php

namespace App\Http\Controllers\User;

use App\Http\ControllerHelper\ProblemSetHelper;
use App\Http\Controllers\Controller;
use App\Models\Problem;
use App\Models\UserSubmission;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class UserSubmissionController extends Controller implements HasMiddleware
{   
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    //keep in mind that the data is only saved when 
    // user decided to submit not when run
    //only authorized user submission
    public function index(?Problem $problem = null)
    {
        $submissions = ProblemSetHelper::getUserSubmissionPaginator(request(), $problem);
        return [
            "submissions" => $submissions,
        ];
    }

    public function indexAsMod(Problem $problem)
    {
        Gate::authorize('modify', $problem);
        $submissions = ProblemSetHelper::getSubmissionAsModPaginator(request(), $problem);
        return [
            "submissions" => $submissions,
        ];
    }


    // data should be eager loaded
    public function show(UserSubmission $userSubmission)
    {   
        Gate::authorize('view', $userSubmission);
        $sub = $userSubmission->with('problem')->first();
        return [
            "submission" => $sub,
        ];
    }
    
    public function store(Request $request, Problem $problem)
    {   
        // validate the request
        $fields = $request->validate([
            'source_code' => 'required|string',
            'language_id' => 'required|integer',
            'result' => 'required|string',
            'points' => 'required|integer',
            'time' => 'required|decimal:0,2',
            'memory' => 'required|decimal:0,2',
        ]);
        $fields['user_id'] = $request->user()->id;
        $fields['problem_id'] = $problem->id;

        $submission = UserSubmission::create($fields);

        return [
            "message" => "Entry created successfully",
            "submission" => $submission,
        ];
    }

}
