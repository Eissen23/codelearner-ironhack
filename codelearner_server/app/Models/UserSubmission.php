<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

use App\Models\Scopes\DocSortAndFilterScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([DocSortAndFilterScope::class])]
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

    public function userSolution()
    {
        return $this->hasOne(UserSolution::class, 'submission_id');
    }
}
