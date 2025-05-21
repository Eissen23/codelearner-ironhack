<?php

namespace App\Models;

use App\Models\Scopes\ContentScope;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([ContentScope::class])]
class Article extends Model
{   
    
    //
    protected $connection = "mongodb";

    protected $fillable = [
        "name",
        "description",
        "content",
        "type",
        "chapter",
        "course_id",
        "mod_id",
        "tags"
    ];

    public function moderator(){
        return $this->belongsTo(Moderator::class, 'mod_id');
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function subArticle() {
        return $this->hasMany(SubArticle::class, 'article_id');
    }
}
