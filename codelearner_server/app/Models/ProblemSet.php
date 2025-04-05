<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProblemSet extends Model
{
    /** @use HasFactory<\Database\Factories\ProblemSetFactory> */
    use HasFactory;
    const UPDATED_AT = null;
    protected $connection = "mysql";

    protected $fillable = [
        'name',
        'description',
        'expired_at',
        'org_id',
    ];
}
