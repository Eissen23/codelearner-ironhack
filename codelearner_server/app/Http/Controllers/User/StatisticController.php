<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Problem;
use App\Models\UserSubmission;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class StatisticController extends Controller implements HasMiddleware
{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }


    public function userStatistic(Problem $problem)
    {
        // TODO: get the list of user statistic on a problem 
        $userSubmissions = UserSubmission::with('user')
            ->where('problem_id', $problem->id)
            ->get()
            ->groupBy('user_id');

        $statistics = $userSubmissions->map(function ($submissions, $userId) {
            $user = $submissions->first()->user;
            $acceptedSubmissions = $submissions->where('status', 'accepted');

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'total_submissions' => $submissions->count(),
                'accepted_submissions' => $acceptedSubmissions->count(),
                'first_accepted_at' => $acceptedSubmissions->min('created_at'),
                'avg_execution_time' => $submissions->avg('execution_time'),
                'best_execution_time' => $submissions->min('execution_time'),
                'last_submission_at' => $submissions->max('created_at')
            ];
        })->sortBy('first_accepted_at')->values();

        $totalUsers = $statistics->count();
        $usersSolved = $statistics->where('accepted_submissions', '>', 0)->count();

        return response()->json([
            'problem' => $problem->only(['id', 'name', 'difficulty']),
            'user_statistics' => $statistics,
            'summary' => [
                'total_users_attempted' => $totalUsers,
                'users_solved' => $usersSolved,
                'success_rate' => $totalUsers > 0 ? round(($usersSolved / $totalUsers) * 100, 2) : 0
            ]
        ]);
    }

    public function problemStatistic()
    {
        // Todo: get the list of own user on a problem
        // Instead of showing a list of submission, show the list of problems that user solved first

        $userId = request()->user()->id;

        // Get problems solved by the authenticated user using Eloquent relationships
        $acceptedSubmissions = UserSubmission::with('problem')
            ->where('user_id', $userId)
            ->where('result', 'accepted')
            ->get()
            ->groupBy('problem_id');

        $solvedProblems = $acceptedSubmissions->map(function ($submissions, $problemId) {
            $problem = $submissions->first()->problem;

            return [
                'id' => $problem->id,
                'title' => $problem->title,
                'difficulty' => $problem->difficulty,
                'category' => $problem->category,
                'first_solved_at' => $submissions->min('created_at'),
                'total_attempts' => $submissions->count(),
                'best_time' => $submissions->min('execution_time'),
                'avg_time' => $submissions->avg('execution_time')
            ];
        })->sortBy('first_solved_at')->values();

    }
    public function leaderBoard()
    {
        // Todo: get the leader board info on user solve
    }

    public function leaderBoardProblem()
    {
        // Todo: get the leader board info on user solve
    }

}