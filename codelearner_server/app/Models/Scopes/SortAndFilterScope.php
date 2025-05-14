<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

class SortAndFilterScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     * 
     * TODO: It's better to group the model into a scope hierachy that wont hurt in the long run
     * EX: 
     * User
     * Org 
     * ProblemSet Course
     * Problem, Article 
     * UserSubmission, Soluttion 
     * 
     */
    public function apply(Builder $builder, Model $model)
    {   
        // Log::info('Applying SortAndFilterScope', [
        //     'sort' => Request::input('sort'),
        //     'sort_direction' => Request::input('sort_direction'),
        //     'filter' => Request::input('filter'),
        // ]);
        $filter = Request::input('keyword', null);
        $sort = Request::input('sort', 'created-desc'); // Default to created-desc

        $allowedSorts = ['id', 'name', 'created_at'];

        // Parse sort parameter (e.g., name-asc, created-desc)
        $sortParts = explode('-', $sort);
        $sortColumn = $sortParts[0] ?? 'created_at';
        $sortDirection = $sortParts[1] ?? 'desc';

        // Apply sorting
        if (in_array($sortColumn, $allowedSorts) && in_array($sortDirection, ['asc', 'desc'])) {
            $builder->orderBy($sortColumn, $sortDirection);
        } else {
            $builder->orderBy('created_at', 'desc');
        }

        // Apply filtering on 'name' if the column exists
        if ($filter && Schema::hasColumn($model->getTable(), 'name')) {
            $builder->where('name', 'like', '%' . $filter . '%');
        }

        return $builder;
    }
}
