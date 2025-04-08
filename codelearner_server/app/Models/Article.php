<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MongoDB\Laravel\Eloquent\Model;


class Article extends Model
{
    //
    protected $connection = "mongodb";

    protected $fillable = [
        "name",
        "description",
        "content",
        "type",
        "course_id",
        "mod_id",
    ];

    public function moderators(){
        return new BelongsTo(
            app(Moderator::class)->newQuery(),
            $this->id,
            'mod_id',
            'mod_id'
        );
    }
}
