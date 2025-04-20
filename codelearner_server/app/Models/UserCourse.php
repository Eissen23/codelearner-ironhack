<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCourse extends Pivot
{
    /** @use HasFactory<\Database\Factories\UserCourseFactory> */
    use HasFactory;

    const UPDATED_AT = null;
    const CREATED_AT = 'enrolled_at';
    protected $table = 'user_courses';

    protected $fillable = [
        'user_id',
        'course_id',
        'payment_id',
    ];
    

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    //paymen relation here
}
