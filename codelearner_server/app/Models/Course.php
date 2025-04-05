<?php

namespace App\Models;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;
    const UPDATED_AT = null;
    protected $connection = "mysql";
    protected $fillable = [
        'name',
        'description',
        'short_description',
        'duration',
        'org_id'
    ];

    protected $casts = [
        'created_at'=> 'datetime',
    ];
    public function organizations(){
        return $this->belongs_to(Organization::class);
    }
}
