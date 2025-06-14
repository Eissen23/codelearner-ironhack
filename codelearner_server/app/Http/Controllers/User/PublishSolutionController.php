<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Models\Problem;
use Illuminate\Routing\Controllers\HasMiddleware;

use Illuminate\Routing\Controllers\Middleware;
use App\Models\UserSolution;
use Illuminate\Support\Facades\Gate;
class PublishSolutionController extends Controller implements HasMiddleware
{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }
    // to reject and publish the solution
    // The mod need to own the user problem solution
    public function publish(UserSolution $userSolution)
    {
        Gate::authorize('publish', $userSolution);
        $userSolution->update([
            'status' => 'published',
        ]);

        return [
            'message' => 'Solution published successfully'
        ];
    }

    public function reject(UserSolution $userSolution)
    {
        Gate::authorize('publish', $userSolution);

        $userSolution->update([
            'status' => 'rejected',
        ]);

        return [
            'message' => 'Solution rejected'
        ];
    }




    // TODO: add logic to this and route
    // only the published are shown to the user
    // Anyone can view it as long as the solution is published
    public function viewPublished(Problem $problems)
    {
        // For the user who want to view the published solution
        $userSolution = UserSolution::where('status', 'published')
            ->with([
                'userSubmission' => function ($query) {
                    $query->select('id', 'source_code', 'language_id', 'result')
                        ->without('userSolution');
                }
            ])
            ->get();

        return [
            'user_solutions' => $userSolution,
        ];
    }
}