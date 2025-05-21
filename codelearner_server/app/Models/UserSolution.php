<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserSolution extends Model
{
    // The user solution is the solution that the user has published
    protected $connection = 'mongodb';
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'submission_id',
        'name',
        'description',
        'content',
        'status',
    ];

    public function userSubmission()
    {
        return $this->belongsTo(UserSubmission::class, 'submission_id')
            ->with('userSolution');
    }
}
