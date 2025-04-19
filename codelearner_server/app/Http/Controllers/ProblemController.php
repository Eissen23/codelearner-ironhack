<?php

namespace App\Http\Controllers;

use App\Http\ControllerHelper\ProblemSetHelper;
use App\Models\Problem;
use App\Models\ProblemSet;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class ProblemController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    /**
     * Display a listing of the resource.
     */

    //post, update, delete, get

    // TODO: HANDLE LATER
    public function index(?ProblemSet $problemSet=null)
    {
        // return all problems
        $problems = ProblemSetHelper::getOrgProblemSetPaginator(request(), $problemSet);
        return [
            'problems' => $problems,
        ];
    }

    public function show(Problem $problem)
    {
        // return a single problem
        return [
            'problem' => $problem,
        ];
    }

    public function store(Request $request, ProblemSet $problemSet)
    {   
        // check if the user is authorized to create a problem in the problem set
        Gate::authorize('modify', $problemSet);

        // validate the request
        $fields= $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'tags' => 'array',
            'difficulty' => 'string',
            'test_case' => 'required|array',
            'test_case.input' => 'required|array',
            'test_case.input.*' => 'string',
            'test_case.output' => 'required|array',
            'test_case.output.*' => 'string',
        ]);

        $fields['problem_set'] = $problemSet->id;
        // create a new problem
        $problem = Problem::create($fields);

        return [
            'problem' => $problem,
        ];
    }
    
    public function update(Request $request, Problem $problem)
    {   
        Gate::authorize('modify', $problem);
        // validate the request
        $fields= $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'tags' => 'array',
            'difficulty' => 'string',
            'test_case' => 'array',
            'test_case.input' => 'array',
            'test_case.input.*' => 'string',
            'test_case.output' => 'array',
            'test_case.output.*' => 'string',
        ]);

        // update the problem
        $problem->update($fields);

        return [
            'message' => 'Problem updated successfully',
            'problem' => $problem,
        ];
    }

    public function destroy(Problem $problem)
    {   
        Gate::authorize('modify', $problem);
        // delete the problem
        $problem->delete();

        return [
            'message' => 'Problem deleted successfully',
        ];
    }
}