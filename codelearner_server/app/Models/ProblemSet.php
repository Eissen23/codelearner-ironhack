<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\HybridRelations;

class ProblemSet extends Model
{
    /** @use HasFactory<\Database\Factories\ProblemSetFactory> */
    use HasFactory, HybridRelations;
    const UPDATED_AT = null;
    protected $connection = "mysql";

    protected $fillable = [
        'name',
        'short_description',
        'description',
        'expired_at',
        'org_id',
    ];

    public function organization(){
        return $this->belongsTo(Organization::class, 'org_id');
    }

    public function problems(){
        return $this->hasMany(Problem::class, 'problem_set');
    }
}
