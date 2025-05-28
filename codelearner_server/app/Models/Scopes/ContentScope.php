<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class ContentScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model)
    {
        //
         $filter = Request::input('c_keyword', null);
        $tags = Request::input('tagged', null); // Get tags from query parameter
        $sort = Request::input('sort', 'created_at-asc'); // Default to created-desc

        $allowedSorts = ['_id', 'name', 'created_at', 'difficulty'];

        // Parse sort parameter (e.g., name-asc, created-desc)
        $sortParts = explode('-', $sort);
        $sortColumn = $sortParts[0] ?? 'created_at';
        $sortDirection = $sortParts[1] ?? 'desc';

        // Map 'created' to 'created_at' for consistency
        if ($sortColumn === 'created') {
            $sortColumn = 'created_at';
        }

        // Apply sorting
        if (in_array($sortColumn, $allowedSorts) && in_array($sortDirection, ['asc', 'desc'])) {
            // MongoDB uses 1 for ascending, -1 for descending
            $mongoSortDirection = $sortDirection === 'asc' ? 1 : -1;
            $builder->orderBy($sortColumn, $mongoSortDirection);
        } else {
            $builder->orderBy('created_at', 'desc');
        }

        // Apply filtering on 'name' if provided
        if ($filter) {
            $builder->where('name', 'like', '%' . $filter . '%');
        }

        // Apply filtering on 'tags' if provided
        if ($tags) {
            // Split tags by comma to handle multiple tags (e.g., "linked-list,stack")
            $tagsArray = array_filter(array_map('trim', explode(',', $tags)));
            if (!empty($tagsArray)) {
            $builder->where(function($query) use ($tagsArray) {
                foreach ($tagsArray as $tag) {
                $query->orWhere('tags', 'regexp', '/^' . $tag . '$/i');
                }
            });
            }
        }

        return $builder;
    }
}
