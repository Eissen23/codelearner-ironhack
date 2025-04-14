<?php

namespace App\Http\ControllerHelper;

use App\Models\Moderator;

class ModeratorHelper
{
    public static function  getModerators(String $org_id){
        $moderators = Moderator::where("org_id", $org_id)
        ->all();
        return $moderators;
    }
    
    public static function  getModerator(String $org_id, String $user_id){
        $moderator = Moderator::where("org_id", $org_id)
        ->where("user_id", $user_id)
        ->first();
        return $moderator;
    }
}