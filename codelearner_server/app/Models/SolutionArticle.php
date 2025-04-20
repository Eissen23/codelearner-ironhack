<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class SolutionArticle extends Model
{
    //

    protected $connection = 'mongodb';

    protected $fillable = [
        'article_id',
        'problem_id',
        'solution',
        'language',
    ];


    public function problem()
    {
        return $this->belongsTo(Problem::class, foreignKey: 'problem_id');
    }

    public function article()
    {
        return $this->belongsTo(Article::class, foreignKey: 'article_id');
    }
}
