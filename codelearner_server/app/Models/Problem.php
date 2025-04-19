<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Problem extends Model
{
    //
    protected $connection = 'mongodb';

    protected $fillable = [
        'name',
        'description',
        'tags',
        'difficulty',
        'problem_set',
        'test_cases',
    ];

    protected function casts(): array
    {
        return [
            'tag' => 'array',
            'test_cases' => 'array',
        ];
    }

    public function problemSet()
    {
        return $this->belongsTo(ProblemSet::class, 'problem_set');
    }

    

}
