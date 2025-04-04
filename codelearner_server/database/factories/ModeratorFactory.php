<?php

namespace Database\Factories;

use App\Models\Moderator;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Organization;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Moderator>
 */
class ModeratorFactory extends Factory
{   

    protected $role = ['Master', 'Moderator'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        do {
            $orgId = Organization::inRandomOrder()->first()->org_id;
            $userId = User::inRandomOrder()->first()->id;
            
            $exists = Moderator::where('org_id', $orgId)
                                    ->where('user_id', $userId)
                                    ->exists();
        } while ($exists);

        return [
            //
            "org_id"=> $orgId,
            "user_id"=> $userId,
            "role"=> $this->role[array_rand($this->role)],
        ];
    }
}
