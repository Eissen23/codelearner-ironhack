<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moderator extends Model
{
    /** @use HasFactory<\Database\Factories\ModeratorFactory> */
    use HasFactory;

    protected $connection = 'mysql'; // This is the connection name in database.php

    protected $fillable = [
        'account_name',
        'email',
        'password',
        'fullname',
    ];

    protected $hidden = [
        'password',
        'remember_token',
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
            'password' => 'hashed',
        ];
    }
}
