<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Moderator extends Pivot
{
    /** @use HasFactory<\Database\Factories\ModeratorFactory> */
    use HasFactory;

    protected $connection = 'mysql'; // This is the connection name in database.php

    protected $fillable = [
        'user_id',
        'org_id',
        'role'
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

    public function updatedAtColumn()
    {
        return null;
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function organizations(){
        return $this->belongsTo(Organization::class);
    }
}
