<?php

namespace App\Models;

use App\Models\Scopes\ContentScope;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([ContentScope::class])]
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
        'is_rich_text',
    ];

    // protected $casts = [
    //     'tags'=>'array'
    // ];

    public function problemSet()
    {
        return $this->belongsTo(ProblemSet::class, 'problem_set');
    }

    public function solutionArticles()
    {
        return $this->hasMany(SolutionArticle::class, 'problem_id')
            ->with('article');
    }

    public function userSubmissions()
    {
        return $this->hasMany(UserSubmission::class, 'problem_id');
    }

}
