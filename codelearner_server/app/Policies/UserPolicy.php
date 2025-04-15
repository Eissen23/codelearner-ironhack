<?php

namespace App\Policies;

use App\Models\User;
use App\Policies\PolicyHelper;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function admin(User $user){
        if (PolicyHelper::isSuperAdmin($user)){
            return Response::allow();
        }

        return Response::deny('User is not super admin', 403);
    }
}
