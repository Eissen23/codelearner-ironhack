<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class SubArticle extends Model
{
    //
    protected $connection = 'mongodb'; 

    protected $fillable = [
        "name",
        "description",
        "content",
        "article_id",
        "mod_id",
    ];

    public function chapter() {
        return $this->belongsTo(Article::class, 'article_id');
    }

    public function mod() {
        return $this->belongsTo(Moderator::class, 'mod_id');
    }
}
