<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;


class Article extends Model
{   
    
    //
    protected $connection = "mongodb";

    protected $fillable = [
        "name",
        "description",
        "content",
        "type",
        "course_id",
        "mod_id",
    ];

    public function moderator(){
        return $this->belongsTo(Moderator::class, 'mod_id');
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }
}
