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

    public function user(){
        return $this->belongsToMany(User::class)
                    ->use(Moderator::class);
    }

    public function course(){
        return $this->hasMany(Course::class);
    }
}
