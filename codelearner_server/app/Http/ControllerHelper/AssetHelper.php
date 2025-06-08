<?php

namespace App\Http\ControllerHelper;

use App\Models\Course;
use App\Models\Organization;
use App\Models\ProblemSet;
use Illuminate\Http\Request;

class AssetHelper
{

    const MODERATOR_ROLE = ['Moderator', 'OrgHead'];
    const UNAUTHORIZED_ROLE = ['Pending', 'Rejected'];

    /**
     * Get the Course for the organization.
     * @param Request $request
     * @param Course $course
     * @param Organization|null $org
     *
     */
    public static function getOrgCoursePaginator(Request $request, ?Organization $org = null)
    {
        $perpage = $request->input('per_page', 10);
        $assets_data = $org ? $org->courses()->paginate($perpage) : Course::paginate($perpage);

        return $assets_data;
    }

    /**
     * Get the ProblemSet for the course.
     * @param Request $request
     * @param ProblemSet $problemSet
     * @param Course|null $course
     *
     */
    public static function getOrgProblemSetPaginator(Request $request, ?Organization $org = null)
    {
        $perpage = $request->input('per_page', 10);
        $assets_data = $org ? $org->problemSets()->paginate($perpage) : ProblemSet::paginate($perpage);

        return $assets_data;
    }

    /**
     * Get the Moderator for the organization.
     * @param Request $request
     * @param \App\Models\Moderator $mod
     * @param Organization|null $org
     *
     */
    public static function getOrgModeratorPaginator(Request $request, ?Organization $org = null)
    {
        $perPage = $request->input('per_page', 10);

        
        $baseQuery = $org->users()
            ->select(
                'users.id',
                'users.full_name',
                'users.email',
                'users.account_name',
                'moderators.created_at as created_at',
                'moderators.role'
            );
        // Group authorized moderators
        $moderators = $baseQuery->clone()
            ->whereIn('moderators.role', self::MODERATOR_ROLE)
            ->paginate($perPage);

        $pending = $baseQuery->clone()
            ->whereIn('moderators.role', self::UNAUTHORIZED_ROLE)
            ->paginate($perPage);


        return [
            'moderators' => $moderators,
            'pending' => $pending
        ];
    }

}