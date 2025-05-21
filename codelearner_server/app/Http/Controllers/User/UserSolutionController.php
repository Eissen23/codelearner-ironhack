<?php

namespace App\Http\Controllers\User;

use App\Http\ControllerHelper\ProblemSetHelper;
use App\Http\Controllers\Controller;
use App\Models\UserSubmission;
use Illuminate\Http\Request;

use App\Models\Problem;
use App\Models\UserSolution;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;


// other user can only see solution which is published

class UserSolutionController extends Controller implements HasMiddleware
{   
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    /* 
    * This view all the solutions that been stored (published and non published) 
    * from the user 
    * perpective 
    */
    public function index(?Problem $problem = null){

        $user_solution = ProblemSetHelper::getUserSolutionPaginator(request(), $problem);

        return [
            'user_solution' => $user_solution,
        ];
    }

    /**
     * This view all the unpublished solution that is unpublished
     * from the moderator perspective
     */
    //havent check
    public function indexAsMod(?Problem $problem = null){
        Gate::authorize('view_solution', $problem);

        $user_solution = ProblemSetHelper::getUSPaginatorMod(request(), $problem);

        return [
            'user_solution' => $user_solution,
        ];
    }

    // This view all the solution that been stored (published and non published)
    public function show(UserSolution $user_solution){
        //only moderator and owner of solution can view the solution
        Gate::authorize('view', $user_solution);
        $us = $user_solution->with('userSubmission')->first();

        return [
            'user_solution' => $us,
        ];
    }

    // Only the user that own the submission can create the solution
    // Put this on unpublished for the moderator
    public function store(UserSubmission $userSubmission)
    {
        Gate::authorize('create_solution', $userSubmission);
        
        $fields = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required',
        ]);
        $fields['submission_id'] = $userSubmission->id;
        $fields['status'] = 'unpublished';

        $user_solution = UserSolution::create($fields);

        return [
            'user_solution' => $user_solution,
        ];
    }

    public function update(UserSolution $user_solution)
    {
        Gate::authorize('delete', $user_solution);

        $field_solution = request()->validate([
            'name' => 'string|max:255',
            'description' => 'string|max:255',
            'content' => 'nullable',
        ]);
        
        $user_solution->update($field_solution);

        return [
            'message' => 'Solution updated successfully',
            'user_solution' => $user_solution,
        ];
    }

    // Destroy the solution if the user is the owner of the solution
    public function destroy(UserSolution $user_solution){
        Gate::authorize('delete', $user_solution);

        $user_solution->delete();

        return [
            'message' => 'User solution deleted successfully',
        ];
    }

    
}
