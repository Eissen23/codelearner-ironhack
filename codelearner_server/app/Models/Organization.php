<?php

namespace App\Models;

use App\Casts\ImageUrl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\SortAndFilterScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Storage;

#[ScopedBy([SortAndFilterScope::class])]
class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory;

    protected $connection = "mysql";

    protected $fillable = [
        "name",
        "contact_email",
        "website",
        "description",
        "logo",
    ];

    protected $casts = [
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "logo" => ImageUrl::class
    ];

    public function getImageUrlAttribute()
    {
        return url(Storage::url($this->logo));
    }

    public function users(){
        return $this->belongsToMany(User::class, 'moderators', 'org_id', 'user_id')
                    ->using(Moderator::class)
                    ->withPivot('role');
    }

    public function courses(){
        return $this->hasMany(Course::class, 'org_id');
    }

    public function problemSets(){
        return $this->hasMany(ProblemSet::class, 'org_id');
    }
}
