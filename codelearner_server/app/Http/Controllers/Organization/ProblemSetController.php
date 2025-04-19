<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Http\ControllerHelper\AssetHelper;
use App\Models\Organization;
use App\Models\ProblemSet;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class ProblemSetController extends Controller implements HasMiddleware
{   
    public static function Middleware(){
        return [
            new Middleware('auth:sanctum', except:['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(?Organization $org=null)
    {
        //show the problem set in user chosen organization
        // Log::info('OrgPolicy modify method called', ['org'=>$org, 'user' => $request->user()]);
        $problemSets = AssetHelper::getOrgProblemSetPaginator(request(), $org);     

        return [
            'problem_sets' => $problemSets,
        ];
        
    }
    
    /**
     * Display the specified resource.
     */
    public function show(ProblemSet $problemSet)
    {
        //
        return [
            'data' => $problemSet,
        ];

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Organization $org)
    {
        //
        Gate::authorize('orgHead', $org);
        $fields = $request->validate([
            'name' => 'required|string',
            'short_description' => 'required|string',
            'description' =>'nullable',
            'expired_at' => 'date|after:created_at',
        ]);

        $fields['org_id'] = $org->id;

        $problemSet = ProblemSet::create($fields);

        return [
            'data' => $problemSet,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProblemSet $problemSet)
    {
        //
        $org = $problemSet->organization()->first();
        Gate::authorize('orgHead', $org);

        $fields = $request->validate([
            'name' => 'string',
            'short_description' => 'string',
            'description'=> 'nullable',
            'expired_at' => 'date|after:created_at'
        ]);

        $problemSet->update($fields);

        return [
            'message' => 'Problem set updated',
            'problem_set' => $problemSet
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProblemSet $problemSet)
    {
        //
        $org = $problemSet->organization()->first();
        Gate::authorize('orgHead', $org);

        $problemSet->delete();

        return [
            'message'=> 'Problem set deleted',
        ];
    }
}
