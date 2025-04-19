<?php

namespace App\Http\ControllerHelper;

use App\Models\Course;
use App\Models\Organization;
use App\Models\ProblemSet;
use Illuminate\Http\Request;

class AssetHelper {

    /**
     * Get the Course for the organization.
     * @param Request $request
     * @param Course $course
     * @param Organization|null $org
     *
     */
    public static function getOrgCoursePaginator(Request $request, ?Organization $org = null) {
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
    public static function getOrgProblemSetPaginator(Request $request, ?Organization $org = null) {
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
    public static function getOrgModeratorPaginator(Request $request, ?Organization $org = null) {
        $perPage = $request->input('per_page', 10);

        $users = $org->users()
            ->select(
                'users.id',
                'users.full_name',
                'users.email',
                'users.account_name',
                'moderators.created_at as joined_at',
            )
            ->paginate($perPage);

        return $users;
    }

}