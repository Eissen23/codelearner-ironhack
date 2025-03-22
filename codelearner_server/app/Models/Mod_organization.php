<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mod_organization extends Model
{
    /** @use HasFactory<\Database\Factories\ModOrganizationFactory> */
    use HasFactory;
    protected $fillable = ['mod_id', 'org_id', 'role'];

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
