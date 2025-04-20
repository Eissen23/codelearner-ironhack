<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserSubmission extends Model
{
    // this is the model for user submissions
    // it is used to store the submissions made by users for problems
    protected $connection = 'mongodb';

    //data only saved when the user submits 
    protected $fillable = [
        'user_id',
        'problem_id',
        'source_code',
        'language_id',
        'result',
        'points',
        'time',
        'memory',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }
}
