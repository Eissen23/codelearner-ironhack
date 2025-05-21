<?php

namespace App\Http\ControllerHelper;

use App\Models\Problem;
use App\Models\ProblemSet;
use App\Models\UserSolution;
use Illuminate\Http\Request;

class ProblemSetHelper
{
    /**
     * Get the ProblemSet for the course.
     * @param Request $request
     * @param ProblemSet $problemSet
     *
     */
    public static function getOrgProblemPaginator(Request $request, ?ProblemSet $problemSet = null)
    {
        $perpage = $request->input('per_page', 10);

        $assets_data = $problemSet ? $problemSet->problems()->paginate($perpage) : Problem::paginate($perpage);
        // No ProblemSet provided, fetch all Problems with their scope


        return $assets_data;
    }

    /**
     * Get the user submission for the problem 
     * if problem is null then get all the submission from the user
     * @param Request $request
     * @param Problem $problem
     * 
     */
    public static function getUserSubmissionPaginator(Request $request, ?Problem $problem = null)
    {
        $perpage = $request->input('per_page', 10);
        $problem = $request->input('problem', false);
        
        $user = $request->user();
        $submissions = $problem ? 
            $user->userSubmissions()
            ->where('problem_id', $problem->id)
            ->paginate($perpage) 
            : 
            $user->userSubmissions()
            ->with('problem')
            ->paginate($perpage);

        return $submissions;
    }

    /**
     * Get the user submission for the problem from the moderator 
     * problem should not be null so that the moderator can view the submission for the problem
     * @param Request $request
     * @param Problem $problem
     * 
     */
    public static function getSubmissionAsModPaginator(Request $request, Problem $problem)
    {
        $perpage = $request->input('per_page', 10);
        $submissions = $problem->userSubmissions()->paginate($perpage);

        return $submissions;
    }

    /**
     * Get the user solution for the problem
     * User side they should only care about the solution that they created
     * @param Problem $problem
     * @param Request $request
     */
    public static function getUserSolutionPaginator(Request $request, ?Problem $problem = null)
    {
        $perpage = $request->input('per_page', 10);

        $user_solution = UserSolution::whereHas('userSubmission', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        });

        if ($problem) {
            $user_solution = $user_solution->whereHas('userSubmission', function ($query) use ($problem) {
                $query->where('problem_id', $problem->id);
            });
        }

        return $user_solution->paginate($perpage);
    }

    // TODO: Not all submission have user_solution
    /**
     * Get the user solution for the problem
     * Problem should not be null to get all the solution from the user 
     * Moderator side they should only care about the unpublish solution 
     * @param Problem $problem
     * @param Request $request
     */
    public static function getUSPaginatorMod(Request $request, Problem $problem)
    {
        $perpage = $request->input('per_page', 10);
        $user_solution = $problem->userSubmissions()->get()->userSolution()->where('status', 'unpublished')->paginate($perpage);

        return $user_solution;
    }
}