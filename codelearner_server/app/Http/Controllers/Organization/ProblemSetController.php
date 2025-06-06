<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;

use App\Http\ControllerHelper\AssetHelper;
use App\Models\Organization;
use App\Models\ProblemSet;
use App\Models\User;
use App\Policies\PolicyHelper\OrgPolicyHelper;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ProblemSetController extends Controller implements HasMiddleware
{
    public static function Middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(?Organization $org = null)
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
        $belong = request()->input('is_belong', false);

        $org = $belong === 'true' ? $problemSet->organization()->first() : null;
        //
        return [
            'data' => $problemSet,
            'belong_to' => $org,
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
            'description' => 'nullable',
            'expired_at' => 'date|after:created_at|nullable',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = time() . '_course_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('courses', $filename, 'public');
        }

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
            'description' => 'nullable',
            'expired_at' => 'date|after:created_at'
        ]);

        if ($request->hasFile('logo')) {
            $logoPath = $problemSet->getRawOriginal('logo');
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }

            $logo = $request->file('logo');
            $filename = time() . '_course_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $fields['logo'] = $logo->storeAs('courses', $filename, 'public');
        }

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

        $logoPath = $problemSet->getRawOriginal('logo');
        if ($logoPath && Storage::disk('public')->exists($logoPath)) {
            Storage::disk('public')->delete($logoPath);
        }

        $problemSet->delete();

        return [
            'message' => 'Problem set deleted',
        ];
    }

    public function isOwn(Request $request, ProblemSet $problemSet)
    {
        $user = $request->user();
        return OrgPolicyHelper::userOwn($user, $problemSet);
    }
}
