<?php

namespace App\Policies\PolicyHelper;

use App\Models\User;

class UserPolicyHelper{
    public static function isSuperAdmin(User $user){
        return $user->is_super_admin;
    }

    
}