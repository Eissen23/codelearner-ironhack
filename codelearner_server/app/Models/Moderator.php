<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use MongoDB\Laravel\Eloquent\HybridRelations;

class Moderator extends Pivot
{
    /** @use HasFactory<\Database\Factories\ModeratorFactory> */
    use HasFactory, HybridRelations;
    const UPDATED_AT = null;
    protected $connection = 'mysql'; // This is the connection name in database.php
   
    protected $table = 'moderators';

    protected $fillable = [
        'user_id',
        'org_id',
        'role',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function organization(){
        return $this->belongsTo(Organization::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }


}
