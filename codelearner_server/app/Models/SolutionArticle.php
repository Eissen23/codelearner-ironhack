<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class SolutionArticle extends Model
{
    //

    protected $connection = 'mongodb';

    protected $fillable = [
        'problem_id',
        'name',
        'solution',
        'language',
        'description'
    ];


    public function problem()
    {
        return $this->belongsTo(Problem::class, foreignKey: 'problem_id');
    }

}
