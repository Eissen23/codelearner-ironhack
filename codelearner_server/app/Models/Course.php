<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'short_description',
        'from',
        'expired_at',
    ];
    /**
     * Get the name of the "updated at" column.
     *
     * @return null
     */
    public function updatedAtColumn()
    {
        return null;
    }
}
