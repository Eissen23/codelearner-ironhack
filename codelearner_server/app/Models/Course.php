<?php

namespace App\Models;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\HybridRelations;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory, HybridRelations;
    const UPDATED_AT = null;
    protected $connection = "mysql";
    protected $fillable = [
        'name',
        'description',
        'short_description',
        'duration',
        'org_id',
    ];

    protected $casts = [
        'created_at'=> 'datetime',
    ];
    public function organization(){
        return $this->belongsTo(Organization::class, 'org_id');
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }
}
