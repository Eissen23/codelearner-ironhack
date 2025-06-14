<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Casts\ImageUrl;
use App\Traits\ModelTrait\ManageDeviceToken;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Moderator;
use App\Models\Scopes\SortAndFilterScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([SortAndFilterScope::class])]
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, ManageDeviceToken;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'account_name',
        'email',
        'password',
        'about',
        'image_avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'is_super_admin',
        
    ];

    protected $connection = 'mysql';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'created_at' => 'datetime',
            'password' => 'hashed',
            'is_super_admin' => 'boolean',
            'image_avatar' => ImageUrl::class
        ];
    }


    public function organizations()
    {
        return $this->belongsToMany(Organization::class, 'moderators', 'user_id', 'org_id')
            ->using(Moderator::class)
            ->withPivot('role');
    }

    public function moderatedOrg()
    {
        return $this->belongsToMany(Organization::class, 'moderators', 'user_id', 'org_id')
            ->using(Moderator::class)
            ->withPivot('role')
            ->wherePivot('role', 'Moderator');
    }

    public function managedOrganizations()
    {
        return $this->belongsToMany(Organization::class, 'moderators', 'user_id', 'org_id')
            ->using(Moderator::class)
            ->withPivot('role')
            ->wherePivot('role', 'OrgHead');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'user_courses', 'user_id', 'course_id')
            ->using(UserCourse::class);
    }

    public function userSubmissions()
    {
        return $this->hasMany(UserSubmission::class);
    }
}
