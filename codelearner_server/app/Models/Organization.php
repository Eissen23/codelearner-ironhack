<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory;

    protected $connection = "mysql";

    protected $fillable = [
        "org_name",
        "contact_email",
        "website",
        "description",
        "logo",
    ];

    protected $casts = [
        "created_at" => "datetime",
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'moderators', 'org_id', 'user_id')
                    ->using(Moderator::class)
                    ->withPivot('role');
    }

    public function courses(){
        return $this->hasMany(Course::class, 'org_id');
    }

    public function problemSet(){
        return $this->hasMany(ProblemSet::class, 'org_id');
    }
}
