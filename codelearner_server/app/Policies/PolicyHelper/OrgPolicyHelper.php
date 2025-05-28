<?php

namespace App\Policies\PolicyHelper;

use App\Models\Organization;
use App\Models\User;
use App\Models\Moderator;
use App\Models\Course;
use App\Models\ProblemSet;

class OrgPolicyHelper
{
    const OrgHead = 'OrgHead';
    const Moderator = 'Moderator';
    const MODERATOR_ROLE = ['Moderator', 'OrgHead'];
    const UNAUTHORIZED_ROLE = ['Pending', 'Rejected'];

    // Get moderator 
    public static function getMod(Organization $organization, User $user)
    {
        $moderator = Moderator::where("org_id", $organization->id)
            ->where("user_id", $user->id)
            ->first();
        return $moderator;
    }

    /**
     * check if the user is indeed a moderator of the organization
     * @param Course|ProblemSet $asset
     * @param User $user
     */

    public static function userCanPost(User $user, Course|ProblemSet $asset)
    {
        $org = $asset->organization()->first();

        $moderator = self::getMod($org, $user);

        return $moderator ? in_array($moderator->role, self::MODERATOR_ROLE) : false;
    }

    /**
     * check if the user is an OrgHead
     * @param Course|ProblemSet $asset
     * @param User $user
     */
    public static function userOwn(User $user, Course|ProblemSet $asset)
    {
        $org = $asset->organization()->first();

        $moderator = self::getMod($org, $user);

        $roleLabel = match ($moderator->role) {
            self::OrgHead => 'HEAD',
            self::Moderator => 'MOD',
            default => 'UNAUTHORIZE',
        };

        return $roleLabel;
    }
}